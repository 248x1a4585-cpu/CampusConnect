import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { NoticeModel, NoticePriority } from '../../types';
import {
  Search,
  Bookmark,
  Eye,
  FileText,
  Download,
  Plus,
  Filter,
  CheckCircle,
  Share2,
  Calendar,
  User,
  X,
  AlertTriangle,
} from 'lucide-react';

const DEPARTMENTS = [
  'All',
  'Computer Science (CSE)',
  'Electronics & Comm (ECE)',
  'Exam Cell',
  'Placement Cell',
  'Administration',
];

export const NoticeListScreen: React.FC = () => {
  const {
    notices,
    selectedNoticeDept,
    setSelectedNoticeDept,
    noticeSearchQuery,
    setNoticeSearchQuery,
    toggleBookmarkNotice,
    incrementNoticeViews,
    setActiveTab,
    currentRole,
    showToast,
  } = useCampus();

  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeModel | null>(null);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // Filter notices matching notice_provider.dart
  const filteredNotices = notices.filter((n) => {
    const matchesDept =
      selectedNoticeDept === 'All' || n.department === selectedNoticeDept;
    const matchesQuery =
      noticeSearchQuery.trim() === '' ||
      n.title.toLowerCase().includes(noticeSearchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(noticeSearchQuery.toLowerCase()) ||
      n.author.toLowerCase().includes(noticeSearchQuery.toLowerCase());
    const matchesBookmark = onlyBookmarks ? n.isBookmarked : true;
    return matchesDept && matchesQuery && matchesBookmark;
  });

  const handleOpenNotice = (notice: NoticeModel) => {
    incrementNoticeViews(notice.id);
    setActiveNoticeModal(notice);
  };

  const getPriorityBadgeClass = (priority: NoticePriority) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-900';
      case 'Placement':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-900';
      case 'Academic':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-900';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-4 pb-8 animate-fadeIn">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Official College Notice Board</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              {filteredNotices.length} notices
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time circulars from Exam Cell, Placements, Administration & HODs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              onlyBookmarks
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-current' : ''}`} />
            <span>Saved</span>
          </button>

          <button
            onClick={() => setActiveTab('add-notice')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Post Notice</span>
          </button>
        </div>
      </div>

      {/* Search Input matching Flutter */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={noticeSearchQuery}
          onChange={(e) => setNoticeSearchQuery(e.target.value)}
          placeholder="Search by keywords, subject, circular title, or author..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 shadow-xs"
        />
        {noticeSearchQuery && (
          <button
            onClick={() => setNoticeSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Department Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {DEPARTMENTS.map((dept) => {
          const isSelected = selectedNoticeDept === dept;
          return (
            <button
              key={dept}
              onClick={() => setSelectedNoticeDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {dept}
            </button>
          );
        })}
      </div>

      {/* Notice Cards List */}
      <div className="space-y-3">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-6">
            <Filter className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">No notices found</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              No circulars match your current department filter or search criteria.
            </p>
            {(selectedNoticeDept !== 'All' || noticeSearchQuery || onlyBookmarks) && (
              <button
                onClick={() => {
                  setSelectedNoticeDept('All');
                  setNoticeSearchQuery('');
                  setOnlyBookmarks(false);
                }}
                className="mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer"
              onClick={() => handleOpenNotice(notice)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getPriorityBadgeClass(
                      notice.priority
                    )}`}
                  >
                    {notice.priority}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {notice.department}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {notice.date}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmarkNotice(notice.id);
                  }}
                  className={`p-1.5 rounded-lg transition-colors ${
                    notice.isBookmarked
                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title={notice.isBookmarked ? 'Remove bookmark' : 'Bookmark notice'}
                >
                  <Bookmark
                    className={`w-4 h-4 ${notice.isBookmarked ? 'fill-current' : ''}`}
                  />
                </button>
              </div>

              {/* Title & snippet */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-2">
                {notice.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                {notice.content}
              </p>

              {/* Footer info & attachments */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center text-[10px] font-bold">
                    {notice.author.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[150px] sm:max-w-none">
                    {notice.author}
                  </span>
                  <span className="text-slate-400 text-[10px] hidden sm:inline">
                    ({notice.authorRole})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {notice.attachmentName && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md">
                      <FileText className="w-3 h-3" />
                      <span>{notice.attachmentName}</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                    <Eye className="w-3 h-3" />
                    <span>{notice.views}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getPriorityBadgeClass(
                      activeNoticeModal.priority
                    )}`}
                  >
                    {activeNoticeModal.priority}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {activeNoticeModal.department}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {activeNoticeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {activeNoticeModal.author}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    {activeNoticeModal.authorRole}
                  </div>
                </div>
                <div className="text-right text-slate-500 dark:text-slate-400">
                  <div>{activeNoticeModal.date}</div>
                  <div className="text-[11px] font-mono">{activeNoticeModal.views} views</div>
                </div>
              </div>

              <div className="whitespace-pre-line text-slate-800 dark:text-slate-200 text-sm">
                {activeNoticeModal.content}
              </div>

              {activeNoticeModal.attachmentName && (
                <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-blue-600 text-white">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {activeNoticeModal.attachmentName}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Official Verified Attachment • {activeNoticeModal.attachmentSize || '1.2 MB'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      showToast(`Downloading ${activeNoticeModal.attachmentName}...`)
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleBookmarkNotice(activeNoticeModal.id);
                  setActiveNoticeModal({
                    ...activeNoticeModal,
                    isBookmarked: !activeNoticeModal.isBookmarked,
                  });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-500"
              >
                <Bookmark
                  className={`w-4 h-4 ${activeNoticeModal.isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`}
                />
                <span>{activeNoticeModal.isBookmarked ? 'Saved in bookmarks' : 'Bookmark'}</span>
              </button>

              <button
                onClick={() => setActiveNoticeModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
