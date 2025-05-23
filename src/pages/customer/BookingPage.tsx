import React from "react";
import { Row, Col } from "antd";
import QuickBookWidget from "../../components/customer/QuickBookWidget";
import LiveDriverMap from "../../components/customer/LiveDriverMap";

const BookingPage: React.FC = () => {
  // Mock user location - in a real app, this would come from geolocation
  const userLocation = {
    lat: 40.7128,
    lng: -74.006,
    address: "123 Broadway, New York, NY",
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <QuickBookWidget currentLocation={userLocation} />
        </Col>
        <Col xs={24} lg={16}>
          <LiveDriverMap userLocation={userLocation} />
        </Col>
      </Row>
    </div>
  );
};

export default BookingPage;
