"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Booking, ClassInstance } from "@/lib/types";
import { mockBookings, mockClassInstances } from "@/lib/mockData";

interface BookingContextType {
  bookings: Booking[];
  instances: ClassInstance[];
  bookClass: (instanceId: string, userId: string) => void;
  unbookClass: (instanceId: string, userId: string) => void;
  isBooked: (instanceId: string, userId: string) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [instances, setInstances] =
    useState<ClassInstance[]>(mockClassInstances);

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

  return (
    <BookingContext.Provider
      value={{ bookings, instances, bookClass, unbookClass, isBooked }}
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
