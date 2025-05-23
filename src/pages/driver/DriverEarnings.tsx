import React from 'react';
import { Card, Table, DatePicker, Space, Typography, Statistic } from 'antd';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const DriverEarnings: React.FC = () => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Trips',
      dataIndex: 'trips',
      key: 'trips',
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Earnings',
      dataIndex: 'earnings',
      key: 'earnings',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
  ];

  // Sample data - in production this would come from your backend
  const data = [
    {
      key: '1',
      date: '2025-01-20',
      trips: 12,
      hours: 8,
      earnings: 245.50,
    },
    {
      key: '2',
      date: '2025-01-19',
      trips: 10,
      hours: 7,
      earnings: 198.75,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Title level={2}>Earnings Dashboard</Title>
        <Space>
          <RangePicker className="w-64" />
        </Space>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Statistic
            title="Today's Earnings"
            value={245.50}
            precision={2}
            prefix={<DollarSign className="inline-block" size={20} />}
          />
        </Card>
        <Card>
          <Statistic
            title="Weekly Average"
            value={221.75}
            precision={2}
            prefix={<TrendingUp className="inline-block" size={20} />}
          />
        </Card>
        <Card>
          <Statistic
            title="Hours This Week"
            value={38}
            suffix="hrs"
            prefix={<Calendar className="inline-block" size={20} />}
          />
        </Card>
      </div>

      <Card title="Earnings History">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default DriverEarnings;