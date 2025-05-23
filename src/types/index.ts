// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'driver' | 'owner' | 'admin';
  avatar?: string;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Vehicle {
  id: string;
  ownerId: string;
  type: 'standard' | 'premium';
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  isCompanyOwned: boolean;
  isAvailable: boolean;
  location?: Location;
}

export interface Driver {
  id: string;
  userId: string;
  vehicleId: string;
  isOnline: boolean;
  rating: number;
  location?: Location;
  currentTripId?: string;
}

export interface Trip {
  id: string;
  customerId: string;
  driverId?: string;
  vehicleId?: string;
  status: 'requested' | 'assigned' | 'inProgress' | 'completed' | 'cancelled';
  type: 'standard' | 'premium';
  pickup: Location;
  dropoff: Location;
  fare: number;
  distance: number;
  duration: number;
  requestTime: string;
  pickupTime?: string;
  dropoffTime?: string;
  paymentMethod: 'cash' | 'card' | 'wallet';
  paymentStatus: 'pending' | 'completed';
}

export interface Feedback {
  id: string;
  tripId: string;
  rating: number;
  comments?: string;
  cleanliness: number;
  timeliness: number;
  comfort: number;
}