import 'package:flutter/material.dart';

import '../api/hospital_api.dart';
import '../core/common_widgets/app_error.dart';
import '../core/common_widgets/app_loading.dart';
import '../models/hospital.dart';
import '../widgets/hospital_card.dart';
import 'doctors_screen.dart';

class HospitalsScreen extends StatefulWidget {
  const HospitalsScreen({super.key});

  @override
  State<HospitalsScreen> createState() => _HospitalScreenState();
}

class _HospitalScreenState extends State<HospitalsScreen> {
  final _api = HospitalApi();
  late Future<List<Hospital>> _futureHospitals;
  String _searchQuery = '';

  @override
  void initState() {
    super.initState();
    _loadHospitals();
  }

  void _loadHospitals() {
    setState(() {
      _futureHospitals = _api.fetchHospitals();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFDEEBF7),
      appBar: AppBar(
        title: const Text('Hospitals'),
        backgroundColor: const Color(0xFF0284C7),
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
            child: TextField(
              onChanged: (value) {
                setState(() {
                  _searchQuery = value.toLowerCase();
                });
              },
              decoration: InputDecoration(
                hintText: 'Search hospitals...',
                hintStyle: TextStyle(color: Colors.grey.shade400),
                prefixIcon: Icon(Icons.search, color: Colors.grey.shade600),
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                  borderSide: BorderSide.none,
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              ),
            ),
          ),
          Expanded(
            child: FutureBuilder<List<Hospital>>(
              future: _futureHospitals,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const AppLoading(message: 'Loading Hospitals...');
                }

                if (snapshot.hasError) {
                  return AppError(
                    message: 'Error: ${snapshot.error}',
                    onRetry: _loadHospitals,
                  );
                }

                final allHospitals = snapshot.data ?? [];
                final hospitals = _searchQuery.isEmpty
                    ? allHospitals
                    : allHospitals.where((h) => 
                        h.name.toLowerCase().contains(_searchQuery) ||
                        h.address.toLowerCase().contains(_searchQuery)
                      ).toList();

                if (hospitals.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(
                          Icons.local_hospital_outlined,
                          size: 64,
                          color: Colors.grey.shade400,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          _searchQuery.isEmpty 
                            ? 'No hospitals found' 
                            : 'No hospitals match your search',
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  );
                }

                return ListView.builder(
                  padding: const EdgeInsets.only(top: 8, bottom: 16),
                  itemCount: hospitals.length,
                  itemBuilder: (context, index) {
                    final hospital = hospitals[index];
                    return HospitalCard(
                      hospital: hospital,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => DoctorsScreen(hospital: hospital),
                          )
                        );
                      },
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}