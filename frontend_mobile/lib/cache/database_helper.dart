import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

/// Singleton helper that manages the SQLite database lifecycle.
class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._();
  DatabaseHelper._();

  static const _databaseName = 'medistatus_cache.db';
  static const _databaseVersion = 1;

  Database? _database;

  Future<Database> get database async {
    _database ??= await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, _databaseName);

    return openDatabase(
      path,
      version: _databaseVersion,
      onCreate: _onCreate,
      onUpgrade: _onUpgrade,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE hospitals (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        contact TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE doctors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        specialization TEXT NOT NULL,
        email TEXT NOT NULL,
        hospital_id TEXT NOT NULL,
        hospital_name TEXT NOT NULL,
        hospital_address TEXT NOT NULL,
        hospital_contact TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE availability_slots (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id TEXT NOT NULL,
        day TEXT NOT NULL,
        from_time TEXT NOT NULL,
        to_time TEXT NOT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE
      )
    ''');

    await db.execute('''
      CREATE TABLE cache_metadata (
        key TEXT PRIMARY KEY,
        updated_at INTEGER NOT NULL
      )
    ''');

    // Index for faster doctor lookups by hospital
    await db.execute(
      'CREATE INDEX idx_doctors_hospital_id ON doctors (hospital_id)'
    );

    // Index for faster slot lookups by doctor
    await db.execute(
      'CREATE INDEX idx_slots_doctor_id ON availability_slots (doctor_id)'
    );
  }

  Future<void> _onUpgrade(Database db, int oldVersion, int newVersion) async {
    // Handle future migrations here.
    // For now, v1 is the only version.
  }
}

