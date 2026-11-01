import 'package:sqflite/sqflite.dart';

import 'database_helper.dart';

/// Manages the `cache_metadata` table which stores the last-updated
/// timestamp for each cache key (e.g. `hospitals`, `doctors_hospitalId`).
class CacheMetadata {
  /// Records the current time as the last-updated timestamp for [key].
  Future<void> setLastUpdated(String key) async {
    final db = await DatabaseHelper.instance.database;
    await db.insert(
      'cache_metadata',
      {
        'key': key,
        'updated_at': DateTime.now().millisecondsSinceEpoch,
      },
      conflictAlgorithm: ConflictAlgorithm.replace,
    );
  }

  /// Returns the last-updated [DateTime] for [key], or `null` if never set.
  Future<DateTime?> getLastUpdated(String key) async {
    final db = await DatabaseHelper.instance.database;
    final rows = await db.query(
      'cache_metadata',
      where: 'key = ?',
      whereArgs: [key],
      limit: 1,
    );

    if (rows.isEmpty) return null;

    final millis = rows.first['updated_at'] as int;
    return DateTime.fromMillisecondsSinceEpoch(millis);
  }
}
