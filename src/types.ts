export type UserRole = 'student' | 'faculty' | 'parent';

export interface StudentModel {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  semester: string;
  section: string;
  cgpa: string;
  attendancePercent: number;
  classroomNumber: string;
  floor: string;
  location: string;
  allottedLab: string;
  labFloor: string;
  mentorFaculty: string;
  parentName: string;
  emergencyContact: string;
  feeClearance: boolean;
  avatarUrl?: string;
}

export interface CampusVenue {
  id: string;
  name: string;
  type: 'lab' | 'classroom' | 'seminar_hall' | 'library';
  roomNumber: string;
  floor: string;
  blockLocation: string;
  department: string;
  capacity: number;
  equipmentOrIncharge: string;
  isOccupiedNow: boolean;
}

export type NoticePriority = 'Urgent' | 'Academic' | 'Placement' | 'General';

export interface NoticeModel {
  id: string;
  title: string;
  department: string;
  priority: NoticePriority;
  date: string;
  author: string;
  authorRole: string;
  content: string;
  attachmentName?: string | null;
  attachmentSize?: string | null;
  views: number;
  isBookmarked: boolean;
}

export interface EventModel {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  category: 'Tech Fest' | 'Workshop' | 'Sports' | 'Cultural' | 'Webinar';
  description: string;
  isRegistered: boolean;
  bannerGradient: string;
  spotsLeft: number;
}

export interface StudyMaterialModel {
  id: string;
  subjectCode: string;
  subjectName: string;
  department: string;
  semester: string;
  unit: string;
  title: string;
  fileType: 'pdf' | 'doc' | 'zip' | 'code';
  fileSize: string;
  downloads: number;
  uploadedBy: string;
  uploadDate: string;
}

export interface AttendanceSubject {
  code: string;
  name: string;
  attended: number;
  total: number;
  faculty: string;
}
