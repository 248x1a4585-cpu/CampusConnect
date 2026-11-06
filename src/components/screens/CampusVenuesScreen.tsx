import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { CampusVenue } from '../../types';
import {
  Building2,
  Beaker,
  DoorOpen,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  MapPin,
  Laptop,
  Filter,
  Info,
} from 'lucide-react';

export const CampusVenuesScreen: React.FC = () => {
  const { venues, toggleVenueOccupancy, currentRole } = useCampus();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVenues = venues.filter((venue) => {
    const matchesType =
      selectedType === 'all' || venue.type === selectedType;
    const matchesQuery =
      searchQuery.trim() === '' ||
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.floor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.blockLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lab':
        return <Beaker className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'classroom':
        return <DoorOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'seminar_hall':
        return <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'library':
        return <Laptop className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Building2 className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-4 pb-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Campus Infrastructure & Venues</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              {venues.length} locations
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            KHIT Laboratories, Classrooms, Seminar Halls & Central Digital Library
          </p>
        </div>

        {currentRole === 'faculty' && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-900">
            <Info className="w-3.5 h-3.5" />
            <span>Faculty Mode: Tap status pill to toggle occupancy</span>
          </span>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by room number (e.g. Room 304, Lab 4), floor, block, or equipment..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 shadow-xs"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Venues' },
          { id: 'lab', label: 'Laboratories' },
          { id: 'classroom', label: 'Classrooms' },
          { id: 'seminar_hall', label: 'Seminar Halls' },
          { id: 'library', label: 'Central Library' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedType === tab.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {getTypeIcon(venue.type)}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {venue.name}
                    </h3>
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 font-bold font-mono">
                      {venue.roomNumber}
                    </div>
                  </div>
                </div>

                {/* Occupancy Badge (interactive if faculty) */}
                <button
                  disabled={currentRole !== 'faculty'}
                  onClick={() => toggleVenueOccupancy(venue.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-all border ${
                    venue.isOccupiedNow
                      ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900'
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900'
                  } ${currentRole === 'faculty' ? 'cursor-pointer hover:scale-105 active:scale-95' : 'cursor-default'}`}
                  title={
                    currentRole === 'faculty'
                      ? 'Tap to toggle occupancy status'
                      : undefined
                  }
                >
                  {venue.isOccupiedNow ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      <span>Class in Session</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Available / Free</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location details */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {venue.blockLocation} • <span className="text-blue-600 font-bold">{venue.floor}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span>Seating Capacity: <strong className="text-slate-700 dark:text-slate-300">{venue.capacity} Students</strong></span>
                  <span>•</span>
                  <span>{venue.department}</span>
                </div>
              </div>

              {/* Equipment / Incharge */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-700 dark:text-slate-200">Facility Specs:</span>{' '}
                {venue.equipmentOrIncharge}
              </div>
            </div>

            {/* Quick Badge matching user roll */}
            {venue.roomNumber === 'Room 304' && (
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                <span>⭐ Primary Section Classroom for III-II B</span>
                <span>Roll: 248X1A4575</span>
              </div>
            )}
            {venue.roomNumber === 'Lab 4' && (
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                <span>⭐ Allotted Practical Lab: Mobile Computing & Flutter</span>
                <span>IITM Pravartak Batch</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
