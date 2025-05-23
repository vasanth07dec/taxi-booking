import React from 'react';
import { Card, Table, Tag, Button, Space } from 'antd';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { format } from 'date-fns';

const DriverWork: React.FC = () => {
  // Mock data for work history
  const workHistory = [
    {
      id: '1',
      date: new Date(),
      startTime: '09:00',
      endTime: '17:00',
      totalHours: 8,
      totalTrips: 12,
      earnings: 245.50,
      status: 'completed'
    },
    // Add more mock data as needed
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => format(date, 'MMM d, yyyy'),
    },
    {
      title: 'Time',
      key: 'time',
      render: (_: any, record: any) => (
        <Space>
          <Clock size={16} className="text-neutral-500" />
          {record.startTime} - {record.endTime}
        </Space>
      ),
    },
    {
      title: 'Hours',
      dataIndex: 'totalHours',
      key: 'totalHours',
    },
    {
      title: 'Trips',
      dataIndex: 'totalTrips',
      key: 'totalTrips',
    },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
      key: 'earnings',
      render: (earnings: number) => `$${earnings.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'success' : 'processing'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Work History</h2>
        <Button type="primary" size="large">
          Start Work
        </Button>
      </div>

      <Card className="shadow-md">
        <Table 
          columns={columns} 
          dataSource={workHistory}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default DriverWork;