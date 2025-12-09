import 'package:flutter/material.dart';
import '../models/hospital.dart';

class HospitalCard extends StatelessWidget {
  final Hospital hospital;
  final VoidCallback? onTap;

  const HospitalCard({
    super.key,
    required this.hospital,
    this.onTap
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      child: ListTile(
        title: Text(hospital.name),
        subtitle: Text('${hospital.address}\n${hospital.contact}'),
        isThreeLine: true,
        onTap: onTap,
      )
    );
  }
}