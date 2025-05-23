import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Driver } from '../../types';

interface DriverState {
  drivers: Driver[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DriverState = {
  drivers: [],
  status: 'idle',
  error: null,
};

// Mock data
const mockDrivers: Driver[] = [
  {
    id: '1',
    userId: '2',
    vehicleId: '1',
    isOnline: true,
    rating: 4.8,
    location: { lat: 40.7138, lng: -74.0070 },
  },
  {
    id: '2',
    userId: '5',
    vehicleId: '2',
    isOnline: true,
    rating: 4.9,
    location: { lat: 40.7150, lng: -74.0080 },
  },
  {
    id: '3',
    userId: '6',
    vehicleId: '3',
    isOnline: false,
    rating: 4.7,
    location: { lat: 40.7160, lng: -74.0050 },
  },
];

export const fetchDrivers = createAsyncThunk('drivers/fetchDrivers', async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockDrivers;
});

export const updateDriverStatus = createAsyncThunk(
  'drivers/updateStatus',
  async ({ driverId, isOnline }: { driverId: string; isOnline: boolean }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { driverId, isOnline };
  }
);

export const updateDriverLocation = createAsyncThunk(
  'drivers/updateLocation',
  async ({ driverId, location }: { driverId: string; location: { lat: number; lng: number } }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { driverId, location };
  }
);

const driverSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.drivers = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateDriverStatus.fulfilled, (state, action) => {
        const { driverId, isOnline } = action.payload;
        const driver = state.drivers.find(d => d.id === driverId);
        if (driver) {
          driver.isOnline = isOnline;
        }
      })
      .addCase(updateDriverLocation.fulfilled, (state, action) => {
        const { driverId, location } = action.payload;
        const driver = state.drivers.find(d => d.id === driverId);
        if (driver) {
          driver.location = location;
        }
      });
  },
});

export default driverSlice.reducer;