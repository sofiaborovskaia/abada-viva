import { ClassTemplate, ClassInstance, DayOfWeek } from "./types";

const DAY_TO_NUMBER: Record<DayOfWeek, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

/**
 * Generate class instances from a template for a given number of weeks
 */
export function generateInstances(
  template: ClassTemplate,
  weeksAhead: number = 4
): ClassInstance[] {
  if (!template.isActive) return [];

  const instances: ClassInstance[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDayNumber = DAY_TO_NUMBER[template.dayOfWeek];

  // Find the first occurrence
  let currentDate = new Date(today);
  const currentDayNumber = currentDate.getDay();
  let daysUntilTarget = targetDayNumber - currentDayNumber;

  if (daysUntilTarget < 0) {
    daysUntilTarget += 7;
  }

  currentDate.setDate(currentDate.getDate() + daysUntilTarget);

  // Generate instances for the next N weeks
  const endGeneration = new Date(today);
  endGeneration.setDate(endGeneration.getDate() + weeksAhead * 7);

  let instanceCount = 0;
  while (currentDate <= endGeneration) {
    // Check if within template's active period
    if (
      currentDate >= template.startDate &&
      (!template.endDate || currentDate <= template.endDate)
    ) {
      instances.push({
        id: `${template.id}-instance-${instanceCount}`,
        templateId: template.id,
        date: new Date(currentDate),
        time: template.time,
        teacher: template.teacher,
        location: template.location,
        capacity: template.capacity,
        bookedCount: 0,
        waitlistCount: 0,
        isCancelled: false,
        name: template.name,
      });
      instanceCount++;
    }

    // Move to next week
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return instances;
}

/**
 * Generate instances from multiple templates
 */
export function generateAllInstances(
  templates: ClassTemplate[],
  weeksAhead: number = 4
): ClassInstance[] {
  return templates.flatMap((template) =>
    generateInstances(template, weeksAhead)
  );
}

/**
 * Get instances sorted by date and time
 */
export function sortInstancesByDateTime(
  instances: ClassInstance[]
): ClassInstance[] {
  return [...instances].sort((a, b) => {
    const dateCompare = a.date.getTime() - b.date.getTime();
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
}

/**
 * Get instances for the current week (Monday to Sunday)
 */
export function getThisWeeksInstances(
  instances: ClassInstance[]
): ClassInstance[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Get Monday of current week
  const dayOfWeek = today.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday is 0, Monday is 1
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);

  // Get Sunday of current week
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return instances.filter((instance) => {
    const instanceDate = new Date(instance.date);
    return instanceDate >= monday && instanceDate <= sunday;
  });
}
