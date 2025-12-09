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

  @override
  void initState() {
    super.initState();
    _loadHospitals();
  }

  void _loadHospitals() {
    _futureHospitals = _api.fetchHospitals();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Hospitals')),
      body: FutureBuilder<List<Hospital>>(
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

          final hospitals = snapshot.data ?? [];

          if (hospitals.isEmpty) {
            return const Center(child: Text('No hospitals found'));
          }

          return ListView.builder(
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
    );
  }
}