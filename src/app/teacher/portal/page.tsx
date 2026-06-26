import React from 'react';

export default function TeacherPortalPage() {
  return (
    <div className="p-container-padding space-y-stack-lg h-full overflow-auto custom-scrollbar">
      {/* Section 1: Welcome & Quick Stats */}
      <section className="grid grid-cols-12 gap-gutter">
        <div className="col-span-12 lg:col-span-4 bg-primary text-on-primary p-8 rounded-xl shadow-sm flex flex-col justify-between overflow-hidden relative min-h-[250px]">
          <div className="relative z-10">
            <h2 className="font-h1 text-h1">Welcome back,<br />Professor Sarah</h2>
            <p className="mt-2 text-primary-fixed-dim font-body-md">You have 4 classes today. Don't forget to submit the monthly assessment reports by EOD.</p>
          </div>
          <div className="mt-8 flex gap-4 relative z-10">
            <button className="bg-on-primary text-primary px-6 py-2 rounded font-label-md hover:bg-primary-fixed transition-colors">View Profile</button>
            <button className="border border-primary-fixed-dim text-on-primary px-6 py-2 rounded font-label-md hover:bg-on-primary/10 transition-colors">Class Log</button>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12">school</span>
        </div>

        <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between min-h-[160px]">
            <span className="material-symbols-outlined text-primary text-[32px]">event_repeat</span>
            <div>
              <p className="text-on-surface-variant font-label-md uppercase tracking-wider">Classes Today</p>
              <h2 className="font-h2 text-h2 text-primary mt-1">04</h2>
              <p className="text-secondary font-label-sm mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span> Next: 10:30 AM
              </p>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <span className="material-symbols-outlined text-tertiary text-[32px]">assignment_late</span>
            <div>
              <p className="text-on-surface-variant font-label-md uppercase tracking-wider">To Grade</p>
              <h2 className="font-h2 text-h2 text-tertiary mt-1">28</h2>
              <p className="text-error font-label-sm mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">priority_high</span> 12 Urgent
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <span className="material-symbols-outlined text-secondary text-[32px]">groups</span>
            <div>
              <p className="text-on-surface-variant font-label-md uppercase tracking-wider">Avg. Attendance</p>
              <h2 className="font-h2 text-h2 text-secondary mt-1">94%</h2>
              <p className="text-secondary font-label-sm mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +2% this week
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
            <span className="material-symbols-outlined text-primary-container text-[32px]">calendar_month</span>
            <div>
              <p className="text-on-surface-variant font-label-md uppercase tracking-wider">Events</p>
              <h2 className="font-h2 text-h2 text-primary-container mt-1">02</h2>
              <p className="text-on-surface-variant font-label-sm mt-2">Faculty Meeting @ 4PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Timetable & Quick Actions */}
      <section className="grid grid-cols-12 gap-gutter">
        {/* My Schedule */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-h3 text-h3 text-primary flex items-center gap-2">
              <span className="material-symbols-outlined">schedule</span> Daily Timetable
            </h3>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-surface-container-low rounded"><span className="material-symbols-outlined">chevron_left</span></button>
              <span className="font-label-md self-center px-2">Monday, Oct 23</span>
              <button className="p-1 hover:bg-surface-container-low rounded"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Class Slot */}
              <div className="flex gap-6 items-center group">
                <div className="w-20 text-right">
                  <p className="font-label-md text-primary">08:00 AM</p>
                  <p className="text-label-sm text-on-surface-variant">09:30 AM</p>
                </div>
                <div className="w-1 bg-primary-fixed-dim h-12 rounded-full"></div>
                <div className="flex-1 bg-surface-container-low p-4 rounded-lg group-hover:bg-surface-container-high transition-colors flex justify-between items-center">
                  <div>
                    <p className="font-h3 text-body-lg text-primary">Advanced Mathematics (Grade 12-A)</p>
                    <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> Room 402 • Science Wing
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-label-sm rounded-full">Completed</span>
                </div>
              </div>

              {/* Active Class Slot */}
              <div className="flex gap-6 items-center group">
                <div className="w-20 text-right">
                  <p className="font-label-md text-primary">10:30 AM</p>
                  <p className="text-label-sm text-on-surface-variant">12:00 PM</p>
                </div>
                <div className="w-1 bg-secondary h-16 rounded-full"></div>
                <div className="flex-1 border-2 border-secondary-container bg-surface-container-lowest p-4 rounded-lg flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-h3 text-body-lg text-primary">General Calculus (Grade 11-B)</p>
                    <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> Room 205 • Lab B
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-secondary font-label-md flex items-center gap-1">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span> Starting in 12m
                      </span>
                    </div>
                    <button className="bg-secondary text-on-secondary p-2 rounded-full hover:shadow-md transition-shadow flex items-center justify-center">
                      <span className="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Break Slot */}
              <div className="flex gap-6 items-center opacity-60">
                <div className="w-20 text-right">
                  <p className="font-label-md text-on-surface-variant">12:00 PM</p>
                </div>
                <div className="w-1 bg-outline-variant h-8 rounded-full border-dashed border-l"></div>
                <div className="flex-1 px-4 py-2 flex items-center gap-4 text-on-surface-variant italic font-body-sm">
                  <span className="material-symbols-outlined text-[18px]">restaurant</span> Lunch Break
                </div>
              </div>

              {/* Future Slot */}
              <div className="flex gap-6 items-center group">
                <div className="w-20 text-right">
                  <p className="font-label-md text-primary">01:30 PM</p>
                  <p className="text-label-sm text-on-surface-variant">03:00 PM</p>
                </div>
                <div className="w-1 bg-primary-fixed-dim h-12 rounded-full"></div>
                <div className="flex-1 bg-surface-container-low p-4 rounded-lg group-hover:bg-surface-container-high transition-colors flex justify-between items-center">
                  <div>
                    <p className="font-h3 text-body-lg text-primary">Basic Algebra (Grade 10-C)</p>
                    <p className="text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> Room 101 • Main Hall
                    </p>
                  </div>
                  <span className="text-on-surface-variant font-label-sm">Upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <h3 className="font-label-md text-on-surface-variant uppercase tracking-widest px-1">Administrative Actions</h3>
          
          <button className="w-full bg-primary text-on-primary p-6 rounded-xl flex items-center justify-between hover:bg-primary-container transition-all group shadow-sm">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[32px] p-2 bg-on-primary/10 rounded-lg group-hover:scale-110 transition-transform">how_to_reg</span>
              <div className="text-left">
                <p className="font-h3 text-body-lg">Mark Attendance</p>
                <p className="text-primary-fixed text-body-sm opacity-80">Quick scan or manual entry</p>
              </div>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          <button className="w-full bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center justify-between hover:bg-secondary-container/10 transition-all group shadow-sm">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[32px] text-secondary p-2 bg-secondary-container/20 rounded-lg group-hover:scale-110 transition-transform">post_add</span>
              <div className="text-left">
                <p className="font-h3 text-body-lg text-primary">Add Grade</p>
                <p className="text-on-surface-variant text-body-sm">Post new assessment scores</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>

          <button className="w-full bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center justify-between hover:bg-tertiary-fixed/10 transition-all group shadow-sm">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[32px] text-tertiary p-2 bg-tertiary-fixed/20 rounded-lg group-hover:scale-110 transition-transform">note_add</span>
              <div className="text-left">
                <p className="font-h3 text-body-lg text-primary">Create Assignment</p>
                <p className="text-on-surface-variant text-body-sm">Draft and publish tasks</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
}
