import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { UserRole } from '../types';
import {
  X,
  GraduationCap,
  Briefcase,
  Users,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  LogIn,
  ArrowRight,
  Sparkles,
  Lock,
  UserCheck,
  Building,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    currentRole,
    setCurrentRole,
    activeStudent,
    setActiveStudentId,
    students,
    showToast,
    setActiveTab,
  } = useCampus();

  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>(currentRole);

  // Student form state
  const [studentRoll, setStudentRoll] = useState(activeStudent.rollNo);
  const [studentPass, setStudentPass] = useState('••••••••');

  // Faculty form state
  const [facultyEmail, setFacultyEmail] = useState('hod_cse@khitguntur.ac.in');
  const [facultyPass, setFacultyPass] = useState('••••••••');

  // Parent form state
  const [parentPhone, setParentPhone] = useState('9440155672');
  const [parentOtp, setParentOtp] = useState('7524');

  if (!isLoginModalOpen) return null;

  const handleStudentLogin = (roll: string) => {
    const foundStudent = students.find(
      (s) => s.rollNo.toLowerCase() === roll.trim().toLowerCase()
    );
    if (foundStudent) {
      setActiveStudentId(foundStudent.id);
    }
    setCurrentRole('student');
    setIsLoginModalOpen(false);
    showToast(`Logged in as Student: ${foundStudent ? foundStudent.name : roll}`);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  const handleFacultyLogin = () => {
    setCurrentRole('faculty');
    setIsLoginModalOpen(false);
    showToast('Logged in as Faculty: Prof. Dr. P. Siva Prasad (HOD - CSE)');
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  const handleParentLogin = () => {
    setCurrentRole('parent');
    setIsLoginModalOpen(false);
    showToast(`Logged in as Parent: ${activeStudent.parentName} (Ward: ${activeStudent.rollNo})`);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <LogIn className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  KHIT CampusConnect Login
                </h3>
                <p className="text-xs text-blue-100">
                  Select your role to access customized college services
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Active Session Badge */}
          <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-100">
            <span>Currently Active:</span>
            <span className="font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded-full capitalize flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {currentRole} Role
            </span>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-3 p-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 gap-1 text-xs">
          <button
            onClick={() => setSelectedRoleTab('student')}
            className={`py-2 px-1.5 rounded-xl font-bold flex flex-col items-center gap-1 transition-all ${
              selectedRoleTab === 'student'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student</span>
          </button>

          <button
            onClick={() => setSelectedRoleTab('faculty')}
            className={`py-2 px-1.5 rounded-xl font-bold flex flex-col items-center gap-1 transition-all ${
              selectedRoleTab === 'faculty'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Faculty</span>
          </button>

          <button
            onClick={() => setSelectedRoleTab('parent')}
            className={`py-2 px-1.5 rounded-xl font-bold flex flex-col items-center gap-1 transition-all ${
              selectedRoleTab === 'parent'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Parent</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* STUDENT LOGIN TAB */}
          {selectedRoleTab === 'student' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Student Roll Number / JNTUK HT No.
                </label>
                <input
                  type="text"
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                  placeholder="e.g. 248X1A4575"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono uppercase focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Portal Password / DOB PIN
                </label>
                <input
                  type="password"
                  value={studentPass}
                  onChange={(e) => setStudentPass(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* 1-Click demo accounts for KHIT project */}
              <div className="pt-1">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Fast 1-Click Student Sign-In:
                </span>
                <div className="space-y-1.5">
                  {students.slice(0, 3).map((std) => (
                    <button
                      key={std.id}
                      onClick={() => handleStudentLogin(std.rollNo)}
                      className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-left transition-colors"
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{std.name}</span>
                          {std.rollNo === '248X1A4575' && (
                            <span className="text-[9px] px-1 py-0.2 rounded font-bold bg-amber-400 text-slate-950">
                              Team Lead
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {std.rollNo} • {std.department.split('&')[0]}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleStudentLogin(studentRoll)}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In as Student</span>
              </button>
            </div>
          )}

          {/* FACULTY LOGIN TAB */}
          {selectedRoleTab === 'faculty' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Official Email ID / KHIT Employee ID
                </label>
                <input
                  type="email"
                  value={facultyEmail}
                  onChange={(e) => setFacultyEmail(e.target.value)}
                  placeholder="hod_cse@khitguntur.ac.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Access Key
                </label>
                <input
                  type="password"
                  value={facultyPass}
                  onChange={(e) => setFacultyPass(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-indigo-900 dark:text-indigo-200 text-[11px] leading-relaxed">
                <strong>Faculty Privileges:</strong> Full administrative rights to edit student venue allocations (Room 304, Lab 4, floors, buildings), publish campus notices, and toggle laboratory live occupancy.
              </div>

              <button
                onClick={handleFacultyLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In as Faculty (Prof. Dr. P. Siva Prasad)</span>
              </button>
            </div>
          )}

          {/* PARENT LOGIN TAB */}
          {selectedRoleTab === 'parent' && (
            <div className="space-y-3.5 animate-fadeIn">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Parent Mobile Number
                </label>
                <input
                  type="tel"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  placeholder="+91 94401 55672"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ward Roll No or SMS OTP
                </label>
                <input
                  type="text"
                  value={parentOtp}
                  onChange={(e) => setParentOtp(e.target.value)}
                  placeholder="248X1A4575 or 7524"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed">
                <strong>Parent Portal:</strong> Monitoring portal for attendance ({activeStudent.attendancePercent}%), Semester CGPA ({activeStudent.cgpa}), fee clearance status, exam hall tickets, and direct contact with mentor faculty.
              </div>

              <button
                onClick={handleParentLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>Sign In as Parent ({activeStudent.parentName})</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Kallam Haranadhareddy Institute of Technology</span>
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
