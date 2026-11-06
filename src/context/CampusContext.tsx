import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentModel,
  CampusVenue,
  NoticeModel,
  EventModel,
  StudyMaterialModel,
  UserRole,
  NoticePriority,
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_NOTICES,
  INITIAL_VENUES,
  INITIAL_EVENTS,
  INITIAL_MATERIALS,
} from '../data/initialData';
import confetti from 'canvas-confetti';

interface CampusContextType {
  // Roles & User
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeStudent: StudentModel;
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Viewport mode: mobile simulation vs full responsive
  isMobileFrame: boolean;
  toggleMobileFrame: () => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Students
  students: StudentModel[];
  updateStudent: (student: StudentModel) => void;

  // Notices
  notices: NoticeModel[];
  selectedNoticeDept: string;
  setSelectedNoticeDept: (dept: string) => void;
  noticeSearchQuery: string;
  setNoticeSearchQuery: (query: string) => void;
  addNotice: (notice: NoticeModel) => void;
  toggleBookmarkNotice: (id: string) => void;
  incrementNoticeViews: (id: string) => void;

  // Venues
  venues: CampusVenue[];
  toggleVenueOccupancy: (id: string) => void;

  // Events
  events: EventModel[];
  toggleEventRegistration: (id: string) => void;

  // Study Materials
  materials: StudyMaterialModel[];
  incrementMaterialDownload: (id: string) => void;

  // Toast / Feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
  closeToast: () => void;

  // Login Modal
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;

  // Code Viewer Modal
  isCodeViewerOpen: boolean;
  setIsCodeViewerOpen: (open: boolean) => void;

  // ID Card Modal
  isIdCardOpen: boolean;
  setIsIdCardOpen: (open: boolean) => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('khit_dark_mode');
    return saved === 'true';
  });

  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(() => {
    return window.innerWidth >= 768;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');

  // Students state (mirrors StudentProvider & SharedPreferences)
  const [students, setStudents] = useState<StudentModel[]>(() => {
    const saved = localStorage.getItem('khit_saved_students');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_STUDENTS;
      }
    }
    return INITIAL_STUDENTS;
  });

  const [activeStudentId, setActiveStudentId] = useState<string>('std-248x1a4575');

  // Current active student profile
  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0];

  // Notices state (mirrors NoticeProvider)
  const [notices, setNotices] = useState<NoticeModel[]>(() => {
    const saved = localStorage.getItem('saved_notices');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTICES;
      }
    }
    return INITIAL_NOTICES;
  });

  const [selectedNoticeDept, setSelectedNoticeDept] = useState<string>('All');
  const [noticeSearchQuery, setNoticeSearchQuery] = useState<string>('');

  // Venues state
  const [venues, setVenues] = useState<CampusVenue[]>(() => {
    const saved = localStorage.getItem('khit_saved_venues');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_VENUES;
      }
    }
    return INITIAL_VENUES;
  });

  // Events state
  const [events, setEvents] = useState<EventModel[]>(() => {
    const saved = localStorage.getItem('khit_saved_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_EVENTS;
      }
    }
    return INITIAL_EVENTS;
  });

  // Materials state
  const [materials, setMaterials] = useState<StudyMaterialModel[]>(() => {
    const saved = localStorage.getItem('khit_saved_materials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_MATERIALS;
      }
    }
    return INITIAL_MATERIALS;
  });

  // Modals & toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCodeViewerOpen, setIsCodeViewerOpen] = useState(false);
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);

  // Sync dark mode class
  useEffect(() => {
    localStorage.setItem('khit_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync students to localStorage
  useEffect(() => {
    localStorage.setItem('khit_saved_students', JSON.stringify(students));
  }, [students]);

  // Sync notices to localStorage (key 'saved_notices' matching Flutter notice_provider.dart)
  useEffect(() => {
    localStorage.setItem('saved_notices', JSON.stringify(notices));
  }, [notices]);

  // Sync venues
  useEffect(() => {
    localStorage.setItem('khit_saved_venues', JSON.stringify(venues));
  }, [venues]);

  // Sync events
  useEffect(() => {
    localStorage.setItem('khit_saved_events', JSON.stringify(events));
  }, [events]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleMobileFrame = () => setIsMobileFrame((prev) => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const closeToast = () => setToastMessage(null);

  // Notice operations
  const addNotice = (newNotice: NoticeModel) => {
    setNotices((prev) => [newNotice, ...prev]);
    showToast(`Notice published to ${newNotice.department}!`);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  const toggleBookmarkNotice = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isBookmarked: !n.isBookmarked } : n))
    );
  };

  const incrementNoticeViews = (id: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, views: n.views + 1 } : n))
    );
  };

  // Student update operation
  const updateStudent = (updatedStudent: StudentModel) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
    showToast('Student details & venue allocation updated successfully!');
  };

  // Venue occupancy toggle
  const toggleVenueOccupancy = (id: string) => {
    setVenues((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isOccupiedNow: !v.isOccupiedNow } : v))
    );
    showToast('Venue status updated');
  };

  // Event registration toggle
  const toggleEventRegistration = (id: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === id) {
          const registered = !ev.isRegistered;
          if (registered) {
            try {
              confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
            } catch {}
            showToast(`Registered for ${ev.title}! Pass sent.`);
          } else {
            showToast(`Cancelled registration for ${ev.title}.`);
          }
          return {
            ...ev,
            isRegistered: registered,
            spotsLeft: registered ? ev.spotsLeft - 1 : ev.spotsLeft + 1,
          };
        }
        return ev;
      })
    );
  };

  // Material download count
  const incrementMaterialDownload = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, downloads: m.downloads + 1 } : m))
    );
    showToast('Downloading verified autonomous document...');
  };

  return (
    <CampusContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeStudent,
        isDarkMode,
        toggleDarkMode,
        isMobileFrame,
        toggleMobileFrame,
        activeTab,
        setActiveTab,
        students,
        updateStudent,
        notices,
        selectedNoticeDept,
        setSelectedNoticeDept,
        noticeSearchQuery,
        setNoticeSearchQuery,
        addNotice,
        toggleBookmarkNotice,
        incrementNoticeViews,
        venues,
        toggleVenueOccupancy,
        events,
        toggleEventRegistration,
        materials,
        incrementMaterialDownload,
        toastMessage,
        showToast,
        closeToast,
        isLoginModalOpen,
        setIsLoginModalOpen,
        activeStudentId,
        setActiveStudentId,
        isCodeViewerOpen,
        setIsCodeViewerOpen,
        isIdCardOpen,
        setIsIdCardOpen,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
