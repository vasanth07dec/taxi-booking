import React from 'react';
import { Card, Row, Col, Statistic, Table, Button, Tag, Badge, Progress } from 'antd';
import { 
  TrendingUp, TrendingDown, DollarSign, Car, Users, 
  Clock, AlertTriangle, BarChart3 
} from 'lucide-react';
import { format } from 'date-fns';

const OwnerDashboard: React.FC = () => {
  // Mock data for fleet overview
  const fleetStats = {
    totalRevenue: 12580.50,
    activeVehicles: 15,
    totalDrivers: 18,
    completionRate: 92,
    weeklyGrowth: 8.5,
    averageRating: 4.8
  };

  // Mock data for recent trips
  const recentTrips = [
    {
      id: '1',
      driver: 'John Smith',
      vehicle: 'Toyota Camry',
      fare: 35.50,
      time: new Date(),
      status: 'completed',
      rating: 5
    },
    {
      id: '2',
      driver: 'Sarah Johnson',
      vehicle: 'Honda Accord',
      fare: 28.75,
      time: new Date(),
      status: 'inProgress',
      rating: null
    }
  ];

  const tripColumns = [
    {
      title: 'Driver',
      dataIndex: 'driver',
      key: 'driver',
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
    },
    {
      title: 'Fare',
      dataIndex: 'fare',
      key: 'fare',
      render: (fare: number) => `$${fare.toFixed(2)}`,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (time: Date) => format(time, 'MMM d, h:mm a'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'success' : 'processing'}>
          {status === 'completed' ? 'Completed' : 'In Progress'}
        </Tag>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number | null) => 
        rating ? `${rating} ★` : '-',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fleet Overview</h2>
        <Button type="primary" icon={<BarChart3 size={16} />}>
          View Detailed Reports
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Total Revenue"
              value={fleetStats.totalRevenue}
              precision={2}
              prefix={<DollarSign size={20} className="text-primary-500" />}
              suffix=""
            />
            <div className="flex items-center text-success-500 mt-2">
              <TrendingUp size={14} className="mr-1" />
              <span>{fleetStats.weeklyGrowth}% vs last week</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Active Vehicles"
              value={fleetStats.activeVehicles}
              prefix={<Car size={20} className="text-warning-500" />}
            />
            <div className="flex items-center text-neutral-500 mt-2">
              <Badge status="success" text={`${fleetStats.activeVehicles} of ${fleetStats.totalDrivers} vehicles online`} />
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Total Drivers"
              value={fleetStats.totalDrivers}
              prefix={<Users size={20} className="text-info-500" />}
            />
            <div className="flex items-center text-success-500 mt-2">
              <TrendingUp size={14} className="mr-1" />
              <span>2 new this week</span>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="h-full">
            <Statistic
              title="Completion Rate"
              value={fleetStats.completionRate}
              suffix="%"
              prefix={<AlertTriangle size={20} className="text-success-500" />}
            />
            <Progress 
              percent={fleetStats.completionRate} 
              size="small" 
              status="active"
              className="mt-2"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>Recent Trips</span>
              </div>
            }
            className="shadow-md"
          >
            <Table 
              columns={tripColumns}
              dataSource={recentTrips}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex items-center">
                <BarChart3 size={18} className="mr-2" />
                <span>Performance Overview</span>
              </div>
            }
            className="shadow-md"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Average Rating</span>
                  <span className="font-semibold">{fleetStats.averageRating} ★</span>
                </div>
                <Progress 
                  percent={fleetStats.averageRating * 20} 
                  status="active"
                  strokeColor="#faad14"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Vehicle Utilization</span>
                  <span className="font-semibold">83%</span>
                </div>
                <Progress percent={83} status="active" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Driver Availability</span>
                  <span className="font-semibold">78%</span>
                </div>
                <Progress percent={78} status="active" strokeColor="#52c41a" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OwnerDashboard;