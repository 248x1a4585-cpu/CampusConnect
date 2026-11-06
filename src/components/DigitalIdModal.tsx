import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { X, ShieldCheck, Download, Share2, Award, Building, Sparkles } from 'lucide-react';

export const DigitalIdModal: React.FC = () => {
  const { isIdCardOpen, setIsIdCardOpen, activeStudent, showToast } = useCampus();
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isIdCardOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Top controls */}
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Official KHIT Digital Identity Card</span>
          </span>
          <button
            onClick={() => setIsIdCardOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer w-full rounded-2xl bg-gradient-to-br from-blue-800 via-blue-900 to-slate-950 text-white p-5 shadow-xl border border-blue-500/30 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
          >
            {/* Header with College Emblem */}
            <div className="text-center pb-3 border-b border-white/20">
              <div className="inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-widest bg-amber-400 text-slate-950 uppercase mb-1">
                Autonomous • JNTUK Affiliated
              </div>
              <h2 className="text-xs font-black tracking-tight text-white uppercase leading-tight">
                Kallam Haranadhareddy Institute of Technology
              </h2>
              <p className="text-[9px] text-blue-200">
                Chowdavaram, Guntur - 522019, Andhra Pradesh
              </p>
            </div>

            {!isFlipped ? (
              /* Front Side */
              <div className="pt-4 flex flex-col items-center text-center">
                {/* Photo frame */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 shadow-lg mb-3">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-amber-300 font-black text-2xl border-2 border-white/20">
                    <span>AR</span>
                    <span className="text-[8px] font-mono tracking-widest text-white/70">STUDENT</span>
                  </div>
                </div>

                <h3 className="text-base font-black text-white tracking-wide">
                  {activeStudent.name.toUpperCase()}
                </h3>

                <div className="mt-1 px-3 py-1 rounded-lg bg-blue-500/30 border border-blue-400/30 text-amber-300 font-mono font-black text-sm tracking-wider">
                  {activeStudent.rollNo}
                </div>

                <div className="mt-3 space-y-1 text-xs text-blue-100">
                  <div className="font-semibold text-white">
                    {activeStudent.department}
                  </div>
                  <div className="text-[11px] text-blue-200">
                    B.Tech • {activeStudent.year} ({activeStudent.section})
                  </div>
                </div>

                {/* Barcode graphic */}
                <div className="mt-4 w-full bg-white px-3 py-2 rounded-lg flex flex-col items-center">
                  <div className="flex items-center justify-center gap-1 h-8 w-full">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 3, 2, 1, 4, 1, 2, 3, 4, 1, 3, 2, 1].map((w, i) => (
                      <span
                        key={i}
                        className="bg-slate-950 h-full"
                        style={{ width: `${w * 2}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-800 font-bold mt-1 tracking-widest">
                    * {activeStudent.rollNo} *
                  </span>
                </div>

                <div className="mt-2 text-[9px] text-blue-300/80">
                  Tap to view emergency & back credentials 🔄
                </div>
              </div>
            ) : (
              /* Back Side */
              <div className="pt-4 space-y-3 text-xs text-left">
                <div className="text-center font-bold text-amber-300 pb-2 border-b border-white/10 text-xs">
                  CAMPUS VENUE ALLOCATION & DETAILS
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div>
                    <span className="text-blue-300">Classroom:</span>{' '}
                    <strong className="text-white">{activeStudent.classroomNumber} ({activeStudent.floor})</strong>
                  </div>
                  <div>
                    <span className="text-blue-300">Allotted Lab:</span>{' '}
                    <strong className="text-white">{activeStudent.allottedLab} ({activeStudent.labFloor})</strong>
                  </div>
                  <div>
                    <span className="text-blue-300">Block Location:</span>{' '}
                    <strong className="text-white">{activeStudent.location}</strong>
                  </div>
                  <div>
                    <span className="text-blue-300">Parent / Guardian:</span>{' '}
                    <strong className="text-white">{activeStudent.parentName}</strong>
                  </div>
                  <div>
                    <span className="text-blue-300">Emergency Phone:</span>{' '}
                    <strong className="text-white">{activeStudent.emergencyContact}</strong>
                  </div>
                  <div>
                    <span className="text-blue-300">Mentor:</span>{' '}
                    <strong className="text-white">{activeStudent.mentorFaculty}</strong>
                  </div>
                  <div>
                    <span className="text-blue-300">Card Validity:</span>{' '}
                    <strong className="text-emerald-300">2024 - 2028 (Autonomous)</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-blue-200">
                  <span>Sign. of Principal</span>
                  <span>KHIT Autonomy Seal</span>
                </div>

                <div className="text-center text-[9px] text-blue-300/80 pt-1">
                  Tap card to flip back 🔄
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 w-full">
            <button
              onClick={() => {
                showToast('Digital ID downloaded as verified PDF pass');
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ID Card</span>
            </button>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Flip Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
