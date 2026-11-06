# CampusConnect – Advanced College Management & Student Communication App

**Institution:** Kallam Haranadhareddy Institute of Technology (KHIT), Guntur
**Affiliation:** Autonomous institution affiliated to JNTUK
**Program:** IITM Pravartak Technologies Flutter Group Project Specification

### Flutter Group Project Team Members:
1. **KOPPARTHI ANJI REDDY** – Roll No: `248X1A4575` (Team Lead, Architecture, Multi-Role Auth & Provider State)
2. **MADDIKARA SRIHARINADH REDDY** – Roll No: `248X1A4583` (UI/UX Design, Notice Board, Events Management, Digital ID)
3. **MADDU KARUNYA** – Roll No: `248X1A4585` (Study Materials, Venue Allocations, Form Validations, Testing & Defect Log)

---

## 1. Project Overview
CampusConnect is a centralized, production-grade mobile platform developed in Flutter 3.35 and Dart with null safety. It integrates college notices, upcoming events, academic study resources, role-based login (Student, Faculty, Parent), and campus infrastructure management (Labs, Classrooms, Floors, and Block Locations).

## 2. Multi-Role Authentication & Access Control
- **Student Role:** Access to academic schedule, assigned classroom (Room 304), practical lab (Lab 4), attendance (86.4%), events, and digital ID card.
- **Faculty / Admin Role:** Full permissions to EDIT student details, roll numbers, classroom numbers, labs, floors, and publish notices.
- **Parent Role:** Monitoring portal for student attendance, semester CGPA, fee clearance status, exam schedules, and teacher remarks.

## 3. Campus Infrastructure Directory
- **Classroom Numbers & Floors:** Room 304 (3rd Floor), Room 306 (3rd Floor) in Sir M. Visvesvaraya Engineering Block.
- **Laboratories:** Lab 4 (Mobile Computing & Flutter Lab, Ground Floor), Lab 2 (DSA Lab, 1st Floor), Lab 6 (IoT Lab, 2nd Floor).

---

## 4. How to Build Release APK
Run the following commands on Windows 11 terminal:
```bash
flutter clean
flutter pub get
flutter test
flutter build apk --release --split-per-abi
```
Output path: `build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk`
