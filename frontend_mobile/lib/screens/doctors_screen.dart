import 'package:flutter/material.dart';

import '../api/doctor_api.dart';
import '../core/common_widgets/app_error.dart';
import '../core/common_widgets/app_loading.dart';
import '../models/doctor.dart';
import '../models/hospital.dart';
import '../widgets/doctor_card.dart';
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
  final _api = DoctorApi();
  late Future<List<Doctor>> _futureDoctors;

  @override
  void initState() {
    super.initState();
    _loadDoctors();
  }

  void _loadDoctors() {
    _futureDoctors = _api.fetchDoctorsByHospital(widget.hospital.id);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Doctors - ${widget.hospital.name}')),
      body: FutureBuilder<List<Doctor>>(
        future: _futureDoctors,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const AppLoading(message: 'Loading doctors...');
          }

          if (snapshot.hasError) {
            return AppError(
              message: 'Error: ${snapshot.error}',
              onRetry: _loadDoctors,
            );
          }

          final doctors = snapshot.data ?? [];

          if (doctors.isEmpty) {
            return const Center(child: Text('No doctors found.'));
          }

          return ListView.builder(
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
                    )
                  );
                },
              );
            }
          );
        },
      )
    );
  }
}