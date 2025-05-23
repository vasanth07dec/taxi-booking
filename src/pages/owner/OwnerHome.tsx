import React from 'react';
import { Tabs } from 'antd';
import FleetManagement from '../../components/owner/FleetManagement';
import DriverDashboard from '../../components/driver/DriverDashboard';

const { TabPane } = Tabs;

const OwnerHome: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Tabs defaultActiveKey="dashboard" size="large">
        <TabPane tab="Dashboard" key="dashboard">
          <DriverDashboard />
        </TabPane>
        <TabPane tab="Fleet Management" key="fleet">
          <FleetManagement />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default OwnerHome;