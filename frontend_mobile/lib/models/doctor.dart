class AvailabilitySlot {
  final String day;
  final String fromTime;
  final String toTime;

  AvailabilitySlot({
    required this.day,
    required this.fromTime,
    required this.toTime,
  });

  factory AvailabilitySlot.fromJson(Map<String, dynamic> json) {
    return AvailabilitySlot(
      day: json['day'] as String? ?? 'N/A',
      fromTime: json['from'] as String? ?? '',
      toTime: json['to'] as String? ?? '',
    );
  }

  /// Convert to a Map for SQLite insertion.
  Map<String, dynamic> toMap() => {
    'day': day,
    'from_time': fromTime,
    'to_time': toTime,
  };

  /// Create an AvailabilitySlot from a SQLite row.
  factory AvailabilitySlot.fromMap(Map<String, dynamic> map) {
    return AvailabilitySlot(
      day: map['day'] as String,
      fromTime: map['from_time'] as String,
      toTime: map['to_time'] as String,
    );
  }
}

class DoctorHospital {
  final String id;
  final String name;
  final String address;
  final String contact;

  DoctorHospital({
    required this.id,
    required this.name,
    required this.address,
    required this.contact
  });

  factory DoctorHospital.fromJson(Map<String, dynamic> json) {
    return DoctorHospital(
      id: json['_id']?.toString() ?? '',
      name: json['name'] as String? ?? 'Unknown Hospital',
      address: json['address'] as String? ?? 'Address not available',
      contact: json['contact'] as String? ?? 'Contact not available'
    );
  }
}

class Doctor {
  final String id;
  final String name;
  final String specialization;
  final String email;
  final List<AvailabilitySlot> availability;
  final DoctorHospital? hospital;

  Doctor({
    required this.id,
    required this.name,
    required this.specialization,
    required this.email,
    required this.availability,
    this.hospital
  });

  factory Doctor.fromJson(Map<String, dynamic> json) {
    final List<dynamic>? slotsJson = json['availability'] as List<dynamic>?;
    final hospitalJson = json['hospital'];

    return Doctor(
      id: json['_id']?.toString() ?? '',
      name: json['name'] as String? ?? 'Unknown Doctor',
      specialization: json['specialization'] as String? ?? 'Not specified',
      email: json['email'] as String? ?? '',
      availability: slotsJson == null
        ? []
        : slotsJson.map(
          (slot) => AvailabilitySlot.fromJson(slot as Map<String, dynamic>)
          ).toList(),
      hospital: (hospitalJson is Map<String, dynamic>) 
        ? DoctorHospital.fromJson(hospitalJson)
        : null
    );
  }

  /// Convert to a Map for SQLite insertion.
  /// Hospital info is flattened into columns since it comes embedded in the API response.
  Map<String, dynamic> toMap() => {
    'id': id,
    'name': name,
    'specialization': specialization,
    'email': email,
    'hospital_id': hospital?.id ?? '',
    'hospital_name': hospital?.name ?? '',
    'hospital_address': hospital?.address ?? '',
    'hospital_contact': hospital?.contact ?? '',
  };

  /// Create a Doctor from a SQLite row + a list of availability slots.
  factory Doctor.fromMap(Map<String, dynamic> map, List<AvailabilitySlot> slots) {
    final hospitalId = map['hospital_id'] as String? ?? '';

    return Doctor(
      id: map['id'] as String,
      name: map['name'] as String,
      specialization: map['specialization'] as String,
      email: map['email'] as String,
      availability: slots,
      hospital: hospitalId.isNotEmpty
        ? DoctorHospital(
            id: hospitalId,
            name: map['hospital_name'] as String? ?? '',
            address: map['hospital_address'] as String? ?? '',
            contact: map['hospital_contact'] as String? ?? '',
          )
        : null,
    );
  }
}
