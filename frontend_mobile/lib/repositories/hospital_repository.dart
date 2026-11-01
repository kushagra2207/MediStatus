import '../api/hospital_api.dart';
import '../cache/hospital_cache.dart';
import '../cache/cache_metadata.dart';
import '../models/hospital.dart';
import '../services/connectivity_service.dart';
import 'cached_result.dart';

/// Orchestrates [HospitalApi] and [HospitalCache] to provide an
/// offline-first data loading strategy for hospitals.
class HospitalRepository {
  final HospitalApi _api;
  final HospitalCache _cache;
  final CacheMetadata _metadata;

  static const _cacheKey = 'hospitals';

  HospitalRepository({
    HospitalApi? api,
    HospitalCache? cache,
    CacheMetadata? metadata,
  })  : _api = api ?? HospitalApi(),
        _cache = cache ?? HospitalCache(),
        _metadata = metadata ?? CacheMetadata();

  /// Returns locally cached hospitals, or `null` if the cache is empty.
  /// This is a fast, offline-only read — no network call.
  Future<CachedResult<List<Hospital>>?> getCached() async {
    final cached = await _cache.getHospitals();
    if (cached.isEmpty) return null;
    final lastUpdated = await _metadata.getLastUpdated(_cacheKey);
    return CachedResult(data: cached, lastUpdated: lastUpdated, isFromCache: true);
  }

  /// Fetches hospitals from the network, updates the cache, and returns
  /// fresh data. Falls back to cache if the network call fails.
  ///
  /// 1. If offline and cache has data → return cache immediately.
  /// 2. If offline and cache is empty → throw.
  /// 3. If online → try the API.
  ///    - Success → save to cache, update timestamp, return fresh data.
  ///    - Failure → fall back to cache if available, otherwise rethrow.
  Future<CachedResult<List<Hospital>>> getHospitals() async {
    final cachedHospitals = await _cache.getHospitals();
    final lastUpdated = await _metadata.getLastUpdated(_cacheKey);
    final hasCachedData = cachedHospitals.isNotEmpty;

    // Quick exit when we know there's no network.
    final isConnected = await ConnectivityService.instance.isConnected;
    if (!isConnected) {
      if (hasCachedData) {
        return CachedResult(
          data: cachedHospitals,
          lastUpdated: lastUpdated,
          isFromCache: true,
        );
      }
      throw Exception('No internet connection and no cached data available');
    }

    // Online → try the API.
    try {
      final freshHospitals = await _api.fetchHospitals();
      await _cache.saveHospitals(freshHospitals);
      await _metadata.setLastUpdated(_cacheKey);
      return CachedResult(
        data: freshHospitals,
        lastUpdated: DateTime.now(),
        isFromCache: false,
      );
    } catch (e) {
      // API failed despite connectivity — serve stale cache if we have it.
      if (hasCachedData) {
        return CachedResult(
          data: cachedHospitals,
          lastUpdated: lastUpdated,
          isFromCache: true,
        );
      }
      rethrow;
    }
  }
}
