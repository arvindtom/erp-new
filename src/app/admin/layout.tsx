import LayoutWrapper from '@/components/LayoutWrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebarProps = {
    title: "EduManage Pro",
    subtitle: "Admin Console",
    navItems: [
      { name: "Dashboard", icon: "dashboard", href: "#" },
      { name: "Admission", icon: "person_add", href: "/admin/admission" },
      { name: "Students", icon: "school", href: "/admin/students" },
      { name: "Academics", icon: "book", href: "/admin/calendar" },
      { name: "Library", icon: "local_library", href: "/admin/academics/library" },
      { name: "Fees", icon: "payments", href: "/admin/finance/fees" },
      { name: "Accounting", icon: "account_balance", href: "/admin/finance/accounting" },
      { name: "HR & Payroll", icon: "badge", href: "/admin/hr/payroll" },
      { name: "Inventory", icon: "inventory_2", href: "/admin/facilities/inventory" },
      { name: "Transport", icon: "directions_bus", href: "/admin/facilities/transport" },
      { name: "Workflows", icon: "account_tree", href: "/admin/workflows" },
      { name: "Support", icon: "support_agent", href: "/admin/support" },
      { name: "Settings", icon: "settings", href: "#" },
    ],
    userName: "Admin User",
    userRole: "Super Admin",
    userInitials: "AD",
  };

  const headerProps = {
    userName: "Sarah Jenkins",
    userRole: "Academic Registrar",
    userImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqw_ZphBweYlYlH4lP6EJE0n5V_VjqIXkftmYff0WitVJZoZA3cNDGgEsZ3y5LjLkthKZJqcMIrOrJjyjrfVnjmc18Yr3wjZG_45vQSNv59LpfRZv65JqQR3XCr153hEDAceE4tPNnn_erFDqPa76ghZqzFS6lZMY9iLTsIIJ4tbflXbdwV8aUORx1qMKJCpw5_wi0WaojpH0ys0zSUW_laXVdZqaRUF6bulieP0fZc9ctuWbuU0QS8MDZjGnbImleK5tmL_UK",
    searchPlaceholder: "Search calendar, events, or academic records...",
  };

  return (
    <LayoutWrapper sidebarProps={sidebarProps} headerProps={headerProps}>
      {children}
    </LayoutWrapper>
  );
}
