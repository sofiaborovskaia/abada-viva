export type UserRole = "student" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Class {
  id: string;
  name: string;
  day: string;
  time: string;
  teacher: string;
  location: string;
  capacity: number;
  bookedCount: number;
}

export type BookingStatus = "booked" | "waitlist" | "cancelled";

export interface Booking {
  id: string;
  classId: string;
  userId: string;
  status: BookingStatus;
  bookedAt: Date;
}
