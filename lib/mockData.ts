import { User, ClassTemplate, ClassInstance, Booking, School } from "./types";
import { generateAllInstances } from "./utils";

// Mock school
export const mockSchool: School = {
  id: "school-1",
  name: "Abadá Capoeira Lisboa",
  location: "Lisboa, Portugal",
  contactEmail: "info@abadalx.com",
};

// Mock users - you can switch between these
export const mockStudent: User = {
  id: "user-1",
  firstName: "Ana",
  lastName: "Silva",
  email: "ana@example.com",
  phone: "+351 912 345 678",
  role: "student",
  schoolId: "school-1",
  graduacao: "Verde",
  capoeiraExperience:
    "Treinei por 2 anos na escola de Capoeira Regional antes de vir para Abadá.",
  medicalConditions: "",
};

export const mockTeacher: User = {
  id: "user-2",
  firstName: "Minnie",
  lastName: "Santos",
  email: "minnie@example.com",
  phone: "+351 918 765 432",
  role: "teacher",
  schoolId: "school-1",
  graduacao: "Marrom",
  capoeiraExperience:
    "Comecei com 8 anos em Salvador, Bahia. Treinamento em Capoeira Angola e Regional.",
  medicalConditions: "",
};

// Class Templates - recurring schedule (what teachers create)
export const mockClassTemplates: ClassTemplate[] = [
  {
    id: "template-1",
    schoolId: "school-1",
    name: "Capoeira Iniciantes",
    description: "Perfeito para quem está começando na capoeira",
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
    schoolId: "school-1",
    name: "Roda para Todos os Níveis",
    description: "Roda aberta para todos os níveis de habilidade",
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
    schoolId: "school-1",
    name: "Capoeira Intermediário",
    description: "Para estudantes com pelo menos 6 meses de experiência",
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
    schoolId: "school-1",
    name: "Capoeira Infantil",
    description: "Aulas divertidas de capoeira para crianças de 6 a 12 anos",
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
    schoolId: "school-1",
    name: "Treino Avançado",
    description: "Treino de alta intensidade para estudantes avançados",
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
    schoolId: "school-1",
    name: "Roda de Final de Semana",
    description: "Roda de celebração do fim de semana",
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
