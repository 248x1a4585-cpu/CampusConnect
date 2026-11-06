import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { FLUTTER_SOURCE_FILES, FlutterSourceFile } from '../data/flutterSourceCode';
import {
  X,
  Copy,
  Check,
  FileCode,
  Terminal,
  Download,
  FolderTree,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const FlutterCodeViewerModal: React.FC = () => {
  const { isCodeViewerOpen, setIsCodeViewerOpen, showToast } = useCampus();
  const [selectedFile, setSelectedFile] = useState<FlutterSourceFile>(FLUTTER_SOURCE_FILES[1]); // main.dart
  const [copied, setCopied] = useState(false);

  if (!isCodeViewerOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    showToast(`Copied ${selectedFile.filename} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.filename.split('/').pop() || 'flutter_file.dart';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${selectedFile.filename}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  CampusConnect Flutter & Dart Source Code
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                  Dart 3.3.0 • Flutter 3.35
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Kallam Haranadhareddy Institute of Technology • IITM Pravartak Technologies Project
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCodeViewerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Body: Sidebar + Editor */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* File Explorer Sidebar */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/60 p-2 sm:p-3 overflow-y-auto">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2 flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5" />
              <span>Project Structure</span>
            </div>

            <div className="space-y-1">
              {FLUTTER_SOURCE_FILES.map((file: FlutterSourceFile) => {
                const isSelected = selectedFile.filename === file.filename;
                return (
                  <button
                    key={file.filename}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{file.filename}</span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded font-sans uppercase ${
                        isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {file.category}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <div className="font-bold text-slate-200 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Build Command</span>
              </div>
              <code className="block bg-slate-950 p-1.5 rounded text-[10px] text-emerald-400 font-mono overflow-x-auto">
                flutter build apk --release
              </code>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            {/* Tab Bar */}
            <div className="p-2 sm:p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileCode className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs font-mono font-bold text-white truncate">
                  {selectedFile.filename}
                </span>
                <span className="text-xs text-slate-400 truncate hidden sm:inline">
                  — {selectedFile.description}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  onClick={handleDownloadSingle}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Pre/Code block */}
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-200 leading-relaxed bg-[#0B0F19] select-text">
              <pre>
                <code>{selectedFile.code}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            Team Lead: <span className="font-bold text-slate-200">Kopparthi Anji Reddy (248X1A4575)</span> • CSE KHIT Guntur
          </div>
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-mono">100% Null Safety</span>
            <button
              onClick={() => setIsCodeViewerOpen(false)}
              className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
            >
              Back to Live App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
