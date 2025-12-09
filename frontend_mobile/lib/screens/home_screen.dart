import 'package:flutter/material.dart';
import 'hospitals_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('MediStatus')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => const HospitalsScreen()
              )
            );
          },
          child: const Text('Hospitals'),
        ),
      ),
    );
  }
}