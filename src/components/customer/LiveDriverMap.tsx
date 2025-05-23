import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';
import { MapPin, Car, Navigation } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchNearbyVehicles } from '../../store/slices/vehicleSlice';
import type { Vehicle } from '../../types';

// This is a simplified map component
// In a real app, you'd use Google Maps, Mapbox, or similar

interface LiveDriverMapProps {
  userLocation: { lat: number; lng: number };
}

const LiveDriverMap: React.FC<LiveDriverMapProps> = ({ userLocation }) => {
  const dispatch = useAppDispatch();
  const { nearbyVehicles } = useAppSelector((state) => state.vehicles);
  const { activeTrip } = useAppSelector((state) => state.trips);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      await dispatch(fetchNearbyVehicles(userLocation));
      setLoading(false);
    };

    fetchVehicles();
    
    // In a real app, you'd set up a polling or websocket to update vehicle positions
    const interval = setInterval(fetchVehicles, 10000);
    
    return () => clearInterval(interval);
  }, [dispatch, userLocation]);

  const getVehicleMarker = (vehicle: Vehicle, index: number) => {
    const offsetX = Math.sin((index * Math.PI) / 4) * 50;
    const offsetY = Math.cos((index * Math.PI) / 4) * 50;
    
    return (
      <div 
        key={vehicle.id}
        className="absolute"
        style={{ 
          left: `calc(50% + ${offsetX}px)`, 
          top: `calc(50% + ${offsetY}px)`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${vehicle.type === 'premium' ? 'bg-warning-500' : 'bg-primary-500'}
        `}>
          <Car size={16} className="text-white" />
        </div>
        <div className="text-xs mt-1 font-medium">
          {vehicle.type === 'premium' ? 'Premium' : 'Standard'}
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-md overflow-hidden">
      <div className="h-[400px] relative bg-neutral-100 rounded-lg overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Simple map representation */}
            <div className="h-full w-full bg-[#E8EEF4] relative">
              {/* User location marker */}
              <div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white">
                  <MapPin size={20} className="text-white" />
                </div>
                <div className="text-xs font-semibold mt-1 text-center">You</div>
              </div>
              
              {/* Destination marker (if there's an active trip) */}
              {activeTrip && (
                <div 
                  className="absolute"
                  style={{ 
                    left: '70%', 
                    top: '30%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center border-4 border-white">
                    <Navigation size={20} className="text-white" />
                  </div>
                  <div className="text-xs font-semibold mt-1 text-center">Destination</div>
                </div>
              )}
              
              {/* Vehicle markers */}
              {nearbyVehicles.map((vehicle, index) => getVehicleMarker(vehicle, index))}
              
              {/* Grid lines to simulate a map */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="border border-[#D8E0E7] opacity-30"></div>
                ))}
              </div>
              
              {/* Show ETA for active trip */}
              {activeTrip && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white py-2 px-4 rounded-full shadow-lg">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-primary-500" />
                    <span className="font-medium">ETA: 8 minutes</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

// Add the missing import
import { Clock } from 'lucide-react';

export default LiveDriverMap;