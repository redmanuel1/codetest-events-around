import ticketmasterData from '../../mock-data/ticketmaster.json';
import { UnifiedEvent } from '../models/UnifiedEvent';



export class TicketmasterService {
  static async getEvents(): Promise<UnifiedEvent[]> {
    try {
      const events = ticketmasterData._embedded?.events || [];

      return events.map((e: any) => {
        const venue = e._embedded?.venues?.[0];
        const priceRange = e.priceRanges?.[0];

        return {
          id: e.id,
          name: e.name,
          description: e.info || '',
          category: e.type?.toLowerCase() === 'event' ? 'Event' : e.type || 'Event',
          cost: priceRange
            ? `${priceRange.currency} ${priceRange.min} - ${priceRange.max}`
            : null,
          isFree: !priceRange,
          startDate: e.dates?.start?.dateTime || e.dates?.start?.localDate,
          endDate: e.dates?.end?.dateTime || null,
          url: e.url,
          image: e.images?.[0]?.url || null,
          location: venue
            ? `${venue.name}, ${venue.address?.line1 || ''}, ${venue.city?.name || ''} ${venue.state?.stateCode || ''}`
            : 'Unknown location',
          source: 'ticketmaster',
        };
      });
    } catch (err) {
      console.error('Error loading Ticketmaster events:', err);
      return [];
    }
  }
}
