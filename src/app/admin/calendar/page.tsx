import React from 'react';

export default function AdminCalendarPage() {
  return (
    <div className="p-gutter custom-scrollbar h-full overflow-auto">
      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-gutter mb-stack-lg">
        <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-outline-variant">
          <div className="flex justify-between items-start mb-2">
            <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">Instructional Days</p>
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-h2 font-h2 text-primary">142</h2>
            <p className="text-label-sm text-secondary">+12 from last term</p>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">Remaining in academic year</p>
        </div>

        <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-outline-variant">
          <div className="flex justify-between items-start mb-2">
            <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">Upcoming Exams</p>
            <span className="material-symbols-outlined text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>edit_document</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-h2 font-h2 text-primary">08</h2>
            <p className="text-label-sm text-error">Next starts in 4 days</p>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">Scheduled for this month</p>
        </div>

        <div className="bg-surface-container-lowest p-gutter rounded-lg shadow-sm border border-outline-variant">
          <div className="flex justify-between items-start mb-2">
            <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">Public Holidays</p>
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-h2 font-h2 text-primary">03</h2>
            <p className="text-label-sm text-on-surface-variant">Scheduled for Oct</p>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">Institutional closures</p>
        </div>

        <div className="bg-primary p-gutter rounded-lg shadow-sm border border-primary flex flex-col justify-center">
          <button className="flex items-center justify-center gap-2 bg-secondary hover:bg-on-secondary-container text-on-secondary py-3 px-4 rounded transition-colors group">
            <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add_circle</span>
            <span className="font-label-md text-label-md uppercase tracking-widest">Add New Event</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Calendar + Side Panel */}
      <div className="flex flex-col xl:flex-row gap-gutter h-[calc(100vh-16rem)] min-h-[600px]">
        {/* Interactive Calendar */}
        <div className="flex-1 bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm flex flex-col">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low">
            <div className="flex items-center gap-4">
              <h2 className="text-h3 font-h3 text-primary">October 2024</h2>
              <div className="flex border border-outline-variant rounded overflow-hidden">
                <button className="p-1 hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-body-lg">chevron_left</span>
                </button>
                <button className="px-3 text-label-sm font-label-sm border-x border-outline-variant hover:bg-surface-container-high transition-colors uppercase">Today</button>
                <button className="p-1 hover:bg-surface-container-high transition-colors">
                  <span className="material-symbols-outlined text-body-lg">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-surface-container-high p-1 rounded-lg">
                <button className="px-4 py-1 text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors">Day</button>
                <button className="px-4 py-1 text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors">Week</button>
                <button className="px-4 py-1 text-label-sm font-label-sm bg-surface-container-lowest shadow-sm rounded text-primary">Month</button>
              </div>
              <div className="h-6 w-[1px] bg-outline-variant mx-1"></div>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                <span className="text-label-sm font-label-sm">Filters</span>
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            <div className="grid grid-cols-7 bg-surface-container-low border-b border-outline-variant">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="py-2 text-center text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7">
              {/* Empty placeholders */}
              <div className="min-h-[120px] border-r border-b border-outline-variant bg-surface-container-lowest/50 opacity-40 p-2"><span className="text-label-sm">29</span></div>
              <div className="min-h-[120px] border-r border-b border-outline-variant bg-surface-container-lowest/50 opacity-40 p-2"><span className="text-label-sm">30</span></div>
              
              {/* Days 1-31 */}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                let bgClass = "min-h-[120px] border-r border-b border-outline-variant p-2 group hover:bg-surface-container-lowest transition-colors cursor-pointer relative";
                if (day === 8) bgClass += " bg-surface-container-high/20";
                if (day === 12) bgClass += " bg-surface-container-high/10 border-2 border-primary/20";

                return (
                  <div key={day} className={bgClass}>
                    <span className={day === 12 ? "text-label-sm font-bold bg-primary text-white px-1.5 py-0.5 rounded-full" : (day === 1 ? "text-label-sm font-bold text-primary" : "text-label-sm")}>
                      {day}
                    </span>
                    <div className="mt-2 space-y-1">
                      {day === 1 && (
                        <div className="bg-on-tertiary-container/10 border-l-2 border-on-tertiary-container p-1 rounded-r">
                          <p className="text-[10px] font-bold text-on-tertiary-fixed-variant truncate">Staff Meeting</p>
                        </div>
                      )}
                      {day === 3 && (
                        <div className="bg-secondary-container/10 border-l-2 border-secondary-container p-1 rounded-r">
                          <p className="text-[10px] font-bold text-on-secondary-container truncate">Sports Day Preps</p>
                        </div>
                      )}
                      {day === 8 && (
                        <div className="bg-error-container/20 border-l-2 border-error p-1 rounded-r">
                          <p className="text-[10px] font-bold text-on-error-container truncate">Final Exams Begin</p>
                        </div>
                      )}
                      {day === 12 && (
                        <div className="bg-secondary-container/20 border-l-2 border-secondary p-1 rounded-r">
                          <p className="text-[10px] font-bold text-on-secondary-container truncate">Public Holiday</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side Panel */}
        <aside className="w-full xl:w-80 flex flex-col gap-gutter">
          {/* Legend */}
          <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant shadow-sm">
            <h3 className="text-label-md font-label-md uppercase tracking-wider text-on-surface-variant mb-4">Event Categories</h3>
            <div className="space-y-3">
              {[
                { color: 'bg-error', text: 'text-error', label: 'Exams & Tests' },
                { color: 'bg-secondary', text: 'text-secondary', label: 'Holidays' },
                { color: 'bg-on-tertiary-container', text: 'text-on-tertiary-container', label: 'Staff Meetings' },
                { color: 'bg-primary', text: 'text-primary', label: 'School Events' },
              ].map(cat => (
                <label key={cat.label} className="flex items-center gap-3 cursor-pointer group">
                  <input defaultChecked className={`w-4 h-4 rounded ${cat.text} border-outline focus:ring-${cat.color}/20`} type="checkbox" />
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                  <span className="text-body-sm font-body-sm text-on-surface group-hover:text-primary transition-colors">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="flex-1 bg-surface-container-lowest rounded-lg border border-outline-variant shadow-sm flex flex-col overflow-hidden min-h-[300px]">
            <div className="p-5 border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-label-md font-label-md uppercase tracking-wider text-on-surface-variant">Upcoming</h3>
              <button className="text-primary text-[11px] font-bold uppercase hover:underline">View All</button>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar p-5 space-y-6">
              {[
                { date: 'OCT 08 • 09:00 AM', title: 'Final Exams - Grade 12', desc: 'Main Hall. Mandatory attendance. Students must arrive 30 mins prior.', color: 'bg-error', text: 'text-error' },
                { date: 'OCT 12 • ALL DAY', title: 'Founders Day Holiday', desc: 'School campus will remain closed for all students and staff.', color: 'bg-secondary', text: 'text-secondary' },
                { date: 'OCT 15 • 03:30 PM', title: 'PTA General Meeting', desc: 'Discussion on new library facilities and winter term schedule.', color: 'bg-on-tertiary-container', text: 'text-on-tertiary-container' },
                { date: 'OCT 20 • 10:00 AM', title: 'Annual Science Fair', desc: 'Inter-school competition hosted in the Gymnasium hall.', color: 'bg-primary', text: 'text-primary' },
              ].map(event => (
                <div key={event.title} className={`relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:${event.color}`}>
                  <p className={`text-label-sm font-bold ${event.text}`}>{event.date}</p>
                  <h4 className="text-body-md font-bold text-on-surface mt-1">{event.title}</h4>
                  <p className="text-body-sm text-on-surface-variant mt-1 leading-relaxed line-clamp-2">{event.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="bg-primary-container p-5 rounded-lg text-on-primary shadow-lg relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-h3 text-h3 mb-2">Export Schedule</h4>
              <p className="text-body-sm opacity-80 mb-4">Generate PDF or ICS files for the current academic term calendar.</p>
              <button className="w-full bg-white text-primary font-label-md text-label-md py-2.5 rounded shadow-sm hover:bg-surface-bright transition-colors uppercase tracking-widest">Download Report</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
