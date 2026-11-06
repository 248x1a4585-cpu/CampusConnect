import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { NoticePriority } from '../../types';
import { Send, ArrowLeft, Paperclip, AlertCircle, CheckCircle } from 'lucide-react';

const DEPARTMENTS = [
  'Computer Science (CSE)',
  'Electronics & Comm (ECE)',
  'Exam Cell',
  'Placement Cell',
  'Administration',
];

const PRIORITIES: NoticePriority[] = ['General', 'Urgent', 'Academic', 'Placement'];

export const AddNoticeScreen: React.FC = () => {
  const { addNotice, setActiveTab } = useCampus();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Computer Science (CSE)');
  const [priority, setPriority] = useState<NoticePriority>('Academic');
  const [author, setAuthor] = useState('Prof. Dr. P. Siva Prasad');
  const [role, setRole] = useState('HOD - Computer Science');
  const [content, setContent] = useState('');
  const [attachFile, setAttachFile] = useState(true);

  // Form error state matching Flutter Form validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) {
      errs.title = 'Notice title is mandatory';
    } else if (title.trim().length < 8) {
      errs.title = 'Title must be at least 8 characters long';
    }

    if (!author.trim() || author.trim().length < 3) {
      errs.author = 'Author name required (min 3 characters)';
    }

    if (!role.trim()) {
      errs.role = 'Role / Designation is required';
    }

    if (!content.trim() || content.trim().length < 25) {
      errs.content = 'Notice announcement body must be at least 25 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      addNotice({
        id: `not-${Date.now()}`,
        title: title.trim(),
        department,
        priority,
        date: 'Just now',
        author: author.trim(),
        authorRole: role.trim(),
        content: content.trim(),
        attachmentName: attachFile ? 'Official_Guidelines.pdf' : null,
        attachmentSize: attachFile ? '1.2 MB' : null,
        views: 1,
        isBookmarked: false,
      });
      setActiveTab('notices');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 pb-12 animate-fadeIn">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('notices')}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Post Official Notice
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Publish circulars to KHIT campus notice board & student mobiles
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Notice Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Schedule for Mid-Term Lab Examinations"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all ${
                errors.title ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Department & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Priority Classification
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as NoticePriority)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Author & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Author / Faculty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Prof. Dr. P. Siva Prasad"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 ${
                  errors.author ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.author && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.author}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Designation / Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="HOD - Computer Science"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 ${
                  errors.role ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.role && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.role}</span>
                </p>
              )}
            </div>
          </div>

          {/* Announcement content */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Notice Announcement Body <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide detailed instructions, venue, timing, and deadlines for students and faculty..."
              className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 ${
                errors.content ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-700'
              }`}
            />
            <div className="flex justify-between items-center mt-1">
              {errors.content ? (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.content}</span>
                </p>
              ) : (
                <span className="text-[11px] text-slate-400">Minimum 25 characters required</span>
              )}
              <span className="text-[11px] font-mono text-slate-400">
                {content.length} characters
              </span>
            </div>
          </div>

          {/* Attach file checkbox */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <input
              type="checkbox"
              id="attachFile"
              checked={attachFile}
              onChange={(e) => setAttachFile(e.target.checked)}
              className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
            />
            <label htmlFor="attachFile" className="cursor-pointer text-xs">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                Attach Verified PDF Document (Official_Guidelines.pdf - 1.2 MB)
              </span>
              <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                Includes verified downloadable link on the notice details screen.
              </p>
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('notices')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Publish Notice to Campus</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
