import foursquareData from '../../mock-data/foursquare.json';
import { UnifiedEvent } from '../models/UnifiedEvent';
import { formatFoursquareImgUrl } from '../utils/formatData';

export class FoursquareService {
  static async getEvents(): Promise<UnifiedEvent[]> {
    try {
      const events = foursquareData.results || [];
      return events.map((e: any) => {
        const photo = e.photos?.[0] ? formatFoursquareImgUrl(e.photos[0]) : null;

        return {
          id: e.fsq_id,
          name: e.name,
          description: e.description || '',
          category: e.categories?.[0]?.name || 'Event',
          cost: e.price ?? null,
          isFree: e.price === 0 || e.price == null,
          startDate: e.event_date,
          endDate: e.event_end_date || null,
          url: e.venue_url || '',
          image: photo,
          location: e.location?.formatted_address || '',
          source: 'foursquare',
        };
      });
    } catch (err) {
      console.error('Error loading Foursquare events:', err);
      return [];
    }
  }
}
