import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { BookOpen, Download, FileText, Search, UserCheck, Calendar, Filter } from 'lucide-react';

export const MaterialsScreen: React.FC = () => {
  const { materials, incrementMaterialDownload } = useCampus();
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-4 pb-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Academic Study Materials & Lab Manuals</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Autonomous R20 / R23
          </span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Curated notes, question banks, and lab exercises by KHIT CSE Faculty
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search materials (e.g. Flutter Lab, Machine Learning, Cryptography)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 shadow-xs"
        />
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {mat.subjectCode}
                  </span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {mat.subjectName}
                  </span>
                  <span className="text-[11px] text-slate-400">• {mat.unit}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {mat.title}
                </h3>

                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Uploaded by: <strong className="text-slate-700 dark:text-slate-300">{mat.uploadedBy}</strong></span>
                  <span>•</span>
                  <span>{mat.uploadDate}</span>
                  <span>•</span>
                  <span>{mat.fileSize}</span>
                  <span>•</span>
                  <span>{mat.downloads} downloads</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => incrementMaterialDownload(mat.id)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-sm shrink-0 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
