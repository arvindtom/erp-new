import React from 'react';
import Sidebar, { SidebarProps } from './Sidebar';
import Header, { HeaderProps } from './Header';

export interface LayoutWrapperProps {
  sidebarProps: SidebarProps;
  headerProps: HeaderProps;
  children: React.ReactNode;
}

export default function LayoutWrapper({ sidebarProps, headerProps, children }: LayoutWrapperProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar {...sidebarProps} />
      <main className="ml-[260px] flex-1 flex flex-col h-screen overflow-hidden">
        <Header {...headerProps} />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
