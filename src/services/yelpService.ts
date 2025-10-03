import yelpData from '../../mock-data/yelp.json';
import { UnifiedEvent } from '../models/UnifiedEvent';



export class YelpService {
  static async getEvents(): Promise<UnifiedEvent[]> {
    try {
      const events = yelpData.events || [];
      return events.map((e: any) => ({
        id: e.id,
        name: e.name,
        description: e.description,
        category: e.category,
        cost: e.cost,
        isFree: e.is_free,
        startDate: e.time_start,
        endDate: e.time_end,
        url: e.event_site_url,
        image: e.image_url || null,
        location: e.location.display_address.join(', '),
        source: 'yelp',
      }));
    } catch (err) {
      console.error('Error loading Yelp events:', err);
      return [];
    }
  }
}
