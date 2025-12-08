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
}