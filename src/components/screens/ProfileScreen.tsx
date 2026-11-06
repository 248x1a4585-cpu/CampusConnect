import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { SUBJECT_ATTENDANCE } from '../../data/initialData';
import { FLUTTER_SOURCE_FILES } from '../../data/flutterSourceCode';
import {
  User,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles,
  CreditCard,
  Moon,
  Sun,
  Users,
  ExternalLink,
  ChevronRight,
  Edit3,
  Save,
  X,
  Building,
  Beaker,
  Check,
  LogIn,
  FileText,
  Download,
  Receipt,
  FileDown,
  CheckCheck,
  Terminal,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DEPARTMENTS_LIST = [
  'Computer Science & Engineering',
  'Electronics & Comm (ECE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
];

const YEARS_LIST = ['I Year', 'II Year', 'III Year', 'IV Year'];
const SEMESTERS_LIST = ['I Semester', 'II Semester'];

export const ProfileScreen: React.FC = () => {
  const {
    activeStudent,
    updateStudent,
    currentRole,
    setCurrentRole,
    isDarkMode,
    toggleDarkMode,
    setIsIdCardOpen,
    setIsLoginModalOpen,
    setIsCodeViewerOpen,
    showToast,
  } = useCampus();

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    name: activeStudent.name,
    rollNo: activeStudent.rollNo,
    email: activeStudent.email,
    phone: activeStudent.phone,
    department: activeStudent.department,
    year: activeStudent.year,
    semester: activeStudent.semester,
    section: activeStudent.section,
    classroomNumber: activeStudent.classroomNumber,
    floor: activeStudent.floor,
    location: activeStudent.location,
    allottedLab: activeStudent.allottedLab,
    labFloor: activeStudent.labFloor,
    mentorFaculty: activeStudent.mentorFaculty,
    parentName: activeStudent.parentName,
    emergencyContact: activeStudent.emergencyContact,
  });

  const handleOpenEdit = () => {
    setFormData({
      name: activeStudent.name,
      rollNo: activeStudent.rollNo,
      email: activeStudent.email,
      phone: activeStudent.phone,
      department: activeStudent.department,
      year: activeStudent.year,
      semester: activeStudent.semester,
      section: activeStudent.section,
      classroomNumber: activeStudent.classroomNumber,
      floor: activeStudent.floor,
      location: activeStudent.location,
      allottedLab: activeStudent.allottedLab,
      labFloor: activeStudent.labFloor,
      mentorFaculty: activeStudent.mentorFaculty,
      parentName: activeStudent.parentName,
      emergencyContact: activeStudent.emergencyContact,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rollNo.trim()) {
      showToast('Name and Roll Number cannot be empty!');
      return;
    }

    updateStudent({
      ...activeStudent,
      name: formData.name.trim(),
      rollNo: formData.rollNo.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      department: formData.department.trim(),
      year: formData.year.trim(),
      semester: formData.semester.trim(),
      section: formData.section.trim(),
      classroomNumber: formData.classroomNumber.trim(),
      floor: formData.floor.trim(),
      location: formData.location.trim(),
      allottedLab: formData.allottedLab.trim(),
      labFloor: formData.labFloor.trim(),
      mentorFaculty: formData.mentorFaculty.trim(),
      parentName: formData.parentName.trim(),
      emergencyContact: formData.emergencyContact.trim(),
    });

    setIsEditModalOpen(false);
    showToast('Profile and department details updated successfully!');
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  // Download Flutter Code PDF / Code Document
  const handleDownloadFlutterCodePdf = () => {
    const content = `================================================================================
CAMPUSCONNECT - ADVANCED COLLEGE MANAGEMENT & STUDENT COMMUNICATION APP
OFFICIAL FLUTTER CODEBASE SPECIFICATION REPORT
================================================================================
Institution: Kallam Haranadhareddy Institute of Technology (KHIT), Guntur
Affiliation: Autonomous Institution affiliated to JNTUK, Kakinada
Department: ${activeStudent.department}
Academic Year: 2026-2027
Date Generated: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}

FLUTTER GROUP PROJECT TEAM MEMBERS:
1. KOPPARTHI ANJI REDDY (Team Lead) - Roll No: 248X1A4575
   Role: Architecture, Multi-Role Auth, Provider Global State & Room/Lab Allocations
2. MADDIKARA SRIHARINADH REDDY - Roll No: 248X1A4583
   Role: UI/UX Material 3 Design, Notice Board, Events Management, Digital ID
3. MADDU KARUNYA - Roll No: 248X1A4585
   Role: Study Materials, Venue Directory, Form Validations, Testing & Defect Log

--------------------------------------------------------------------------------
PROJECT OVERVIEW & SPECIFICATION:
--------------------------------------------------------------------------------
Framework: Flutter 3.35 & Dart with Null Safety
State Management: Provider 6.1.2 (MultiProvider Reactive Architecture)
Local Storage: SharedPreferences (Persistent JSON serialization)
Design System: Material Design 3 with KHIT Collegiate Blue (#1A56DB) seed
Build Output: release APK (armeabi-v7a / arm64-v8a)

--------------------------------------------------------------------------------
INDEX OF FLUTTER SOURCE FILES (11 FILES):
--------------------------------------------------------------------------------
1. pubspec.yaml
2. lib/main.dart
3. lib/models/student_model.dart
4. lib/models/campus_venue.dart
5. lib/screens/student_management_screen.dart
6. lib/theme/app_theme.dart
7. lib/models/notice_model.dart
8. lib/providers/notice_provider.dart
9. lib/screens/add_notice_screen.dart
10. test/widget_test.dart
11. README.md

` + FLUTTER_SOURCE_FILES.map((f, i) => `
================================================================================
[FILE ${i + 1}/11]: ${f.filename}
Category: ${f.category}
Description: ${f.description}
================================================================================
${f.code}
`).join('\n\n');

    const blob = new Blob([content], { type: 'application/pdf;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CampusConnect_Flutter_SourceCode_KHIT.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded CampusConnect_Flutter_SourceCode_KHIT.pdf!');
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  // Download Fee Receipt PDF
  const handleDownloadFeeReceipt = () => {
    const receiptContent = `================================================================================
KALLAM HARANADHAREDDY INSTITUTE OF TECHNOLOGY (KHIT)
Chowdavaram, Guntur - 522019, Andhra Pradesh
(Autonomous Institution Affiliated to JNTUK | Approved by AICTE | Accredited by NAAC 'A')
================================================================================
OFFICIAL AUTONOMOUS FEE RECEIPT & CLEARANCE CERTIFICATE
Academic Year: 2026-2027 | B.Tech Semester End Regular Examinations
================================================================================

Receipt No: KHIT/2026/FEE/84219              Receipt Date: 12-Oct-2026
Student Name: ${activeStudent.name.toUpperCase()}
Roll Number: ${activeStudent.rollNo}
Branch/Department: ${activeStudent.department}
Class: ${activeStudent.year} (${activeStudent.semester}) - Section: ${activeStudent.section}
Parent / Guardian: ${activeStudent.parentName}
Classroom Venue: ${activeStudent.classroomNumber} (${activeStudent.floor}, ${activeStudent.location})
Practical Lab: ${activeStudent.allottedLab} (${activeStudent.labFloor})

ANNUAL FEE HEADS ITEMIZED BREAKDOWN:
--------------------------------------------------------------------------------
1. Autonomous Tuition & Academic Development Fee:     Rs. 75,000.00   [PAID IN FULL]
2. End Semester Regular Exam & Hall Ticket Fee:        Rs.  3,500.00   [PAID IN FULL]
3. JNTUK Registration & University Common Fund:        Rs.  2,500.00   [PAID IN FULL]
4. Practical Mobile & Computing Lab Maintenance Fee:   Rs.  4,000.00   [PAID IN FULL]
5. Central Digital Library & Student Amenities Fee:    Rs.  1,500.00   [PAID IN FULL]
--------------------------------------------------------------------------------
TOTAL ANNUAL COLLEGE FEE:                              Rs. 86,500.00
TOTAL AMOUNT RECEIVED & REALIZED:                      Rs. 86,500.00
OUTSTANDING DUES / BALANCE PAYABLE:                    Rs.      0.00 (NIL)
--------------------------------------------------------------------------------
FEE CLEARANCE STATUS: 100% CLEARED & AUTONOMOUS HALL TICKET ISSUED
Transaction ID: HDFC_UPI_77192083910
Authorization Seal: KHIT-AUT-HALLTICKET-ELG-2026-NOV

This is an authorized official document issued by the Accounts & Examination Section, KHIT Guntur.
Controller of Examinations | Principal, KHIT Guntur
================================================================================`;

    const blob = new Blob([receiptContent], { type: 'application/pdf;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KHIT_Fee_Receipt_${activeStudent.rollNo}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Official Fee Receipt downloaded for ${activeStudent.rollNo}!`);
  };

  return (
    <div className="space-y-5 pb-8 animate-fadeIn">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-black text-2xl shadow-md border-2 border-white dark:border-slate-800">
                {activeStudent.name.slice(0, 2).toUpperCase()}
              </div>
              <div
                className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white border-2 border-white dark:border-slate-900"
                title="Active Student"
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {activeStudent.name}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {activeStudent.year}
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                Roll No: {activeStudent.rollNo} • {activeStudent.section}
              </p>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {activeStudent.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* EDIT BUTTON ON PROFILE */}
            <button
              onClick={handleOpenEdit}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold transition-all shadow-sm"
              title="Edit Profile, Department & Venues"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>

            {/* Digital ID Button */}
            <button
              onClick={() => setIsIdCardOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition-all shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Digital ID</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Contact details grid */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">{activeStudent.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{activeStudent.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{activeStudent.location}</span>
          </div>
        </div>
      </div>

      {/* Role Switcher & Login Panel */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Interactive Multi-Role Access
          </span>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <LogIn className="w-3 h-3" />
            <span>Open Login Portal</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'student', label: 'Student View', desc: `${activeStudent.name} (${activeStudent.rollNo})` },
            { id: 'faculty', label: 'Faculty View', desc: 'Prof. Dr. P. Siva Prasad' },
            { id: 'parent', label: 'Parent View', desc: activeStudent.parentName },
          ].map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setCurrentRole(role.id as any);
                showToast(`Switched view to ${role.label}`);
              }}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                currentRole === role.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              <div className="text-xs font-bold">{role.label}</div>
              <div
                className={`text-[10px] truncate mt-0.5 ${
                  currentRole === role.id ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {role.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Student Assigned Campus Venues */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-600" />
            <span>Assigned Campus Venues & Practical Lab</span>
          </h3>
          <button
            onClick={handleOpenEdit}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3" />
            <span>Modify Venues</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-[10px] uppercase font-bold text-slate-400">Classroom Location</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {activeStudent.classroomNumber}
            </div>
            <div className="text-blue-600 dark:text-blue-400 font-semibold">{activeStudent.floor}</div>
            <div className="text-slate-500 mt-1">{activeStudent.location}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-[10px] uppercase font-bold text-slate-400">Allotted Practical Lab</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {activeStudent.allottedLab}
            </div>
            <div className="text-indigo-600 dark:text-indigo-400 font-semibold">{activeStudent.labFloor}</div>
            <div className="text-slate-500 mt-1">{activeStudent.location}</div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Subject-Wise Attendance Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Overall: <strong className="text-emerald-600">{activeStudent.attendancePercent}%</strong> (Threshold: 75%)
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            JNTUK Eligible
          </span>
        </div>

        <div className="space-y-3">
          {SUBJECT_ATTENDANCE.map((sub) => {
            const pct = Math.round((sub.attended / sub.total) * 100);
            return (
              <div key={sub.code} className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-700 dark:text-slate-200">
                  <div className="font-semibold truncate pr-2">
                    <span className="font-mono text-slate-400 mr-1.5">{sub.code}</span>
                    {sub.name}
                  </div>
                  <div className="font-mono font-bold whitespace-nowrap">
                    {sub.attended}/{sub.total} classes ({pct}%)
                  </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pct >= 85
                        ? 'bg-emerald-500'
                        : pct >= 75
                        ? 'bg-blue-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEE DETAILS & CLEARANCE SECTION IN PROFILE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Fee Structure & Autonomous Clearance (2026-2027)
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Official accounts clearance for {activeStudent.year} • {activeStudent.department}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Cleared (No Dues)</span>
            </span>
            <button
              onClick={handleDownloadFeeReceipt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
              title="Download official fee receipt document"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Fee Receipt (PDF)</span>
            </button>
          </div>
        </div>

        {/* Fee Heads Breakdown */}
        <div className="space-y-2.5 text-xs">
          {[
            { head: 'Autonomous Tuition & Academic Development Fee', amount: '₹75,000.00', status: 'Paid in Full' },
            { head: 'End Semester Regular Exam & Hall Ticket Fee', amount: '₹3,500.00', status: 'Paid in Full' },
            { head: 'JNTUK Registration & University Common Fund', amount: '₹2,500.00', status: 'Paid in Full' },
            { head: 'Computing & Mobile Application Lab Maintenance Fee', amount: '₹4,000.00', status: 'Paid in Full' },
            { head: 'Central Digital Library & Student Amenities Fee', amount: '₹1,500.00', status: 'Paid in Full' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80"
            >
              <div className="flex items-center gap-2">
                <CheckCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-medium text-slate-800 dark:text-slate-200">{item.head}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-900 dark:text-white">{item.amount}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary Footer */}
        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            <span className="text-slate-500 text-[11px]">Total Prescribed Fee:</span>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">₹86,500.00</div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
            <span className="text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">Total Paid Amount:</span>
            <div className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">₹86,500.00</div>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
            <span className="text-blue-700 dark:text-blue-300 text-[11px] font-semibold">Outstanding Dues:</span>
            <div className="text-base font-black text-blue-600 dark:text-blue-400 mt-0.5">₹0.00 (NIL)</div>
          </div>
        </div>

        {/* Transaction Reference & Hall Ticket status */}
        <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-400">
          <div>
            Payment Mode: <strong className="text-slate-900 dark:text-white">HDFC Autonomous Fee Gateway (UPI)</strong> • Ref: <span className="font-mono text-blue-600">KHIT/2026/FEE/84219</span>
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Hall Ticket Clearance Verified</span>
          </div>
        </div>
      </div>

      {/* IITM Pravartak Project & Team Information Card */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-5 border border-slate-800 shadow-md">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500 text-white">
              IITM Pravartak Technologies
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              Flutter Group Project Specification
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Kallam Haranadhareddy Institute of Technology (KHIT), Guntur
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 space-y-2.5 text-xs">
          <div className="font-bold text-slate-300">Contributing Team Members:</div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-bold text-amber-300">1. KOPPARTHI ANJI REDDY (Team Lead)</div>
                <div className="text-slate-400 text-[11px]">Architecture, Multi-Role Auth & Provider State</div>
              </div>
              <div className="font-mono text-xs font-bold text-white bg-slate-700 px-2 py-1 rounded">
                248X1A4575
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">2. MADDIKARA SRIHARINADH REDDY</div>
                <div className="text-slate-400 text-[11px]">UI/UX Design, Notice Board, Events Management, Digital ID</div>
              </div>
              <div className="font-mono text-xs font-bold text-white bg-slate-700 px-2 py-1 rounded">
                248X1A4583
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-200">3. MADDU KARUNYA</div>
                <div className="text-slate-400 text-[11px]">Study Materials, Venue Allocations, Form Validations, Testing</div>
              </div>
              <div className="font-mono text-xs font-bold text-white bg-slate-700 px-2 py-1 rounded">
                248X1A4585
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLUTTER CODE PDF AT PROFILE END */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 border border-blue-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md text-amber-400 border border-white/20 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  Flutter Code PDF
                </span>
                <span className="text-[11px] text-blue-200">11 Full Source Files • 100% Null Safety</span>
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                CampusConnect Flutter Source Code & Architecture Document
              </h3>
              <p className="text-xs text-blue-100 mt-1 max-w-xl leading-relaxed">
                Download the complete verified Flutter project specification report including pubspec.yaml, MultiProvider architecture, models, screens, tests, and team credentials for submission.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <button
              onClick={handleDownloadFlutterCodePdf}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Flutter Code (PDF)</span>
            </button>
            <button
              onClick={() => setIsCodeViewerOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
            >
              <Terminal className="w-4 h-4 text-blue-300" />
              <span>Browse Code In-App</span>
            </button>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500 text-white">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Edit Student Profile & Department
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Update student credentials, department, classroom, lab, and contact
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
              {/* Name & Roll No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono uppercase focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              {/* EDIT DEPARTMENT OPTION */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Department / Branch *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600"
                >
                  {DEPARTMENTS_LIST.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year, Semester & Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Year of Study
                  </label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  >
                    {YEARS_LIST.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Semester
                  </label>
                  <select
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  >
                    {SEMESTERS_LIST.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="Section B"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Classroom & Floor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class Room Number
                  </label>
                  <input
                    type="text"
                    value={formData.classroomNumber}
                    onChange={(e) => setFormData({ ...formData, classroomNumber: e.target.value })}
                    placeholder="Room 304"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class Floor Level
                  </label>
                  <input
                    type="text"
                    value={formData.floor}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    placeholder="3rd Floor"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Lab & Lab Floor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Allotted Practical Lab
                  </label>
                  <input
                    type="text"
                    value={formData.allottedLab}
                    onChange={(e) => setFormData({ ...formData, allottedLab: e.target.value })}
                    placeholder="Lab 4: Mobile Computing & Flutter Lab"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lab Floor & Wing
                  </label>
                  <input
                    type="text"
                    value={formData.labFloor}
                    onChange={(e) => setFormData({ ...formData, labFloor: e.target.value })}
                    placeholder="Ground Floor"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Building Block Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Sir M. Visvesvaraya Block"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Emergency Contact Number
                  </label>
                  <input
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Mentor
                </label>
                <input
                  type="text"
                  value={formData.mentorFaculty}
                  onChange={(e) => setFormData({ ...formData, mentorFaculty: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold shadow-md shadow-blue-500/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
