import React from 'react';
import { Card, DatePicker, Input, TimePicker, Button, Form } from 'antd';
import { MapPin, Calendar, Clock } from 'lucide-react';

const TripPlanPage: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log('Trip plan submitted:', values);
    // Handle trip plan submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Plan Your Trip</h1>
        
        <Card className="shadow-lg rounded-lg">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="pickup"
                label="Pickup Location"
                rules={[{ required: true, message: 'Please enter pickup location' }]}
              >
                <Input 
                  size="large"
                  prefix={<MapPin className="w-5 h-5 text-gray-400" />}
                  placeholder="Enter pickup address"
                />
              </Form.Item>

              <Form.Item
                name="destination"
                label="Destination"
                rules={[{ required: true, message: 'Please enter destination' }]}
              >
                <Input 
                  size="large"
                  prefix={<MapPin className="w-5 h-5 text-gray-400" />}
                  placeholder="Enter destination address"
                />
              </Form.Item>

              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker 
                  size="large"
                  className="w-full"
                  prefix={<Calendar className="w-5 h-5 text-gray-400" />}
                />
              </Form.Item>

              <Form.Item
                name="time"
                label="Time"
                rules={[{ required: true, message: 'Please select time' }]}
              >
                <TimePicker 
                  size="large"
                  className="w-full"
                  prefix={<Clock className="w-5 h-5 text-gray-400" />}
                />
              </Form.Item>
            </div>

            <Form.Item
              name="notes"
              label="Additional Notes"
            >
              <Input.TextArea 
                rows={4}
                placeholder="Any special requirements or instructions?"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                size="large"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Schedule Trip
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default TripPlanPage;