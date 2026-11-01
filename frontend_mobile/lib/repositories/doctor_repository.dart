import '../api/doctor_api.dart';
import '../cache/doctor_cache.dart';
import '../cache/cache_metadata.dart';
import '../models/doctor.dart';
import '../services/connectivity_service.dart';
import 'cached_result.dart';

/// Orchestrates [DoctorApi] and [DoctorCache] to provide an
/// offline-first data loading strategy for doctors.
class DoctorRepository {
  final DoctorApi _api;
  final DoctorCache _cache;
  final CacheMetadata _metadata;

  DoctorRepository({
    DoctorApi? api,
    DoctorCache? cache,
    CacheMetadata? metadata,
  })  : _api = api ?? DoctorApi(),
        _cache = cache ?? DoctorCache(),
        _metadata = metadata ?? CacheMetadata();

  /// Cache key scoped to a specific hospital.
  static String _cacheKey(String hospitalId) => 'doctors_$hospitalId';

  /// Returns locally cached doctors for [hospitalId], or `null` if the
  /// cache is empty. This is a fast, offline-only read — no network call.
  Future<CachedResult<List<Doctor>>?> getCached(String hospitalId) async {
    final cached = await _cache.getDoctorsByHospital(hospitalId);
    if (cached.isEmpty) return null;
    final lastUpdated = await _metadata.getLastUpdated(_cacheKey(hospitalId));
    return CachedResult(data: cached, lastUpdated: lastUpdated, isFromCache: true);
  }

  /// Fetches doctors for [hospitalId] using a *network-first, cache-fallback*
  /// strategy. See [HospitalRepository.getHospitals] for the full description.
  Future<CachedResult<List<Doctor>>> getDoctorsByHospital(String hospitalId) async {
    final cachedDoctors = await _cache.getDoctorsByHospital(hospitalId);
    final lastUpdated = await _metadata.getLastUpdated(_cacheKey(hospitalId));
    final hasCachedData = cachedDoctors.isNotEmpty;

    // Quick exit when we know there's no network.
    final isConnected = await ConnectivityService.instance.isConnected;
    if (!isConnected) {
      if (hasCachedData) {
        return CachedResult(
          data: cachedDoctors,
          lastUpdated: lastUpdated,
          isFromCache: true,
        );
      }
      throw Exception('No internet connection and no cached data available');
    }

    // Online → try the API.
    try {
      final freshDoctors = await _api.fetchDoctorsByHospital(hospitalId);
      await _cache.saveDoctors(hospitalId, freshDoctors);
      await _metadata.setLastUpdated(_cacheKey(hospitalId));
      return CachedResult(
        data: freshDoctors,
        lastUpdated: DateTime.now(),
        isFromCache: false,
      );
    } catch (e) {
      // API failed — serve stale cache if available.
      if (hasCachedData) {
        return CachedResult(
          data: cachedDoctors,
          lastUpdated: lastUpdated,
          isFromCache: true,
        );
      }
      rethrow;
    }
  }
}
