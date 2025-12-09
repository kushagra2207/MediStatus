import 'package:flutter/material.dart';
import '../models/doctor.dart';

class DoctorDetailScreen extends StatelessWidget {
  final Doctor doctor;

  const DoctorDetailScreen({
    super.key,
    required this.doctor
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(doctor.name)),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: ListView(
          children: [
            Text(
              doctor.name,
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 8),
            Text(
              doctor.specialization,
              style: Theme.of(context).textTheme.titleMedium,
            ),

            if (doctor.email.isNotEmpty) ...[
              const SizedBox(height: 8),
              Text('Email: ${doctor.email}')
            ],

            if (doctor.hospital != null) ...[
              const SizedBox(height: 16),
              Text(
                'Hospital',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              Text(doctor.hospital!.name),
              Text(doctor.hospital!.address),
              Text('Contact: ${doctor.hospital!.contact}'),
            ],

            const SizedBox(height: 24),

            Text(
              'Availability',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),

            if (doctor.availability.isEmpty)
              const Text('No availability slots added')
            else
              ...doctor.availability.map(
                (slot) => Card(
                  margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 0),
                  child: ListTile(
                    title: Text(slot.day),
                    subtitle: Text('${slot.fromTime} - ${slot.toTime}'),
                  ),
                )
              )
          ],
        ),
      ),
    );
  }
}