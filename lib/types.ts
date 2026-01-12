export type UserRole = "student" | "teacher";

// Capoeira graduation levels (Abadá belt colors)
export type Graduacao =
  | "Crua" // Raw/White
  | "Crua-Amarela" // White-Yellow
  | "Amarela" // Yellow
  | "Amarela-Laranja" // Yellow-Orange
  | "Laranja" // Orange
  | "Laranja-Azul" // Orange-Blue
  | "Azul" // Blue
  | "Azul-Verde" // Blue-Green
  | "Verde" // Green
  | "Verde-Roxa" // Green-Purple
  | "Roxa" // Purple
  | "Roxa-Marrom" // Purple-Brown
  | "Marrom" // Brown
  | "Marrom-Vermelha" // Brown-Red
  | "Vermelha" // Red
  | "Vermelha-Branca" // Red-White
  | "Branca"; // White

// School/Organization
export interface School {
  id: string;
  name: string;
  location?: string;
  contactEmail?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  schoolId: string;
  graduacao?: Graduacao;
  capoeiraExperience?: string;
  medicalConditions?: string;
}

// Legacy helper for display name
export function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
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
  schoolId: string; // belongs to a school
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
