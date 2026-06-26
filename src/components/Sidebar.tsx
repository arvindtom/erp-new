"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  name: string;
  icon: string;
  href: string;
}

export interface SidebarProps {
  title?: string;
  subtitle?: string;
  navItems: NavItem[];
  userInitials?: string;
  userName: string;
  userRole: string;
  userImage?: string;
}

export default function Sidebar({
  title = "EduManage Pro",
  subtitle = "Admin Console",
  navItems,
  userInitials,
  userName,
  userRole,
  userImage,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-[260px] fixed left-0 top-0 bg-primary shadow-sm z-50">
      <div className="px-6 py-8">
        <h1 className="text-h3 font-h3 text-on-primary">{title}</h1>
        <p className="text-body-sm text-primary-fixed opacity-70">{subtitle}</p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href) && item.href !== '#';
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-l-4 border-secondary-fixed-dim bg-on-primary-fixed-variant text-on-primary"
                  : "text-primary-fixed hover:text-on-primary hover:bg-on-primary-fixed-variant/50"
              }`}
            >
              <span 
                className="material-symbols-outlined"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-body-md text-body-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-on-primary-fixed-variant/30">
        <div className="flex items-center gap-3 p-2 bg-on-primary-fixed-variant/20 rounded">
          {userImage ? (
             <img src={userImage} alt={userName} className="w-10 h-10 rounded-full border-2 border-primary-fixed-dim object-cover" />
          ) : userInitials ? (
            <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-on-secondary font-bold text-xs">
              {userInitials}
            </div>
          ) : null}
          <div className="overflow-hidden">
            <p className="text-on-primary font-label-md text-label-md truncate">{userName}</p>
            <p className="text-primary-fixed opacity-60 text-[10px] uppercase tracking-widest truncate">{userRole}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
