import { UnifiedEvent } from '../models/UnifiedEvent';
import { FoursquareService } from './fourSquareService';
import { YelpService } from './yelpService';
import { TicketmasterService } from './ticketMasterService';

export const getEvents = async (): Promise<{ events: UnifiedEvent[] }> => {
  try {
    const [fsqEvents, yelpEvents, tmEvents] = await Promise.all([
      FoursquareService.getEvents(),
      YelpService.getEvents(),
      TicketmasterService.getEvents(),
    ]);

    const allEvents = [...fsqEvents, ...yelpEvents, ...tmEvents];

    allEvents.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return { events: allEvents };
  } catch (err) {
    console.error('Error fetching events from API services:', err);
    return { events: [] };
  }
};
