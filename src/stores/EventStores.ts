import { makeAutoObservable, runInAction } from 'mobx';
import { UnifiedEvent } from '../models/UnifiedEvent';
import { getEvents } from '../services/apiService';

class EventStore {
  events: UnifiedEvent[] = [];
  loading: boolean = false;
  selectedEvent: UnifiedEvent | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
    this.loading = true;
    try {
      const { events } = await getEvents();
      runInAction(() => {
        this.events = events;
      });
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  selectEventById(id: string) {
    this.selectedEvent = this.events.find(e => e.id === id) || null;
  }
}

export const eventStore = new EventStore();
