import 'dart:async';
import 'package:connectivity_plus/connectivity_plus.dart';

/// Singleton service that exposes the device's network connectivity status
/// as a stream and a one-shot check.
class ConnectivityService {
  static final ConnectivityService instance = ConnectivityService._();
  ConnectivityService._();

  final Connectivity _connectivity = Connectivity();

  StreamController<bool>? _controller;
  StreamSubscription<List<ConnectivityResult>>? _subscription;

  /// Stream that emits `true` when connected and `false` when offline.
  /// Broadcast stream — multiple listeners allowed.
  Stream<bool> get onConnectivityChanged {
    if (_controller == null) {
      _controller = StreamController<bool>.broadcast();
      _subscription = _connectivity.onConnectivityChanged.listen((results) {
        final connected = results.isNotEmpty &&
            !results.contains(ConnectivityResult.none);
        _controller!.add(connected);
      });
    }
    return _controller!.stream;
  }

  /// One-shot check of current connectivity.
  Future<bool> get isConnected async {
    final results = await _connectivity.checkConnectivity();
    return results.isNotEmpty && !results.contains(ConnectivityResult.none);
  }

  void dispose() {
    _subscription?.cancel();
    _subscription = null;
    _controller?.close();
    _controller = null;
  }
}

