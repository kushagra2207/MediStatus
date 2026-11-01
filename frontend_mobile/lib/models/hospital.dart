class Hospital {
  final String id;
  final String name;
  final String address;
  final String contact;

  Hospital({
    required this.id,
    required this.name,
    required this.address,
    required this.contact
  });

  factory Hospital.fromJson(Map<String, dynamic> json) {
    return Hospital(
      id: json['_id']?.toString() ?? '',
      name: json['name'] as String? ?? 'Unknown Hospital',
      address: json['address'] as String? ?? 'Address not available',
      contact: json['contact'] as String? ?? 'Contact not available'
    );
  }

  /// Convert to a Map for SQLite insertion.
  Map<String, dynamic> toMap() => {
    'id': id,
    'name': name,
    'address': address,
    'contact': contact,
  };

  /// Create a Hospital from a SQLite row.
  factory Hospital.fromMap(Map<String, dynamic> map) {
    return Hospital(
      id: map['id'] as String,
      name: map['name'] as String,
      address: map['address'] as String,
      contact: map['contact'] as String,
    );
  }
}
