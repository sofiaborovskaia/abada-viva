import { User, ClassTemplate, ClassInstance, Booking } from "./types";
import { generateAllInstances } from "./utils";

// Mock users - you can switch between these
export const mockStudent: User = {
  id: "user-1",
  name: "Ana Silva",
  email: "ana@example.com",
  role: "student",
};

export const mockTeacher: User = {
  id: "user-2",
  name: "Minnie",
  email: "joao@example.com",
  role: "teacher",
};

// Class Templates - recurring schedule (what teachers create)
export const mockClassTemplates: ClassTemplate[] = [
  {
    id: "template-1",
    name: "Beginner Capoeira",
    description: "Perfect for newcomers to capoeira",
    dayOfWeek: "Monday",
    time: "18:00",
    duration: 90,
    teacher: "Minnie",
    location: "Armazém Cultural",
    capacity: 20,
    isActive: true,
    startDate: new Date("2026-01-01"),
  },
  {
    id: "template-2",
    name: "All Levels Roda",
    description: "Open roda for all skill levels",
    dayOfWeek: "Monday",
    time: "19:30",
    duration: 90,
    teacher: "Minnie",
    location: "Armazém Cultural",
    capacity: 25,
    isActive: true,
    startDate: new Date("2026-01-01"),
  },
  {
    id: "template-3",
    name: "Intermediate Capoeira",
    description: "For students with at least 6 months experience",
    dayOfWeek: "Wednesday",
    time: "18:00",
    duration: 90,
    teacher: "Perninha",
    location: "Alameda",
    capacity: 20,
    isActive: true,
    startDate: new Date("2026-01-01"),
  },
  {
    id: "template-4",
    name: "Kids Capoeira",
    description: "Fun capoeira classes for children ages 6-12",
    dayOfWeek: "Wednesday",
    time: "17:00",
    duration: 60,
    teacher: "Perninha",
    location: "Armazém Cultural",
    capacity: 15,
    isActive: true,
    startDate: new Date("2026-01-01"),
  },
  {
    id: "template-5",
    name: "Advanced Training",
    description: "High-intensity training for advanced students",
    dayOfWeek: "Friday",
    time: "19:00",
    duration: 90,
    teacher: "Minnie",
    location: "Armazém Cultural",
    capacity: 15,
    isActive: true,
    startDate: new Date("2026-01-01"),
  },
  {
    id: "template-6",
    name: "All Levels Roda",
    description: "End of week roda celebration",
    dayOfWeek: "Friday",
    time: "20:30",
    duration: 90,
    teacher: "Minnie",
    location: "Armazém Cultural",
    capacity: 25,
    isActive: true,
    startDate: new Date("2026-01-01"),
  },
];

// Auto-generate class instances for the next 4 weeks
export const mockClassInstances: ClassInstance[] = generateAllInstances(
  mockClassTemplates,
  4
);

// Add some mock bookings to certain instances
if (mockClassInstances.length > 0) {
  // Book some spots in the first few instances
  mockClassInstances[0].bookedCount = 15;
  mockClassInstances[1].bookedCount = 18;
  if (mockClassInstances[2]) mockClassInstances[2].bookedCount = 12;
  if (mockClassInstances[3]) mockClassInstances[3].bookedCount = 14;
  if (mockClassInstances[4]) {
    mockClassInstances[4].bookedCount = 15;
    mockClassInstances[4].waitlistCount = 3;
  }
  if (mockClassInstances[5]) mockClassInstances[5].bookedCount = 8;
}

// Mock bookings for the student
export const mockBookings: Booking[] =
  mockClassInstances.length >= 2
    ? [
        {
          id: "booking-1",
          instanceId: mockClassInstances[0].id,
          userId: "user-1",
          status: "booked",
          bookedAt: new Date("2026-01-10T10:00:00"),
        },
        {
          id: "booking-2",
          instanceId: mockClassInstances[2]?.id || mockClassInstances[0].id,
          userId: "user-1",
          status: "booked",
          bookedAt: new Date("2026-01-10T11:30:00"),
        },
      ]
    : [];
