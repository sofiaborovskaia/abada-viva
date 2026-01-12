export type UserRole = "student" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

// Class Template - recurring schedule created by teachers
export interface ClassTemplate {
  id: string;
  name: string;
  description?: string;
  dayOfWeek: DayOfWeek;
  time: string; // "18:00"
  duration: number; // minutes
  teacher: string;
  location: string;
  capacity: number;
  isActive: boolean;
  startDate: Date; // when this recurring class starts
  endDate?: Date; // optional end date
}

// Class Instance - specific occurrence that students book
export interface ClassInstance {
  id: string;
  templateId: string;
  date: Date; // specific date like Jan 13, 2026
  time: string;
  teacher: string;
  location: string;
  capacity: number;
  bookedCount: number;
  waitlistCount: number;
  isCancelled: boolean;
  name: string; // inherited from template
}

export type BookingStatus = "booked" | "waitlist" | "cancelled";

export interface Booking {
  id: string;
  instanceId: string; // references ClassInstance, not template
  userId: string;
  status: BookingStatus;
  bookedAt: Date;
}
