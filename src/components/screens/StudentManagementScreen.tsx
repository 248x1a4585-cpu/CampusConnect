import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { StudentModel } from '../../types';
import {
  Search,
  Edit2,
  Building,
  MapPin,
  Beaker,
  User,
  X,
  Save,
  CheckCircle,
  GraduationCap,
  Shield,
  Layers,
} from 'lucide-react';

export const StudentManagementScreen: React.FC = () => {
  const { students, updateStudent } = useCampus();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState<StudentModel | null>(null);

  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [department, setDepartment] = useState('');
  const [classroomNumber, setClassroomNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [location, setLocation] = useState('');
  const [allottedLab, setAllottedLab] = useState('');
  const [labFloor, setLabFloor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const openEditDialog = (student: StudentModel) => {
    setEditingStudent(student);
    setName(student.name);
    setRollNo(student.rollNo);
    setDepartment(student.department);
    setClassroomNumber(student.classroomNumber);
    setFloor(student.floor);
    setLocation(student.location);
    setAllottedLab(student.allottedLab);
    setLabFloor(student.labFloor);
    setErrorMsg('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rollNo.trim()) {
      setErrorMsg('Student Name and Roll Number are required.');
      return;
    }

    if (editingStudent) {
      updateStudent({
        ...editingStudent,
        name: name.trim(),
        rollNo: rollNo.trim(),
        department: department.trim(),
        classroomNumber: classroomNumber.trim(),
        floor: floor.trim(),
        location: location.trim(),
        allottedLab: allottedLab.trim(),
        labFloor: labFloor.trim(),
      });
      setEditingStudent(null);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.classroomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.allottedLab.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Faculty & Admin Portal
            </span>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
            Student Directory & Venue Allocation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            View student enrollments, modify assigned classrooms, labs, floors, and buildings
          </p>
        </div>

        <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Total: <span className="font-bold text-blue-600">{students.length} students</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student by name, roll number (e.g. 248X1A4575), room, or lab..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Student List Cards */}
      <div className="space-y-3">
        {filteredStudents.map((std) => (
          <div
            key={std.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {std.name}
                  </h3>
                  {std.rollNo === '248X1A4575' && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-400 text-slate-950">
                      Team Lead
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                  Roll No: {std.rollNo}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {std.department} • {std.year} ({std.section}) • CGPA: {std.cgpa} • Attendance: {std.attendancePercent}%
                </div>
              </div>

              <button
                onClick={() => openEditDialog(std)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-bold transition-colors"
                title="Edit Student & Venue Allocation"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <hr className="my-3 border-slate-100 dark:border-slate-800" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900 dark:text-white">Classroom:</strong>{' '}
                  {std.classroomNumber} ({std.floor})
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Beaker className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="truncate">
                  <strong className="font-semibold text-slate-900 dark:text-white">Lab:</strong>{' '}
                  {std.allottedLab} ({std.labFloor})
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 sm:col-span-2 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-700 dark:text-slate-300">Building Block:</strong>{' '}
                  {std.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Student & Venue Allocation Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Edit Student & Venue Allocation
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Update classroom number, practical lab, floors, and location
                </p>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Department / Branch *
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="Electronics & Comm (ECE)">Electronics & Comm (ECE)</option>
                  <option value="Information Technology (IT)">Information Technology (IT)</option>
                  <option value="Artificial Intelligence & Data Science (AI & DS)">Artificial Intelligence & Data Science (AI & DS)</option>
                  <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering (ME)">Mechanical Engineering (ME)</option>
                  <option value="Civil Engineering (CE)">Civil Engineering (CE)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class Room Number *
                  </label>
                  <input
                    type="text"
                    value={classroomNumber}
                    onChange={(e) => setClassroomNumber(e.target.value)}
                    placeholder="Room 304"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Class Floor Level *
                  </label>
                  <input
                    type="text"
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    placeholder="3rd Floor"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Building Block Location *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Sir M. Visvesvaraya Block"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Allotted Practical Lab *
                  </label>
                  <input
                    type="text"
                    value={allottedLab}
                    onChange={(e) => setAllottedLab(e.target.value)}
                    placeholder="Lab 4: Mobile Computing Lab"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Lab Floor & Wing *
                  </label>
                  <input
                    type="text"
                    value={labFloor}
                    onChange={(e) => setLabFloor(e.target.value)}
                    placeholder="Ground Floor"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold shadow-md shadow-blue-500/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Records</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
