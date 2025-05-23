import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import type { Trip } from '../../types';

interface TripState {
  trips: Trip[];
  activeTrip: Trip | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TripState = {
  trips: [],
  activeTrip: null,
  status: 'idle',
  error: null,
};

// Mock data
const mockTrips: Trip[] = [
  {
    id: '1',
    customerId: '1',
    driverId: '2',
    vehicleId: '1',
    status: 'completed',
    type: 'standard',
    pickup: { lat: 40.7128, lng: -74.0060, address: '123 Broadway, New York, NY' },
    dropoff: { lat: 40.7484, lng: -73.9857, address: '350 Fifth Avenue, New York, NY' },
    fare: 25.50,
    distance: 3.7,
    duration: 15,
    requestTime: format(new Date(2025, 0, 15, 10, 30), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    pickupTime: format(new Date(2025, 0, 15, 10, 35), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    dropoffTime: format(new Date(2025, 0, 15, 10, 50), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    paymentMethod: 'card',
    paymentStatus: 'completed',
  },
  {
    id: '2',
    customerId: '1',
    status: 'requested',
    type: 'premium',
    pickup: { lat: 40.7484, lng: -73.9857, address: '350 Fifth Avenue, New York, NY' },
    dropoff: { lat: 40.7580, lng: -73.9855, address: '45 Rockefeller Plaza, New York, NY' },
    fare: 35.00,
    distance: 2.5,
    duration: 10,
    requestTime: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss'),
    paymentMethod: 'cash',
    paymentStatus: 'pending',
  },
];

export const fetchTrips = createAsyncThunk('trips/fetchTrips', async (userId: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockTrips.filter(trip => 
    trip.customerId === userId || trip.driverId === userId
  );
});

export const requestTrip = createAsyncThunk(
  'trips/requestTrip',
  async (tripData: Partial<Trip>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newTrip: Trip = {
      id: Date.now().toString(),
      customerId: tripData.customerId || '1',
      status: 'requested',
      type: tripData.type || 'standard',
      pickup: tripData.pickup || { lat: 0, lng: 0 },
      dropoff: tripData.dropoff || { lat: 0, lng: 0 },
      fare: tripData.fare || 0,
      distance: tripData.distance || 0,
      duration: tripData.duration || 0,
      requestTime: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss'),
      paymentMethod: tripData.paymentMethod || 'cash',
      paymentStatus: 'pending',
    };
    
    return newTrip;
  }
);

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setActiveTrip: (state, action) => {
      state.activeTrip = action.payload;
    },
    clearActiveTrip: (state) => {
      state.activeTrip = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(requestTrip.fulfilled, (state, action) => {
        state.trips.push(action.payload);
        state.activeTrip = action.payload;
      });
  },
});

export const { setActiveTrip, clearActiveTrip } = tripSlice.actions;
export default tripSlice.reducer;