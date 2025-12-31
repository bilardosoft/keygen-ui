import { KeygenClient } from '../client';
import { EventLog, KeygenResponse, ListOptions, KeygenListResponse } from '@/lib/types/keygen';

export interface EventLogFilters extends ListOptions {
  date?: {
    start?: string;
    end?: string;
  };
  resource?: {
    type?: string;
    id?: string;
  };
}

export class EventLogResource {
  constructor(private client: KeygenClient) {}

  /**
   * List all event logs
   */
  async list(filters: EventLogFilters = {}): Promise<KeygenListResponse<EventLog>> {
    const params: Record<string, unknown> = {};

    // Add pagination
    if (filters.limit) params.limit = filters.limit;
    if (filters.page) params.page = filters.page;

    // Add date filter
    if (filters.date) {
      if (filters.date.start) params['date[start]'] = filters.date.start;
      if (filters.date.end) params['date[end]'] = filters.date.end;
    }

    // Add resource filter
    if (filters.resource) {
      if (filters.resource.type) params['resource[type]'] = filters.resource.type;
      if (filters.resource.id) params['resource[id]'] = filters.resource.id;
    }

    return this.client.request<EventLog[]>('event-logs', { params });
  }

  /**
   * Get a specific event log by ID
   */
  async get(id: string): Promise<KeygenResponse<EventLog>> {
    return this.client.request<EventLog>(`event-logs/${id}`);
  }
}
