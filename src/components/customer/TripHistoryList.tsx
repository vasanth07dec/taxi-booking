import React, { useEffect } from 'react';
import { List, Card, Tag, Space, Divider } from 'antd';
import { Calendar, Clock, MapPin, Navigation, DollarSign } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTrips } from '../../store/slices/tripSlice';
import type { Trip } from '../../types';

const TripHistoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trips, status } = useAppSelector((state) => state.trips);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTrips(user.id));
    }
  }, [dispatch, user?.id]);

  const getStatusTag = (status: Trip['status']) => {
    const statusMap: Record<Trip['status'], { color: string; text: string }> = {
      requested: { color: 'blue', text: 'Requested' },
      assigned: { color: 'processing', text: 'Driver Assigned' },
      inProgress: { color: 'processing', text: 'In Progress' },
      completed: { color: 'success', text: 'Completed' },
      cancelled: { color: 'error', text: 'Cancelled' },
    };
    
    const { color, text } = statusMap[status];
    return <Tag color={color}>{text}</Tag>;
  };

  const getPaymentTag = (method: Trip['paymentMethod'], status: Trip['paymentStatus']) => {
    const icon = <DollarSign size={14} />;
    
    if (status === 'completed') {
      return <Tag icon={icon} color="success">Paid ({method})</Tag>;
    } else {
      return <Tag icon={icon} color="warning">Pending ({method})</Tag>;
    }
  };

  return (
    <Card 
      title="Your Trip History" 
      className="shadow-md"
      loading={status === 'loading'}
    >
      <List
        itemLayout="vertical"
        dataSource={trips}
        renderItem={(trip) => (
          <List.Item>
            <Card className="w-full border border-neutral-200 hover:border-primary-300 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <Tag color={trip.type === 'premium' ? 'gold' : 'blue'} className="mr-2">
                      {trip.type === 'premium' ? 'Premium' : 'Standard'}
                    </Tag>
                    {getStatusTag(trip.status)}
                    {trip.status === 'completed' && (
                      <>
                        <Divider type="vertical" />
                        {getPaymentTag(trip.paymentMethod, trip.paymentStatus)}
                      </>
                    )}
                  </div>
                  
                  <Space direction="vertical" size="small" className="w-full">
                    <div className="flex items-start">
                      <MapPin size={18} className="text-primary-500 mr-2 mt-1" />
                      <div>
                        <div className="font-medium">Pickup</div>
                        <div className="text-neutral-600 text-sm">{trip.pickup.address}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Navigation size={18} className="text-green-600 mr-2 mt-1" />
                      <div>
                        <div className="font-medium">Dropoff</div>
                        <div className="text-neutral-600 text-sm">{trip.dropoff.address}</div>
                      </div>
                    </div>
                  </Space>
                </div>
                
                <div className="md:ml-6 mt-4 md:mt-0">
                  <div className="flex flex-col items-end">
                    <div className="text-xl font-bold">${trip.fare.toFixed(2)}</div>
                    <div className="text-neutral-500 text-sm">{trip.distance.toFixed(1)} km</div>
                    
                    <Space className="mt-3 text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {format(parseISO(trip.requestTime), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {format(parseISO(trip.requestTime), 'h:mm a')}
                      </div>
                    </Space>
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TripHistoryList;