export type Severity = "low" | "medium" | "high";
export type IssueStatus = "submitted" | "inprogress" | "resolved";
export type Category =
  | "plumbing"
  | "electrical"
  | "cleaning"
  | "furniture"
  | "internet"
  | "ac"
  | "other";

export interface Issue {
  id: string;
  studentId: string;
  building: string;
  category: Category;
  description: string;
  severity: Severity;
  status: IssueStatus;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DORM_BUILDINGS = [
  "F1", "F2", "F3", "F4", "F5", "F6",
  "Lamduan 1", "Lamduan 2", "Lamduan 3", "Lamduan 4",
  "Lamduan 5", "Lamduan 6", "Lamduan 7",
  "International House 1", "International House 2",
];

export const CATEGORIES: Record<Category, string> = {
  plumbing: "🚿 Plumbing",
  electrical: "⚡ Electrical",
  cleaning: "🧹 Cleaning",
  furniture: "🪑 Furniture",
  internet: "📶 Internet / WiFi",
  ac: "❄️ Air Conditioning",
  other: "📝 Other",
};

// Assign a dorm building based on student ID deterministically
export function assignDorm(studentId: string): string {
  const lastTwo = parseInt(studentId.slice(-2), 10);
  return DORM_BUILDINGS[lastTwo % DORM_BUILDINGS.length];
}

export const MOCK_ISSUES: Issue[] = [
  {
    id: "MFU-001",
    studentId: "6830123456",
    building: "F1",
    category: "plumbing",
    description: "The shower in room 301 is leaking water constantly. The floor is always wet and slippery, causing a safety hazard.",
    severity: "high",
    status: "inprogress",
    photoUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80",
    createdAt: new Date("2025-02-10T08:30:00"),
    updatedAt: new Date("2025-02-11T14:00:00"),
  },
  {
    id: "MFU-002",
    studentId: "6730123456",
    building: "Lamduan 3",
    category: "electrical",
    description: "Power outlet near study desk is not working. Cannot charge laptop or phone at the desk.",
    severity: "medium",
    status: "submitted",
    photoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    createdAt: new Date("2025-02-12T10:00:00"),
    updatedAt: new Date("2025-02-12T10:00:00"),
  },
  {
    id: "MFU-003",
    studentId: "6510987654",
    building: "F1",
    category: "cleaning",
    description: "Common bathroom on floor 2 has not been cleaned for 3 days. There is a bad smell and trash overflowing.",
    severity: "high",
    status: "submitted",
    photoUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&q=80",
    createdAt: new Date("2025-02-13T09:15:00"),
    updatedAt: new Date("2025-02-13T09:15:00"),
  },
  {
    id: "MFU-004",
    studentId: "6830123456",
    building: "F1",
    category: "ac",
    description: "Air conditioning unit in room 210 makes loud grinding noise at night. Very difficult to sleep.",
    severity: "medium",
    status: "resolved",
    photoUrl: undefined,
    createdAt: new Date("2025-02-08T21:00:00"),
    updatedAt: new Date("2025-02-14T16:00:00"),
  },
  {
    id: "MFU-005",
    studentId: "6730123456",
    building: "Lamduan 3",
    category: "internet",
    description: "WiFi signal is very weak in the room. Cannot attend online classes properly.",
    severity: "medium",
    status: "inprogress",
    photoUrl: undefined,
    createdAt: new Date("2025-02-11T16:30:00"),
    updatedAt: new Date("2025-02-13T11:00:00"),
  },
  {
    id: "MFU-006",
    studentId: "6510987654",
    building: "International House 1",
    category: "furniture",
    description: "Study chair is broken — one leg is shorter than the others, making it unstable and uncomfortable.",
    severity: "low",
    status: "submitted",
    photoUrl: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&q=80",
    createdAt: new Date("2025-02-14T13:00:00"),
    updatedAt: new Date("2025-02-14T13:00:00"),
  },
  {
    id: "MFU-007",
    studentId: "6830123456",
    building: "F2",
    category: "plumbing",
    description: "Hot water is not working in the entire floor. Students cannot take warm showers.",
    severity: "high",
    status: "submitted",
    photoUrl: undefined,
    createdAt: new Date("2025-02-15T07:00:00"),
    updatedAt: new Date("2025-02-15T07:00:00"),
  },
  {
    id: "MFU-008",
    studentId: "6730123456",
    building: "Lamduan 5",
    category: "electrical",
    description: "Hallway light on floor 3 is flickering constantly. It's annoying and may indicate electrical issue.",
    severity: "low",
    status: "resolved",
    photoUrl: undefined,
    createdAt: new Date("2025-02-07T18:00:00"),
    updatedAt: new Date("2025-02-10T10:00:00"),
  },
];
