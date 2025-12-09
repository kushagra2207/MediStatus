import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

class MediStatusApp extends StatelessWidget {
  const MediStatusApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MediStatus',
      theme: ThemeData(
        useMaterial3: true,
        colorSchemeSeed: Colors.blue,
      ),
      home: const HomeScreen(),
    );
  }
}