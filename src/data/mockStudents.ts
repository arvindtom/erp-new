export interface Student {
  id: string;
  name: string;
  grade: string;
  guardianContact: string;
  status: 'Active' | 'Suspended' | 'Graduated';
  avatar?: string;
}

export const mockStudents: Student[] = [
  {
    id: "STU-2024-001",
    name: "Emma Thompson",
    grade: "Grade 10-A",
    guardianContact: "+1 (555) 123-4567",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Emma+Thompson&background=dce1ff&color=00236f"
  },
  {
    id: "STU-2024-002",
    name: "Michael Chen",
    grade: "Grade 11-B",
    guardianContact: "+1 (555) 987-6543",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=dce1ff&color=00236f"
  },
  {
    id: "STU-2023-145",
    name: "Sarah Williams",
    grade: "Grade 12-A",
    guardianContact: "+1 (555) 222-3333",
    status: "Active",
  },
  {
    id: "STU-2024-089",
    name: "James Rodriguez",
    grade: "Grade 9-C",
    guardianContact: "+1 (555) 444-5555",
    status: "Suspended",
    avatar: "https://ui-avatars.com/api/?name=James+Rodriguez&background=ffdad6&color=93000a"
  },
  {
    id: "STU-2022-012",
    name: "Emily Davis",
    grade: "Alumni",
    guardianContact: "+1 (555) 666-7777",
    status: "Graduated",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=dce9ff&color=00164e"
  },
  {
    id: "STU-2024-034",
    name: "William Brown",
    grade: "Grade 10-B",
    guardianContact: "+1 (555) 888-9999",
    status: "Active",
  },
  {
    id: "STU-2024-056",
    name: "Olivia Wilson",
    grade: "Grade 11-A",
    guardianContact: "+1 (555) 111-2222",
    status: "Active",
    avatar: "https://ui-avatars.com/api/?name=Olivia+Wilson&background=dce1ff&color=00236f"
  }
];
