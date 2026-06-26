import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
      <div className="bg-surface-container-lowest p-12 rounded-xl shadow-lg border border-outline-variant max-w-2xl w-full text-center">
        <span className="material-symbols-outlined text-[64px] text-primary mb-4">school</span>
        <h1 className="text-h1 font-h1 text-primary mb-2">EduManage Pro</h1>
        <p className="text-body-lg text-on-surface-variant mb-12">Select a portal to continue</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/calendar" className="group p-6 rounded-lg border-2 border-outline-variant hover:border-primary transition-colors flex flex-col items-center gap-4 hover:bg-surface-container-low">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
            </div>
            <div>
              <h2 className="text-h3 font-h3 text-on-surface">Admin Console</h2>
              <p className="text-body-sm text-on-surface-variant mt-1">Manage academic calendar, events, and institutional settings</p>
            </div>
          </Link>
          
          <Link href="/teacher/portal" className="group p-6 rounded-lg border-2 border-outline-variant hover:border-secondary transition-colors flex flex-col items-center gap-4 hover:bg-surface-container-low">
            <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">co_present</span>
            </div>
            <div>
              <h2 className="text-h3 font-h3 text-on-surface">Teacher Portal</h2>
              <p className="text-body-sm text-on-surface-variant mt-1">Access daily timetable, classes, and grading tasks</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
