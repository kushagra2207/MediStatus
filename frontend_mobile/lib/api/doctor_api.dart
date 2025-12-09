import 'dart:convert';
import 'package:http/http.dart' as http;

import '../core/config/env.dart';
import '../models/doctor.dart';

class DoctorApi {
  final http.Client _client;

  DoctorApi({http.Client? client}) : _client = client ?? http.Client();

  Future<List<Doctor>> fetchDoctorsByHospital(String hospitalId) async {
    final uri = Uri.parse('$apiBaseUrl/api/doctors/hospital/$hospitalId');

    final res = await _client.get(uri).timeout(const Duration(seconds: 60));

    if (res.statusCode == 200) {
      final List<dynamic> decoded = jsonDecode(res.body);
      return decoded.map((e) => Doctor.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load doctors: ${res.statusCode}');
    }
  }

  Future<Doctor> fetchDoctorById(String doctorId) async {
    final uri = Uri.parse('$apiBaseUrl/api/doctors/id/$doctorId');

    final res = await _client.get(uri).timeout(const Duration(seconds: 60));

    if (res.statusCode == 200) {
      final Map<String, dynamic> decoded = jsonDecode(res.body);
      return Doctor.fromJson(decoded);
    } else {
      throw Exception('Failed to fetch doctor details: ${res.statusCode}');
    }
  }
}