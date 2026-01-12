"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Booking, ClassInstance, ClassTemplate } from "@/lib/types";
import {
  mockBookings,
  mockClassInstances,
  mockClassTemplates,
} from "@/lib/mockData";
import { generateInstances } from "@/lib/utils";

interface BookingContextType {
  bookings: Booking[];
  instances: ClassInstance[];
  templates: ClassTemplate[];
  bookClass: (instanceId: string, userId: string) => void;
  unbookClass: (instanceId: string, userId: string) => void;
  isBooked: (instanceId: string, userId: string) => boolean;
  createTemplate: (template: Omit<ClassTemplate, "id">) => void;
  updateTemplate: (id: string, updates: Partial<ClassTemplate>) => void;
  deleteTemplate: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [instances, setInstances] =
    useState<ClassInstance[]>(mockClassInstances);
  const [templates, setTemplates] =
    useState<ClassTemplate[]>(mockClassTemplates);

  const bookClass = (instanceId: string, userId: string) => {
    // Create new booking
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      instanceId,
      userId,
      status: "booked",
      bookedAt: new Date(),
    };

    setBookings([...bookings, newBooking]);

    // Update instance booked count
    setInstances(
      instances.map((instance) =>
        instance.id === instanceId
          ? { ...instance, bookedCount: instance.bookedCount + 1 }
          : instance
      )
    );

    console.log("✅ Booked class:", instanceId);
  };

  const unbookClass = (instanceId: string, userId: string) => {
    // Remove booking
    setBookings(
      bookings.filter(
        (b) => !(b.instanceId === instanceId && b.userId === userId)
      )
    );

    // Update instance booked count
    setInstances(
      instances.map((instance) =>
        instance.id === instanceId
          ? { ...instance, bookedCount: Math.max(0, instance.bookedCount - 1) }
          : instance
      )
    );

    console.log("❌ Cancelled booking:", instanceId);
  };

  const isBooked = (instanceId: string, userId: string): boolean => {
    return bookings.some(
      (b) =>
        b.instanceId === instanceId &&
        b.userId === userId &&
        b.status === "booked"
    );
  };

  const createTemplate = (templateData: Omit<ClassTemplate, "id">) => {
    const newTemplate: ClassTemplate = {
      ...templateData,
      id: `template-${Date.now()}`,
    };

    setTemplates([...templates, newTemplate]);

    // Generate instances for this new template (4 weeks)
    const newInstances = generateInstances(newTemplate, 4);
    setInstances([...instances, ...newInstances]);

    console.log("✅ Created template:", newTemplate.name);
  };

  const updateTemplate = (id: string, updates: Partial<ClassTemplate>) => {
    setTemplates(
      templates.map((template) =>
        template.id === id ? { ...template, ...updates } : template
      )
    );

    // Regenerate instances for updated template
    const updatedTemplate = templates.find((t) => t.id === id);
    if (updatedTemplate) {
      const mergedTemplate = { ...updatedTemplate, ...updates };

      // Remove old instances for this template
      setInstances(instances.filter((i) => i.templateId !== id));

      // Generate new instances if template is active
      if (mergedTemplate.isActive) {
        const newInstances = generateInstances(mergedTemplate, 4);
        setInstances([
          ...instances.filter((i) => i.templateId !== id),
          ...newInstances,
        ]);
      }
    }

    console.log("✏️ Updated template:", id);
  };

  const deleteTemplate = (id: string) => {
    // Mark as inactive instead of deleting (keeps data integrity)
    setTemplates(
      templates.map((template) =>
        template.id === id ? { ...template, isActive: false } : template
      )
    );

    // Remove future instances for this template
    setInstances(instances.filter((i) => i.templateId !== id));

    console.log("🗑️ Deactivated template:", id);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        instances,
        templates,
        bookClass,
        unbookClass,
        isBooked,
        createTemplate,
        updateTemplate,
        deleteTemplate,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
