import 'dart:async';
import 'package:flutter/material.dart';

import '../core/common_widgets/app_loading.dart';
import '../models/doctor.dart';
import '../models/hospital.dart';
import '../repositories/doctor_repository.dart';
import '../services/connectivity_service.dart';
import '../widgets/doctor_card.dart';
import '../widgets/last_updated_bar.dart';
import 'doctor_detail_screen.dart';

class DoctorsScreen extends StatefulWidget {
  final Hospital hospital;

  const DoctorsScreen({
    super.key,
    required this.hospital,
  });

  @override
  State<DoctorsScreen> createState() => _DoctorsScreenState();
}

class _DoctorsScreenState extends State<DoctorsScreen> {
  final _repository = DoctorRepository();
  String _searchQuery = '';

  List<Doctor>? _doctors;
  bool _isLoading = true;
  String? _loadError;

  // --- Cache & connectivity state ---
  DateTime? _lastUpdated;
  bool _isOffline = false;
  StreamSubscription<bool>? _connectivitySubscription;

  @override
  void initState() {
    super.initState();
    _initConnectivity();
    _loadDoctors();
  }

  void _initConnectivity() {
    ConnectivityService.instance.isConnected.then((connected) {
      if (mounted) setState(() => _isOffline = !connected);
    });

    _connectivitySubscription =
        ConnectivityService.instance.onConnectivityChanged.listen((connected) {
      if (mounted) {
        final wasOffline = _isOffline;
        setState(() => _isOffline = !connected);
        if (connected && wasOffline) {
          _refreshFromNetwork();
        }
      }
    });
  }

  /// Initial load: show cached data instantly, then refresh in background.
  Future<void> _loadDoctors() async {
    final cached = await _repository.getCached(widget.hospital.id);
    if (cached != null && mounted) {
      setState(() {
        _doctors = cached.data;
        _lastUpdated = cached.lastUpdated;
        _isLoading = false;
        _loadError = null;
      });
    }

    await _refreshFromNetwork();
  }

  /// Network refresh. Silently ignored if cached data is already on screen.
  Future<void> _refreshFromNetwork() async {
    try {
      final result =
          await _repository.getDoctorsByHospital(widget.hospital.id);
      if (mounted) {
        setState(() {
          _doctors = result.data;
          _lastUpdated = result.lastUpdated;
          _isLoading = false;
          _loadError = null;
        });
      }
    } catch (e) {
      if (_doctors != null && _doctors!.isNotEmpty) return;
      if (mounted) {
        setState(() {
          _loadError = e.toString();
          _isLoading = false;
        });
      }
    }
  }

  @override
  void dispose() {
    _connectivitySubscription?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFDEEBF7),
      appBar: AppBar(
        title: Text(widget.hospital.name),
        backgroundColor: const Color(0xFF0369A1),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          Container(
            margin: const EdgeInsets.only(top: 10),
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Color(0xFFDEEBF7),
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(24),
                bottomRight: Radius.circular(24),
              ),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Doctors',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 60, 60, 60),
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  onChanged: (value) {
                    setState(() {
                      _searchQuery = value.toLowerCase();
                    });
                  },
                  decoration: InputDecoration(
                    hintText: 'Search by name or specialization...',
                    hintStyle: const TextStyle(color: Color(0xFF94A3B8)),
                    prefixIcon: const Icon(Icons.search, color: Color(0xFF64748B)),
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: BorderSide.none,
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: BorderSide(color: Colors.grey.shade200),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(14),
                      borderSide: const BorderSide(color: Color(0xFF0284C7), width: 1.5),
                    ),
                    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  ),
                ),
              ],
            ),
          ),
          // ── Last-updated indicator ──
          LastUpdatedBar(
            lastUpdated: _lastUpdated,
            isOffline: _isOffline,
            onRetry: _refreshFromNetwork,
          ),
          Expanded(
            child: _buildBody(),
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    if (_isLoading) {
      return const AppLoading(message: 'Loading doctors...');
    }

    // Error with no cached data → full-screen error.
    if (_loadError != null && _doctors == null) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.cloud_off_rounded, size: 64, color: Colors.grey.shade400),
            const SizedBox(height: 16),
            Text(
              'Could not load doctors',
              style: TextStyle(fontSize: 16, color: Colors.grey.shade600),
            ),
            const SizedBox(height: 12),
            TextButton(
              onPressed: () {
                setState(() {
                  _isLoading = true;
                  _loadError = null;
                });
                _loadDoctors();
              },
              child: const Text('Retry'),
            ),
          ],
        ),
      );
    }

    final allDoctors = _doctors ?? [];
    final doctors = _searchQuery.isEmpty
        ? allDoctors
        : allDoctors.where((d) =>
            d.name.toLowerCase().contains(_searchQuery) ||
            d.specialization.toLowerCase().contains(_searchQuery)
          ).toList();

    if (doctors.isEmpty) {
      return Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.person_search,
              size: 64,
              color: Colors.grey.shade400,
            ),
            const SizedBox(height: 16),
            Text(
              _searchQuery.isEmpty
                ? 'No doctors found.'
                : 'No doctors match your search',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey.shade600,
              ),
            ),
          ],
        ),
      );
    }

    return RefreshIndicator(
      color: const Color(0xFF0284C7),
      onRefresh: _refreshFromNetwork,
      child: ListView.builder(
        padding: const EdgeInsets.only(top: 8, bottom: 16),
        itemCount: doctors.length,
        itemBuilder: (context, index) {
          final doctor = doctors[index];
          return DoctorCard(
            doctor: doctor,
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => DoctorDetailScreen(doctor: doctor),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
