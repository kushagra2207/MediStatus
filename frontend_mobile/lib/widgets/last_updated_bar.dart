import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// A slim bar that shows when data was last fetched from the server
/// and whether the device is currently offline.
///
/// Place this between the search field and the list on data screens.
class LastUpdatedBar extends StatelessWidget {
  /// When the data was last successfully refreshed. `null` means never.
  final DateTime? lastUpdated;

  /// Whether the device currently has no network connectivity.
  final bool isOffline;

  /// Called when the user taps Retry on the "no data" empty state.
  final VoidCallback? onRetry;

  const LastUpdatedBar({
    super.key,
    required this.lastUpdated,
    required this.isOffline,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    // No cached data and offline → show a prominent empty-state message.
    if (lastUpdated == null && isOffline) {
      return Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        decoration: BoxDecoration(
          color: const Color(0xFFFEF2F2),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: const Color(0xFFFECACA)),
        ),
        child: Row(
          children: [
            const Icon(Icons.cloud_off_rounded, size: 18, color: Color(0xFFEF4444)),
            const SizedBox(width: 10),
            Expanded(
              child: Text(
                'No data yet. Connect to the internet to load.',
                style: GoogleFonts.inter(
                  fontSize: 12,
                  fontWeight: FontWeight.w500,
                  color: const Color(0xFFB91C1C),
                ),
              ),
            ),
            if (onRetry != null) ...[
              const SizedBox(width: 8),
              GestureDetector(
                onTap: onRetry,
                child: Text(
                  'Retry',
                  style: GoogleFonts.inter(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFFEF4444),
                  ),
                ),
              ),
            ],
          ],
        ),
      );
    }

    // We have a timestamp → show the relative time.
    if (lastUpdated == null) return const SizedBox.shrink();

    final timeAgo = _formatTimeAgo(lastUpdated!);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
      child: Row(
        children: [
          Icon(
            isOffline ? Icons.cloud_off_rounded : Icons.check_circle_outline_rounded,
            size: 14,
            color: isOffline ? const Color(0xFFD97706) : const Color(0xFF16A34A),
          ),
          const SizedBox(width: 6),
          Expanded(
            child: Text(
              isOffline
                  ? 'Offline · Updated $timeAgo'
                  : 'Updated $timeAgo',
              style: GoogleFonts.inter(
                fontSize: 11,
                fontWeight: FontWeight.w500,
                color: isOffline ? const Color(0xFFD97706) : const Color(0xFF64748B),
              ),
            ),
          ),
        ],
      ),
    );
  }

  /// Converts a [DateTime] into a human-readable relative string.
  static String _formatTimeAgo(DateTime dateTime) {
    final now = DateTime.now();
    final diff = now.difference(dateTime);

    if (diff.inSeconds < 30) return 'just now';
    if (diff.inMinutes < 1) return '${diff.inSeconds}s ago';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    if (diff.inDays < 7) return '${diff.inDays}d ago';

    // Older than a week — show the date.
    final d = dateTime;
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return '${d.day} ${months[d.month - 1]}';
  }
}

