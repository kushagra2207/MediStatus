import 'package:flutter/material.dart';
import 'cache/database_helper.dart';
import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialise the local SQLite cache before the app starts.
  await DatabaseHelper.instance.database;

  runApp(const MediStatusApp());
}
