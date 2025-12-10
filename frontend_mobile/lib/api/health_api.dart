import 'dart:convert';
import 'package:http/http.dart' as http;
import '../core/config/env.dart';

class HealthApi {
  final http.Client _client;

  HealthApi({http.Client? client}) : _client = client ?? http.Client();

  Future<bool> checkHealth() async {
    final uri = Uri.parse('$apiBaseUrl/health');

    try {
      final res = await _client.get(uri).timeout(const Duration(seconds: 60));

      if (res.statusCode == 200) {
        final decoded = jsonDecode(res.body);
        return decoded['status'] == 'ok';
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}