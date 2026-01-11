import { User, Class, Booking } from "./types";

// Mock users - you can switch between these
export const mockStudent: User = {
  id: "user-1",
  name: "Ana Silva",
  email: "ana@example.com",
  role: "student",
};

export const mockTeacher: User = {
  id: "user-2",
  name: "Mestre João",
  email: "joao@example.com",
  role: "teacher",
};

// Mock classes - weekly schedule
export const mockClasses: Class[] = [
  {
    id: "class-1",
    name: "Beginner Capoeira",
    day: "Monday",
    time: "18:00",
    teacher: "Mestre João",
    location: "Studio A",
    capacity: 20,
    bookedCount: 15,
  },
  {
    id: "class-2",
    name: "All Levels Roda",
    day: "Monday",
    time: "19:30",
    teacher: "Mestre João",
    location: "Studio A",
    capacity: 25,
    bookedCount: 18,
  },
  {
    id: "class-3",
    name: "Intermediate Capoeira",
    day: "Wednesday",
    time: "18:00",
    teacher: "Professor Maria",
    location: "Studio B",
    capacity: 20,
    bookedCount: 12,
  },
  {
    id: "class-4",
    name: "Kids Capoeira",
    day: "Wednesday",
    time: "17:00",
    teacher: "Professor Maria",
    location: "Studio A",
    capacity: 15,
    bookedCount: 14,
  },
  {
    id: "class-5",
    name: "Advanced Training",
    day: "Friday",
    time: "19:00",
    teacher: "Mestre João",
    location: "Studio A",
    capacity: 15,
    bookedCount: 15,
  },
  {
    id: "class-6",
    name: "All Levels Roda",
    day: "Friday",
    time: "20:30",
    teacher: "Mestre João",
    location: "Studio A",
    capacity: 25,
    bookedCount: 8,
  },
];

// Mock bookings for the student
export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    classId: "class-1",
    userId: "user-1",
    status: "booked",
    bookedAt: new Date("2026-01-10T10:00:00"),
  },
  {
    id: "booking-2",
    classId: "class-3",
    userId: "user-1",
    status: "booked",
    bookedAt: new Date("2026-01-10T11:30:00"),
  },
];
