/// Wraps data returned by a repository with cache metadata.
///
/// Screens use [lastUpdated] to display "Last updated: X ago" and
/// [isFromCache] to show an offline indicator when serving stale data.
class CachedResult<T> {
  final T data;

  /// When the data was last successfully fetched from the network.
  /// `null` means data has never been fetched.
  final DateTime? lastUpdated;

  /// `true` when the returned data came from the local cache
  /// because the network request failed.
  final bool isFromCache;

  CachedResult({
    required this.data,
    this.lastUpdated,
    this.isFromCache = false,
  });
}

