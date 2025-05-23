import React, { useState, useEffect } from 'react';
import { Card, Switch, Button, Statistic, Row, Col, Divider, Empty, Badge } from 'antd';
import { CarTaxiFront as Taxi, Clock, DollarSign, Users, Navigation, MapPin } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateDriverStatus } from '../../store/slices/driverSlice';
import { fetchTrips, setActiveTrip } from '../../store/slices/tripSlice';
import type { Trip } from '../../types';

const DriverDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { trips, activeTrip } = useAppSelector((state) => state.trips);
  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTrips(user.id));
    }
  }, [dispatch, user?.id]);

  const handleStatusChange = async (checked: boolean) => {
    setLoading(true);
    try {
      // In a real app, we'd send the actual driver ID from the auth state
      await dispatch(updateDriverStatus({ driverId: '1', isOnline: checked })).unwrap();
      setIsOnline(checked);
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTrip = (trip: Trip) => {
    dispatch(setActiveTrip({
      ...trip,
      status: 'assigned',
      driverId: '1', // Would be the actual driver ID in a real app
    }));
  };

  const renderPendingTrips = () => {
    const pendingTrips = trips.filter(trip => trip.status === 'requested');
    
    if (pendingTrips.length === 0) {
      return (
        <Empty 
          description="No trip requests available" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }
    
    return pendingTrips.map(trip => (
      <Card 
        key={trip.id} 
        className="mb-4 border-2 border-neutral-200 hover:border-primary-300 transition-all"
      >
        <div className="flex justify-between items-start mb-3">
          <Badge.Ribbon 
            text={trip.type === 'premium' ? 'Premium' : 'Standard'}
            color={trip.type === 'premium' ? 'gold' : 'blue'}
          />
          <div className="text-lg font-bold">${trip.fare.toFixed(2)}</div>
        </div>
        
        <div className="flex items-center mb-3">
          <MapPin size={18} className="text-primary-500 mr-2" />
          <div className="text-neutral-600">{trip.pickup.address || 'Pickup location'}</div>
        </div>
        
        <div className="flex items-center mb-4">
          <Navigation size={18} className="text-green-500 mr-2" />
          <div className="text-neutral-600">{trip.dropoff.address || 'Dropoff location'}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-neutral-50 p-2 rounded">
            <div className="text-xs text-neutral-500">Distance</div>
            <div className="font-semibold">{trip.distance.toFixed(1)} km</div>
          </div>
          <div className="bg-neutral-50 p-2 rounded">
            <div className="text-xs text-neutral-500">Duration</div>
            <div className="font-semibold">{trip.duration} min</div>
          </div>
          <div className="bg-neutral-50 p-2 rounded">
            <div className="text-xs text-neutral-500">Payment</div>
            <div className="font-semibold capitalize">{trip.paymentMethod}</div>
          </div>
        </div>
        
        <Button 
          type="primary" 
          block 
          size="large"
          onClick={() => handleAcceptTrip(trip)}
        >
          Accept Trip
        </Button>
      </Card>
    ));
  };

  const renderActiveTrip = () => {
    if (!activeTrip) return null;
    
    return (
      <Card 
        title={
          <div className="flex items-center">
            <Taxi className="mr-2 text-primary-500" size={20} />
            <span>Current Trip</span>
          </div>
        }
        className="mb-6 border-2 border-primary-300 shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <Badge 
            status="processing" 
            text={
              <span className="font-medium">
                {activeTrip.status === 'assigned' ? 'On the way to pickup' : 'In progress'}
              </span>
            } 
          />
          <div className="text-lg font-bold">${activeTrip.fare.toFixed(2)}</div>
        </div>
        
        <div className="flex items-start mb-3">
          <MapPin size={18} className="text-primary-500 mr-2 mt-1" />
          <div>
            <div className="font-medium">Pickup</div>
            <div className="text-neutral-600">
              {activeTrip.pickup.address || 'Pickup location'}
            </div>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <Navigation size={18} className="text-green-500 mr-2 mt-1" />
          <div>
            <div className="font-medium">Dropoff</div>
            <div className="text-neutral-600">
              {activeTrip.dropoff.address || 'Dropoff location'}
            </div>
          </div>
        </div>
        
        <Row gutter={16} className="mb-4">
          <Col span={12}>
            <Button 
              type="default" 
              block
              icon={<Navigation size={16} />}
            >
              Navigate
            </Button>
          </Col>
          <Col span={12}>
            <Button 
              type="primary" 
              block 
              danger
            >
              Complete Trip
            </Button>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-1">Driver Dashboard</h2>
            <p className="text-neutral-500">
              {isOnline 
                ? 'You are online and receiving trip requests' 
                : 'You are offline. Go online to receive trips'}
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-3">{isOnline ? 'Online' : 'Offline'}</span>
            <Switch 
              checked={isOnline}
              onChange={handleStatusChange}
              loading={loading}
              className={isOnline ? 'bg-green-500' : ''}
            />
          </div>
        </div>
        
        <Divider />
        
        <Row gutter={24}>
          <Col xs={12} md={6}>
            <Statistic 
              title="Today's Trips"
              value={3}
              prefix={<Taxi size={20} />}
              className="mb-4"
            />
          </Col>
          <Col xs={12} md={6}>
            <Statistic 
              title="Today's Earnings"
              value={78.50}
              precision={2}
              prefix={<DollarSign size={20} />}
              className="mb-4"
            />
          </Col>
          <Col xs={12} md={6}>
            <Statistic 
              title="Online Hours"
              value={5.2}
              precision={1}
              prefix={<Clock size={20} />}
              suffix="h"
              className="mb-4"
            />
          </Col>
          <Col xs={12} md={6}>
            <Statistic 
              title="Total Passengers"
              value={7}
              prefix={<Users size={20} />}
              className="mb-4"
            />
          </Col>
        </Row>
      </Card>
      
      {activeTrip && renderActiveTrip()}
      
      {isOnline && !activeTrip && (
        <Card 
          title="Available Trips" 
          className="shadow-md"
        >
          {renderPendingTrips()}
        </Card>
      )}
    </div>
  );
};

export default DriverDashboard;