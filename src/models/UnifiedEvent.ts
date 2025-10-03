export interface UnifiedEvent {
  id: string;
  name: string;
  description: string;
  category: string;
  cost: string | number | null;
  isFree: boolean;
  startDate: string;
  endDate: string | null;
  url: string;
  image: string | null;
  location: string;
  source: 'yelp' | 'foursquare' | 'ticketmaster';
}
