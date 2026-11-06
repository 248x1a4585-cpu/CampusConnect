import React from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  Bell,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Phone,
  ShieldCheck,
  TrendingUp,
  Building2,
  ChevronRight,
  ExternalLink,
  CreditCard,
  UserCheck,
  LogIn,
} from 'lucide-react';
import { TODAY_TIMETABLE } from '../../data/initialData';

export const DashboardScreen: React.FC = () => {
  const {
    activeStudent,
    currentRole,
    setActiveTab,
    notices,
    venues,
    setIsIdCardOpen,
    setIsLoginModalOpen,
  } = useCampus();

  const urgentNotices = notices.filter(
    (n) => n.priority === 'Urgent' || n.priority === 'Placement'
  );

  return (
    <div className="space-y-5 pb-8 animate-fadeIn">
      {/* KHIT College Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white p-5 shadow-lg border border-blue-600/30">
        <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-amber-400 text-slate-900 shadow-xs">
                Autonomous JNTUK
              </span>
              <span className="text-blue-200 text-xs font-medium">NAAC 'A' Grade • NBA Accredited</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              CampusConnect Portal
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm font-medium mt-0.5">
              Kallam Haranadhareddy Institute of Technology (KHIT), Guntur
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsIdCardOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 backdrop-blur-md text-xs font-semibold text-white transition-all border border-white/20 shadow-sm"
              title="View Digital Identity Card"
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-300" />
              <span>Digital ID</span>
            </button>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs font-bold transition-all shadow-sm"
              title="CampusConnect Login (Student, Faculty, Parent)"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / Roles</span>
            </button>
          </div>
        </div>

        {/* User Role Banner */}
        <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-amber-300 border border-white/20">
              {currentRole === 'faculty' ? 'FP' : currentRole === 'parent' ? 'PR' : 'AR'}
            </div>
            <div>
              <div className="font-bold flex items-center gap-1.5">
                <span>
                  {currentRole === 'faculty'
                    ? 'Prof. Dr. P. Siva Prasad (HOD - CSE)'
                    : currentRole === 'parent'
                    ? `${activeStudent.parentName} (Parent)`
                    : activeStudent.name}
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-500/40 font-mono">
                  {currentRole === 'student' ? activeStudent.rollNo : currentRole.toUpperCase()}
                </span>
              </div>
              <div className="text-blue-200 text-[11px]">
                {currentRole === 'student'
                  ? `${activeStudent.department} • ${activeStudent.year}`
                  : currentRole === 'faculty'
                  ? 'Department of Computer Science & Engineering'
                  : `Ward: ${activeStudent.name} (${activeStudent.rollNo})`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-medium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Fee Cleared & Exam Eligible</span>
            </span>
          </div>
        </div>
      </div>

      {/* Academic Venue & Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Attendance */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Attendance</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {activeStudent.attendancePercent}%
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">+2.1%</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Above JNTUK 75% cutoff</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${activeStudent.attendancePercent}%` }}
            />
          </div>
        </div>

        {/* CGPA */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Cumulative GPA</span>
            <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {activeStudent.cgpa}
            </span>
            <span className="text-xs text-slate-400">/ 10.0</span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">Autonomous Rank #4</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all"
              style={{ width: `${(parseFloat(activeStudent.cgpa) / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Classroom Allocation */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Classroom</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Building2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-base font-bold text-slate-900 dark:text-white">
            {activeStudent.classroomNumber}
          </div>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">
            {activeStudent.floor}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
            {activeStudent.location}
          </p>
        </div>

        {/* Practical Lab Allocation */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Allotted Lab</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <MapPin className="w-4 h-4" />
            </span>
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {activeStudent.allottedLab.split(':')[0]}
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
            {activeStudent.labFloor}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
            Flutter & Android Computing
          </p>
        </div>
      </div>

      {/* Urgent Notices Banner / Ticker */}
      {urgentNotices.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                Priority Campus Circular
              </span>
            </div>
            <button
              onClick={() => setActiveTab('notices')}
              className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {urgentNotices.slice(0, 2).map((notice) => (
              <div
                key={notice.id}
                onClick={() => setActiveTab('notices')}
                className="cursor-pointer group flex items-start gap-3 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 transition-all border border-amber-200/60 dark:border-amber-900/50 shadow-xs"
              >
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold mt-0.5 uppercase tracking-wide shrink-0 ${
                    notice.priority === 'Urgent'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}
                >
                  {notice.priority}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    {notice.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {notice.content}
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                  {notice.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Academic Schedule */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Today's Schedule (CSE III-II B)
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Room 304 & Lab 4
          </span>
        </div>

        <div className="space-y-2.5">
          {TODAY_TIMETABLE.map((slot, idx) => (
            <div
              key={idx}
              className={`flex items-start sm:items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                slot.status === 'ongoing'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 ring-1 ring-blue-500/30'
                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {slot.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : slot.status === 'ongoing' ? (
                    <div className="relative">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
                    </div>
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{slot.subject}</span>
                    {slot.status === 'ongoing' && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase bg-blue-600 text-white">
                        Live Now
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {slot.faculty} • <span className="font-medium text-slate-700 dark:text-slate-300">{slot.room}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 ml-2">
                <span className="font-mono font-semibold text-slate-600 dark:text-slate-300">
                  {slot.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Hub */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-1">
          Campus Quick Hub
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setActiveTab('venues')}
            className="flex flex-col items-start p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform mb-2">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
              Rooms & Labs
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Live floor occupancy & specs
            </span>
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className="flex flex-col items-start p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
              Study Materials
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Flutter, ML, CNS syllabi & notes
            </span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className="flex flex-col items-start p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group"
          >
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
              College Events
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Veda 2026 tech fest & hackathons
            </span>
          </button>

          {currentRole === 'faculty' ? (
            <button
              onClick={() => setActiveTab('student-management')}
              className="flex flex-col items-start p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group"
            >
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform mb-2">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                Student Directory
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Edit venues & roll numbers
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsIdCardOpen(true)}
              className="flex flex-col items-start p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group"
            >
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform mb-2">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                Digital ID Card
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Official JNTUK barcode ID
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Mentor & Emergency Contact Section */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Assigned Faculty Mentor
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {activeStudent.mentorFaculty}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Department of Computer Science & Engineering, KHIT
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${activeStudent.emergencyContact}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Contact: {activeStudent.emergencyContact}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
