import LayoutWrapper from '@/components/LayoutWrapper';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const sidebarProps = {
    title: "EduManage Pro",
    subtitle: "Teacher Console",
    navItems: [
      { name: "Dashboard", icon: "dashboard", href: "#" },
      { name: "Students", icon: "school", href: "#" },
      { name: "Academics", icon: "book", href: "#" },
      { name: "Finance", icon: "payments", href: "#" },
      { name: "Teachers", icon: "group", href: "/teacher/portal" },
      { name: "Reports", icon: "analytics", href: "#" },
      { name: "Settings", icon: "settings", href: "#" },
    ],
    userName: "Prof. Sarah Jenkins",
    userRole: "Senior Educator",
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjlQxbghiU9rykCUga1MLOEudim7hYfBwA6eqahMDuIW0OvxZ-M98uUYbOcDXC2b2qPYo2bw_Sgv4zoAEG3Hn1z_Z-dmb40HpGFBtk0rk82fmkaSIkwnwdo8nuDKsD1V1ujOs1luUT19lzd5zzujVpByxPI4_3F1qwmXMrNBpAl_yw6oX2ugKiH45_Y5pWM_XCdCbhCHHbZVXA3fKWnR3UlXzVIbIGgLAsx3UMivKO3LzGDPIeezJK5-lE9q38Y9TfMa90sdkf",
  };

  const headerProps = {
    searchPlaceholder: "Search student records, grades, or schedule...",
  };

  return (
    <LayoutWrapper sidebarProps={sidebarProps} headerProps={headerProps}>
      {children}
    </LayoutWrapper>
  );
}
