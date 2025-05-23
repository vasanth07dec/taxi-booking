import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Vehicle } from '../../types';

interface VehicleState {
  vehicles: Vehicle[];
  nearbyVehicles: Vehicle[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: [],
  nearbyVehicles: [],
  status: 'idle',
  error: null,
};

// Mock data
const mockVehicles: Vehicle[] = [
  {
    id: '1',
    ownerId: '3',
    type: 'standard',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    licensePlate: 'ABC123',
    color: 'Silver',
    isCompanyOwned: true,
    isAvailable: true,
    location: { lat: 40.7138, lng: -74.0070 },
  },
  {
    id: '2',
    ownerId: '3',
    type: 'premium',
    make: 'Mercedes',
    model: 'E-Class',
    year: 2024,
    licensePlate: 'XYZ789',
    color: 'Black',
    isCompanyOwned: true,
    isAvailable: true,
    location: { lat: 40.7150, lng: -74.0080 },
  },
  {
    id: '3',
    ownerId: '5',
    type: 'standard',
    make: 'Honda',
    model: 'Accord',
    year: 2022,
    licensePlate: 'DEF456',
    color: 'White',
    isCompanyOwned: false,
    isAvailable: true,
    location: { lat: 40.7160, lng: -74.0050 },
  },
];

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (ownerId?: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  if (ownerId) {
    return mockVehicles.filter(vehicle => vehicle.ownerId === ownerId);
  }
  
  return mockVehicles;
});

export const fetchNearbyVehicles = createAsyncThunk(
  'vehicles/fetchNearbyVehicles',
  async ({ lat, lng }: { lat: number; lng: number }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Mock logic to find nearby vehicles (in real app, would use actual distance calculation)
    return mockVehicles.filter(vehicle => 
      vehicle.isAvailable && vehicle.location 
      // Simple proximity check (not accurate for real-world use)
      && Math.abs(vehicle.location.lat - lat) < 0.1
      && Math.abs(vehicle.location.lng - lng) < 0.1
    );
  }
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    updateVehicleAvailability: (state, action) => {
      const { vehicleId, isAvailable } = action.payload;
      const vehicle = state.vehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        vehicle.isAvailable = isAvailable;
      }
    },
    updateVehicleLocation: (state, action) => {
      const { vehicleId, location } = action.payload;
      const vehicle = state.vehicles.find(v => v.id === vehicleId);
      if (vehicle) {
        vehicle.location = location;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchNearbyVehicles.fulfilled, (state, action) => {
        state.nearbyVehicles = action.payload;
      });
  },
});

export const { updateVehicleAvailability, updateVehicleLocation } = vehicleSlice.actions;
export default vehicleSlice.reducer;