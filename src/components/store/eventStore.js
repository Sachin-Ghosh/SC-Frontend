 import { toast } from 'sonner';
import * as zustand from 'zustand';

export const useEventStore = zustand.create((set, get) => ({
  // Existing state
  subEventId: null,
  heats: [],
  isLoading: false,
  error: null,

  // Existing actions
  setSubEventId: (id) => set({ subEventId: id }),
  clearSubEventId: () => set({ subEventId: null }),

  // Create heat
  createHeat: async (heatData) => {
    set({ isLoading: true, error: null });
    
    try {
      console.log(heatData)
      const token = localStorage.getItem('access-token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const baseUrl = import.meta.env.VITE_API_URL;
      const subEventId = get().subEventId;
      
      const response = await fetch(`${baseUrl}/api/events/sub-events/${subEventId}/create-heat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(heatData)
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        if (response.status === 500) {
          toast.error('Please select a unique name or try a different schedule');
        } else {
          console.log(data)
          toast.error(data.message || 'Failed to create heat');
        }
        throw new Error('Failed to create heat');
      }
      
      toast.success(data.message || 'Heat created successfully');

      // Refresh heats list after creation
      get().fetchHeats();
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  // Existing fetchHeats function
  fetchHeats: async (filters = {}) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = localStorage.getItem('access-token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const baseUrl = import.meta.env.VITE_API_URL;
      const subEventId = get().subEventId;
      
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const url = `${baseUrl}/api/events/sub-events/${subEventId}/get-heats/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch heats');
      }

      const data = await response.json();
      set({ heats: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },
  updateHeatStatus: async (heatId, status) => {
    set({ isLoading: true, error: null });
    
    try {
      const token = localStorage.getItem('access-token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const baseUrl = import.meta.env.VITE_API_URL;
      
      const response = await fetch(`${baseUrl}/api/events/heats/${heatId}/update_status/`, {
        method: 'POST',  // Changed from PUT to POST
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update heat status');
      }

      // Refresh heats list after update
      get().fetchHeats();
      set({ isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Existing clearHeats function
  clearHeats: () => set({ heats: [], error: null }),
}));