import 'package:sqflite/sqflite.dart';

import '../models/doctor.dart';
import 'database_helper.dart';

/// CRUD operations for the `doctors` and `availability_slots` tables.
class DoctorCache {
  /// Replaces all cached doctors for [hospitalId] with [doctors].
  /// Also replaces their availability slots. Runs in a transaction.
  Future<void> saveDoctors(String hospitalId, List<Doctor> doctors) async {
    final db = await DatabaseHelper.instance.database;
    await db.transaction((txn) async {
      // Find existing doctor IDs for this hospital so we can delete their slots.
      final existing = await txn.query(
        'doctors',
        columns: ['id'],
        where: 'hospital_id = ?',
        whereArgs: [hospitalId],
      );
      final existingIds = existing.map((r) => r['id'] as String).toList();

      // Delete old availability slots for those doctors.
      if (existingIds.isNotEmpty) {
        final placeholders = existingIds.map((_) => '?').join(',');
        await txn.delete(
          'availability_slots',
          where: 'doctor_id IN ($placeholders)',
          whereArgs: existingIds,
        );
      }

      // Delete old doctors for this hospital.
      await txn.delete('doctors', where: 'hospital_id = ?', whereArgs: [hospitalId]);

      // Insert new doctors and their slots.
      for (final doctor in doctors) {
        await txn.insert(
          'doctors',
          doctor.toMap(),
          conflictAlgorithm: ConflictAlgorithm.replace,
        );
        for (final slot in doctor.availability) {
          await txn.insert('availability_slots', {
            'doctor_id': doctor.id,
            ...slot.toMap(),
          });
        }
      }
    });
  }

  /// Returns all cached doctors for [hospitalId], with their availability
  /// slots attached, or an empty list if none.
  Future<List<Doctor>> getDoctorsByHospital(String hospitalId) async {
    final db = await DatabaseHelper.instance.database;

    // Fetch doctors for this hospital.
    final doctorRows = await db.query(
      'doctors',
      where: 'hospital_id = ?',
      whereArgs: [hospitalId],
    );

    if (doctorRows.isEmpty) return [];

    // Fetch all slots for these doctors in one query.
    final doctorIds = doctorRows.map((r) => r['id'] as String).toList();
    final placeholders = doctorIds.map((_) => '?').join(',');
    final slotRows = await db.query(
      'availability_slots',
      where: 'doctor_id IN ($placeholders)',
      whereArgs: doctorIds,
    );

    // Group slots by doctor_id.
    final slotsMap = <String, List<AvailabilitySlot>>{};
    for (final row in slotRows) {
      final doctorId = row['doctor_id'] as String;
      slotsMap.putIfAbsent(doctorId, () => []);
      slotsMap[doctorId]!.add(AvailabilitySlot.fromMap(row));
    }

    // Assemble Doctor objects.
    return doctorRows.map((row) {
      final id = row['id'] as String;
      return Doctor.fromMap(row, slotsMap[id] ?? []);
    }).toList();
  }

  /// Deletes all cached doctors for [hospitalId] and their slots.
  Future<void> clearByHospital(String hospitalId) async {
    final db = await DatabaseHelper.instance.database;
    await db.transaction((txn) async {
      final existing = await txn.query(
        'doctors',
        columns: ['id'],
        where: 'hospital_id = ?',
        whereArgs: [hospitalId],
      );
      final ids = existing.map((r) => r['id'] as String).toList();

      if (ids.isNotEmpty) {
        final placeholders = ids.map((_) => '?').join(',');
        await txn.delete(
          'availability_slots',
          where: 'doctor_id IN ($placeholders)',
          whereArgs: ids,
        );
      }

      await txn.delete('doctors', where: 'hospital_id = ?', whereArgs: [hospitalId]);
    });
  }
}

