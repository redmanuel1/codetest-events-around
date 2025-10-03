import { UnifiedEvent } from '../models/UnifiedEvent';


export function groupEventsByCategory(events: UnifiedEvent[]) {
  return events.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {} as Record<string, UnifiedEvent[]>);
}
