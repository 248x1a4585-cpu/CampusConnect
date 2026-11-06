import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { Calendar, Clock, MapPin, Users, Sparkles, CheckCircle2, Ticket } from 'lucide-react';

export const EventsScreen: React.FC = () => {
  const { events, toggleEventRegistration } = useCampus();

  return (
    <div className="space-y-4 pb-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>College Events & Hackathons</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            {events.length} active
          </span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          VEDA 2026 National Fest, Flutter Bootcamps, Tech Symposia & Sports Meets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Banner top */}
            <div className={`p-4 bg-gradient-to-r ${ev.bannerGradient} text-white`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-md">
                  {ev.category}
                </span>
                <span className="text-xs font-semibold text-white/90">
                  {ev.spotsLeft} seats available
                </span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">
                {ev.title}
              </h3>
              <p className="text-xs text-white/80 mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{ev.organizer}</span>
              </p>
            </div>

            {/* Event details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ev.description}
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-white">{ev.date}</span>
                  <span className="text-slate-400">•</span>
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{ev.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="truncate">{ev.venue}</span>
                </div>
              </div>

              {/* Registration action */}
              <div className="pt-2">
                <button
                  onClick={() => toggleEventRegistration(ev.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    ev.isRegistered
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 active:scale-95'
                  }`}
                >
                  {ev.isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>Registration Confirmed (Pass Active)</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Register for Event (Free Pass)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
