import 'package:flutter/material.dart';
import '../models/doctor.dart';
import '../widgets/availability_card.dart';

class DoctorDetailScreen extends StatelessWidget {
  final Doctor doctor;

  const DoctorDetailScreen({
    super.key,
    required this.doctor
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFDEEBF7),
      appBar: AppBar(
        title: const Text('Doctor Details'),
        backgroundColor: const Color(0xFF0284C7),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: Color(0xFF0284C7).withAlpha((0.1 * 255).toInt()),
                      borderRadius: BorderRadius.circular(40),
                    ),
                    child: const Icon(
                      Icons.person,
                      size: 48,
                      color: Color(0xFF0284C7),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    doctor.name,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: Color(0xFF0284C7).withAlpha((0.1 * 255).toInt()),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      doctor.specialization,
                      style: const TextStyle(
                        fontSize: 16,
                        color: Color(0xFF0284C7),
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  if (doctor.email.isNotEmpty) ...[
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.email,
                          size: 18,
                          color: Colors.grey.shade600,
                        ),
                        const SizedBox(width: 8),
                        Flexible(
                          child: Text(
                            doctor.email,
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey.shade700,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),

          if (doctor.hospital != null) ...[
            const SizedBox(height: 16),
            Card(
              elevation: 2,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Color(0xFF0284C7).withAlpha((0.1 * 255).toInt()),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(
                            Icons.apartment,
                            size: 28,
                            color: Color(0xFF0284C7),
                          ),
                        ),
                        const SizedBox(width: 12),
                        const Text(
                          'Hospital',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      doctor.hospital!.name,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                        color: Colors.black87,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(
                          Icons.location_on,
                          size: 16,
                          color: Colors.grey.shade600,
                        ),
                        const SizedBox(width: 6),
                        Expanded(
                          child: Text(
                            doctor.hospital!.address,
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey.shade700,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        Icon(
                          Icons.phone,
                          size: 16,
                          color: Colors.grey.shade600,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          doctor.hospital!.contact,
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey.shade700,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],

          const SizedBox(height: 16),
          AvailabilityCard(availability: doctor.availability),
        ],
      ),
    );
  }
}