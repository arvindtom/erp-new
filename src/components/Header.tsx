export interface HeaderProps {
  userName?: string;
  userRole?: string;
  userImage?: string;
  searchPlaceholder?: string;
}

export default function Header({
  userName,
  userRole,
  userImage,
  searchPlaceholder = "Search...",
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-gutter py-stack-sm h-16 bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full focus-within:ring-2 focus-within:ring-primary/50 rounded transition-all">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded text-body-sm font-body-sm focus:outline-none" 
            placeholder={searchPlaceholder} 
            type="text" 
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded transition-colors">
            <span className="material-symbols-outlined">help</span>
          </button>
          <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded transition-colors">
            <span className="material-symbols-outlined">apps</span>
          </button>
        </div>

        {userName && userRole && (
          <>
            <div className="h-8 w-[1px] bg-outline-variant"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-primary font-label-md text-label-md leading-tight">{userName}</p>
                <p className="text-on-surface-variant text-[11px]">{userRole}</p>
              </div>
              {userImage && (
                <img 
                  className="w-9 h-9 rounded-full object-cover border border-outline-variant" 
                  src={userImage}
                  alt={userName} 
                />
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
