import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Tabs, Button, Badge, Select } from 'antd';
import { 
  TrendingUp, TrendingDown, Users, Car, DollarSign, 
  AlertTriangle, MapPin
} from 'lucide-react';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTrips } from '../../store/slices/tripSlice';
import { fetchVehicles } from '../../store/slices/vehicleSlice';
import { fetchDrivers } from '../../store/slices/driverSlice';
import type { Trip } from '../../types';

const { TabPane } = Tabs;
const { Option } = Select;

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trips } = useAppSelector((state) => state.trips);
  const { vehicles } = useAppSelector((state) => state.vehicles);
  const { drivers } = useAppSelector((state) => state.drivers);
  const [timeFilter, setTimeFilter] = useState('today');

  useEffect(() => {
    dispatch(fetchTrips('all'));
    dispatch(fetchVehicles());
    dispatch(fetchDrivers());
  }, [dispatch]);

  const getStatusBadge = (status: Trip['status']) => {
    const statusMap: Record<Trip['status'], { status: string; text: string }> = {
      requested: { status: 'warning', text: 'Requested' },
      assigned: { status: 'processing', text: 'Assigned' },
      inProgress: { status: 'processing', text: 'In Progress' },
      completed: { status: 'success', text: 'Completed' },
      cancelled: { status: 'error', text: 'Cancelled' },
    };
    
    const { status: badgeStatus, text } = statusMap[status];
    return <Badge status={badgeStatus as any} text={text} />;
  };

  const tripColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <span className="font-mono text-xs">{id}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <span className="capitalize">{type}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Trip['status']) => getStatusBadge(status),
    },
    {
      title: 'Fare',
      dataIndex: 'fare',
      key: 'fare',
      render: (fare: number) => <span>${fare.toFixed(2)}</span>,
    },
    {
      title: 'Requested',
      dataIndex: 'requestTime',
      key: 'requestTime',
      render: (time: string) => format(new Date(time), 'MMM d, h:mm a'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Trip) => (
        <Button type="link" size="small">
          View
        </Button>
      ),
    },
  ];

  const pendingTrips = trips.filter(trip => 
    trip.status === 'requested' || trip.status === 'assigned'
  );

  const activeDrivers = drivers.filter(driver => driver.isOnline);
  const availableVehicles = vehicles.filter(vehicle => vehicle.isAvailable);
  
  // Mock data for statistics
  const dailyRevenue = 1250.75;
  const totalTrips = trips.length;
  const completionRate = 87;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <Select 
          defaultValue="today" 
          style={{ width: 120 }} 
          onChange={setTimeFilter}
        >
          <Option value="today">Today</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
        </Select>
      </div>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Daily Revenue"
              value={dailyRevenue}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarSign size={24} />}
              suffix=""
            />
            <div className="flex items-center text-green-500 mt-2">
              <TrendingUp size={14} className="mr-1" />
              <span>12% vs yesterday</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Completed Trips"
              value={totalTrips}
              valueStyle={{ color: '#1890ff' }}
              prefix={<Car size={24} />}
            />
            <div className="flex items-center text-green-500 mt-2">
              <TrendingUp size={14} className="mr-1" />
              <span>5 more than yesterday</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Active Drivers"
              value={activeDrivers.length}
              valueStyle={{ color: '#722ed1' }}
              prefix={<Users size={24} />}
            />
            <div className="flex items-center text-red-500 mt-2">
              <TrendingDown size={14} className="mr-1" />
              <span>2 fewer than usual</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Completion Rate"
              value={completionRate}
              suffix="%"
              valueStyle={{ color: completionRate > 80 ? '#3f8600' : '#cf1322' }}
              prefix={<AlertTriangle size={24} />}
            />
            <div className="flex items-center text-blue-500 mt-2">
              <span>Target: 90%</span>
            </div>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Live Fleet Management" 
            className="shadow-md"
            extra={<Button type="primary">View All</Button>}
          >
            <div className="h-[400px] bg-neutral-100 rounded-lg flex items-center justify-center relative">
              <div className="text-neutral-500">Map visualization goes here</div>
              
              {/* Mock vehicle positions */}
              {vehicles.slice(0, 5).map((vehicle, index) => (
                <div 
                  key={vehicle.id}
                  className="absolute"
                  style={{ 
                    left: `${15 + (index * 15)}%`, 
                    top: `${20 + (index * 10)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 border-white
                    ${vehicle.isAvailable ? 'bg-green-500' : 'bg-neutral-400'}
                  `}>
                    <Car size={16} className="text-white" />
                  </div>
                </div>
              ))}
              
              {/* Mock pickup/dropoff points */}
              {trips.slice(0, 3).map((trip, index) => (
                <div 
                  key={trip.id}
                  className="absolute"
                  style={{ 
                    left: `${60 + (index * 10)}%`, 
                    top: `${30 + (index * 15)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-red-500 border-2 border-white">
                    <MapPin size={12} className="text-white" />
                  </div>
                </div>
              ))}
              
              {/* Grid lines to simulate a map */}
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className="border border-neutral-200 opacity-40"></div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="space-x-4">
                <Badge status="success" text={`${availableVehicles.length} Available`} />
                <Badge status="default" text={`${vehicles.length - availableVehicles.length} Busy`} />
              </div>
              <div className="space-x-4">
                <Badge status="warning" text={`${pendingTrips.length} Pending Requests`} />
              </div>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card title="Activity Feed" className="shadow-md h-[500px] overflow-y-auto">
            <Tabs defaultActiveKey="requests">
              <TabPane tab="Requests" key="requests">
                <Table 
                  columns={tripColumns.filter(col => col.key !== 'action')} 
                  dataSource={pendingTrips}
                  rowKey="id"
                  size="small"
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="In Progress" key="inProgress">
                <Table 
                  columns={tripColumns.filter(col => col.key !== 'action')}
                  dataSource={trips.filter(trip => trip.status === 'inProgress')}
                  rowKey="id"
                  size="small"
                  pagination={false}
                />
              </TabPane>
              <TabPane tab="Completed" key="completed">
                <Table 
                  columns={tripColumns.filter(col => col.key !== 'action')}
                  dataSource={trips.filter(trip => trip.status === 'completed')}
                  rowKey="id"
                  size="small"
                  pagination={false}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;