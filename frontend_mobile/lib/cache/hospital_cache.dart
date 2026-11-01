import 'package:sqflite/sqflite.dart';

import '../models/hospital.dart';
import 'database_helper.dart';

/// CRUD operations for the `hospitals` table.
class HospitalCache {
  /// Replaces all cached hospitals with [hospitals].
  /// Runs inside a transaction for atomicity.
  Future<void> saveHospitals(List<Hospital> hospitals) async {
    final db = await DatabaseHelper.instance.database;
    await db.transaction((txn) async {
      await txn.delete('hospitals');
      for (final hospital in hospitals) {
        await txn.insert(
          'hospitals',
          hospital.toMap(),
          conflictAlgorithm: ConflictAlgorithm.replace,
        );
      }
    });
  }

  /// Returns all cached hospitals, or an empty list if none.
  Future<List<Hospital>> getHospitals() async {
    final db = await DatabaseHelper.instance.database;
    final rows = await db.query('hospitals');
    return rows.map((row) => Hospital.fromMap(row)).toList();
  }

  /// Deletes all cached hospitals.
  Future<void> clear() async {
    final db = await DatabaseHelper.instance.database;
    await db.delete('hospitals');
  }
}

