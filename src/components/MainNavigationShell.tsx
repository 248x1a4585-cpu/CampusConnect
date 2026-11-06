import React from 'react';
import { useCampus } from '../context/CampusContext';
import { DashboardScreen } from './screens/DashboardScreen';
import { NoticeListScreen } from './screens/NoticeListScreen';
import { AddNoticeScreen } from './screens/AddNoticeScreen';
import { StudentManagementScreen } from './screens/StudentManagementScreen';
import { CampusVenuesScreen } from './screens/CampusVenuesScreen';
import { EventsScreen } from './screens/EventsScreen';
import { MaterialsScreen } from './screens/MaterialsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DigitalIdModal } from './DigitalIdModal';
import { FlutterCodeViewerModal } from './FlutterCodeViewerModal';
import { LoginModal } from './LoginModal';
import {
  LayoutDashboard,
  Bell,
  Users,
  Building,
  User,
  Calendar,
  BookOpen,
  Smartphone,
  Monitor,
  Code,
  Moon,
  Sun,
  CreditCard,
  Sparkles,
  Wifi,
  Battery,
  Signal,
  CheckCircle2,
  X,
  ExternalLink,
  LogIn,
} from 'lucide-react';

export const MainNavigationShell: React.FC = () => {
  const {
    currentRole,
    activeTab,
    setActiveTab,
    isDarkMode,
    toggleDarkMode,
    isMobileFrame,
    toggleMobileFrame,
    setIsLoginModalOpen,
    setIsCodeViewerOpen,
    setIsIdCardOpen,
    toastMessage,
    closeToast,
    activeStudent,
  } = useCampus();

  const isFaculty = currentRole === 'faculty';

  // Destinations matching Flutter lib/main.dart
  const destinations = isFaculty
    ? [
        { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'student-management', label: 'Students', icon: Users },
        { id: 'venues', label: 'Rooms & Labs', icon: Building },
        { id: 'profile', label: 'Faculty', icon: User },
      ]
    : [
        { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'venues', label: 'Rooms & Labs', icon: Building },
        { id: 'profile', label: 'Profile', icon: User },
      ];

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'notices':
        return <NoticeListScreen />;
      case 'add-notice':
        return <AddNoticeScreen />;
      case 'student-management':
        return <StudentManagementScreen />;
      case 'venues':
        return <CampusVenuesScreen />;
      case 'events':
        return <EventsScreen />;
      case 'materials':
        return <MaterialsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center">
      {/* Top Universal Control Bar (Desktop header with device switch and quick controls) */}
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-3 sm:px-6 py-2.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Institution */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              K
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white">
                  CampusConnect
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-400 text-slate-950 uppercase">
                  KHIT
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Kallam Haranadhareddy Institute of Technology • JNTUK Autonomous
              </p>
            </div>
          </div>

          {/* Quick Bar actions */}
          <div className="flex items-center gap-2">
            {/* Viewport switch: Mobile phone preview vs Full-width desktop */}
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => isMobileFrame || toggleMobileFrame()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isMobileFrame
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Simulate Mobile App (Flutter View)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Mobile App</span>
              </button>
              <button
                onClick={() => !isMobileFrame || toggleMobileFrame()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  !isMobileFrame
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Wide Responsive View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Full Screen</span>
              </button>
            </div>

            {/* Login button with student, faculty, parent logins */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition-all shadow-xs"
              title="CampusConnect Login (Student, Faculty, Parent)"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono capitalize">
                {currentRole}
              </span>
            </button>

            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              title="Toggle Dark/Light Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Area */}
      <main className="w-full flex-1 flex justify-center p-0 sm:p-4 md:p-6">
        <div
          className={`w-full transition-all duration-300 flex flex-col ${
            isMobileFrame
              ? 'max-w-[425px] min-h-[840px] bg-white dark:bg-slate-900 sm:rounded-[40px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 sm:ring-1 sm:ring-slate-900/10 overflow-hidden relative'
              : 'max-w-5xl bg-white dark:bg-slate-900 sm:rounded-2xl sm:shadow-sm sm:border sm:border-slate-200 dark:sm:border-slate-800 overflow-hidden'
          }`}
        >
          {/* Mobile Status Bar Simulation (Only in mobile frame view) */}
          {isMobileFrame && (
            <div className="bg-slate-900 text-white px-5 py-2 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
              <span className="font-bold">12:25</span>
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto hidden sm:block" />
              <div className="flex items-center gap-1.5 text-slate-300">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* In-App App Bar (Matches Flutter AppBar) */}
          <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                {activeTab === 'dashboard'
                  ? 'CampusConnect'
                  : activeTab === 'notices'
                  ? 'College Notices'
                  : activeTab === 'add-notice'
                  ? 'Post Notice'
                  : activeTab === 'student-management'
                  ? 'Student Directory'
                  : activeTab === 'venues'
                  ? 'Rooms & Labs'
                  : activeTab === 'events'
                  ? 'Campus Events'
                  : activeTab === 'materials'
                  ? 'Study Materials'
                  : 'Student Profile'}
              </div>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                {currentRole.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {activeTab !== 'materials' && (
                <button
                  onClick={() => setActiveTab('materials')}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  title="Study Materials"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsIdCardOpen(true)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Student Digital ID"
              >
                <CreditCard className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>

          {/* Screen Content Body with scrolling */}
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin">
            {renderActiveScreen()}
          </div>

          {/* Material 3 Bottom Navigation Bar (reproducing NavigationBar from main.dart) */}
          <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around shrink-0 z-20">
            {destinations.map((dest) => {
              const Icon = dest.icon;
              const isSelected = activeTab === dest.id;
              return (
                <button
                  key={dest.id}
                  onClick={() => setActiveTab(dest.id)}
                  className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all group relative min-w-[56px]"
                >
                  {/* Active Indicator Pill */}
                  <div
                    className={`px-4 py-1 rounded-full transition-all duration-200 flex items-center justify-center ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs scale-105'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] mt-0.5 tracking-tight transition-colors ${
                      isSelected
                        ? 'font-bold text-blue-600 dark:text-blue-400'
                        : 'font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {dest.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </main>

      {/* Global Modals */}
      <DigitalIdModal />
      <LoginModal />
      <FlutterCodeViewerModal />

      {/* SnackBar Toast Notification matching Flutter ScaffoldMessenger */}
      {toastMessage && (
        <div className="fixed bottom-20 z-50 animate-bounce">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
            <button
              onClick={closeToast}
              className="ml-2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
