import 'dart:convert';
import 'package:http/http.dart' as http;

import '../core/config/env.dart';
import '../models/hospital.dart';

class HospitalApi {
  final http.Client _client;

  HospitalApi({http.Client? client}) : _client = client ?? http.Client();

  Future<List<Hospital>> fetchHospitals() async {
    final uri = Uri.parse('$apiBaseUrl/api/hospitals');
    final res = await _client.get(uri).timeout(const Duration(seconds: 60));

    if (res.statusCode == 200) {
      final List<dynamic> decoded = jsonDecode(res.body);
      return decoded.map((e) => Hospital.fromJson(e)).toList();
    } else {
      throw Exception('Failed to load hospitals: ${res.statusCode}');
    }
  }
}