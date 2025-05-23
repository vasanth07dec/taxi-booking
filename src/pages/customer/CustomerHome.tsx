import React from "react";
import { Row, Col } from "antd";
import QuickBookWidget from "../../components/customer/QuickBookWidget";
import LiveDriverMap from "../../components/customer/LiveDriverMap";
import TripHistoryList from "../../components/customer/TripHistoryList";

const CustomerHome: React.FC = () => {
  // Mock user location
  const userLocation = { lat: 40.7128, lng: -74.006 };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <QuickBookWidget currentLocation={userLocation} />
        </Col>
        <Col xs={24} lg={16}>
          {/* <LiveDriverMap userLocation={userLocation} /> */}
        </Col>
        <Col xs={24}>
          <TripHistoryList />
        </Col>
      </Row>
    </div>
  );
};

export default CustomerHome;
