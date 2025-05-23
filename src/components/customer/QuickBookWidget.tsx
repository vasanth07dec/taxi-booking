import React, { useState } from "react";
import {
  Card,
  Radio,
  Button,
  Input,
  Form,
  notification,
  Steps,
  DatePicker,
  TimePicker,
  InputNumber,
} from "antd";
import { MapPin, Navigation, Car, Clock, Calendar, Info } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { requestTrip } from "../../store/slices/tripSlice";
import type { Location } from "../../types";
import dayjs from "dayjs";

const { TextArea } = Input;

interface QuickBookWidgetProps {
  currentLocation?: Location;
}

const QuickBookWidget: React.FC<QuickBookWidgetProps> = ({
  currentLocation = { lat: 40.7128, lng: -74.006, address: "Current Location" },
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const standardPrice = 10; // Base price
  const premiumPrice = 18; // Base price for premium

  const handleSubmit = async (values: any) => {
    try {
      const pickup = currentLocation;
      const dropoff = {
        lat: currentLocation.lat + 0.02,
        lng: currentLocation.lng + 0.01,
        address: values.destination,
      };

      const basePrice =
        values.rideType === "standard" ? standardPrice : premiumPrice;
      const estimatedFare = basePrice + Math.floor(Math.random() * 20);

      await dispatch(
        requestTrip({
          customerId: "1",
          type: values.rideType,
          pickup,
          dropoff,
          fare: estimatedFare,
          distance: 3.5,
          duration: 12,
          paymentMethod: "cash",
        })
      ).unwrap();

      notification.success({
        message: "Ride Requested",
        description: "Looking for drivers in your area...",
      });
    } catch (error) {
      notification.error({
        message: "Request Failed",
        description: "Could not request a ride. Please try again.",
      });
    }
  };

  const steps = [
    {
      title: "Location",
      content: (
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <MapPin size={18} className="text-neutral-500 mr-2" />
            <span className="text-neutral-700 font-medium">
              Pickup Location
            </span>
          </div>
          <Form.Item
            name="pickup"
            initialValue={currentLocation.address}
            rules={[
              { required: true, message: "Please enter pickup location" },
            ]}
          >
            <Input
              prefix={<MapPin size={16} className="text-neutral-500" />}
              placeholder="Enter pickup address"
              className="rounded-lg py-2"
            />
          </Form.Item>

          <Form.Item
            name="destination"
            rules={[
              { required: true, message: "Please enter your destination" },
            ]}
          >
            <Input
              prefix={<Navigation size={16} className="text-neutral-500" />}
              placeholder="Where to?"
              className="rounded-lg py-2"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Details",
      content: (
        <div className="space-y-4">
          <Form.Item
            name="pickupTime"
            label="Pickup Time"
            rules={[{ required: true, message: "Please select pickup time" }]}
          >
            <Radio.Group className="w-full">
              <div className="grid grid-cols-1 gap-3">
                <Radio value="now" className="border p-3 rounded-lg">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>Pickup now</span>
                  </div>
                </Radio>
                <Radio value="schedule" className="border p-3 rounded-lg">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span>Schedule for later</span>
                  </div>
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.pickupTime !== currentValues.pickupTime
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("pickupTime") === "schedule" ? (
                <div className="space-y-4">
                  <Form.Item
                    name="scheduledDate"
                    rules={[{ required: true, message: "Please select date" }]}
                  >
                    <DatePicker
                      className="w-full"
                      disabledDate={(date) => date.isBefore(dayjs(), "day")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="scheduledTime"
                    rules={[{ required: true, message: "Please select time" }]}
                  >
                    <TimePicker
                      className="w-full"
                      format="HH:mm"
                      minuteStep={15}
                    />
                  </Form.Item>
                </div>
              ) : null
            }
          </Form.Item>

          <Form.Item
            name="passengers"
            label="Number of Passengers"
            rules={[
              { required: true, message: "Please select number of passengers" },
            ]}
          >
            <InputNumber min={1} max={6} className="w-full" />
          </Form.Item>

          <Form.Item name="notes" label="Additional Notes">
            <TextArea
              placeholder="Any special requirements? (Optional)"
              rows={3}
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Vehicle",
      content: (
        <div className="space-y-4">
          <Form.Item
            name="rideType"
            rules={[{ required: true, message: "Please select a ride type" }]}
          >
            <Radio.Group className="w-full">
              <div className="grid grid-cols-1 gap-4">
                <Radio value="standard" className="w-full">
                  <Card className="w-full cursor-pointer hover:border-primary-500 transition-colors">
                    <div className="flex items-center">
                      <Car size={24} className="mr-4" />
                      <div>
                        <div className="font-medium">Standard</div>
                        <div className="text-sm text-neutral-500">
                          <span className="font-semibold text-neutral-700">
                            ${standardPrice}
                          </span>{" "}
                          base fare
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                          Comfortable rides, everyday prices
                        </div>
                      </div>
                    </div>
                  </Card>
                </Radio>

                <Radio value="premium" className="w-full">
                  <Card className="w-full cursor-pointer hover:border-primary-500 transition-colors">
                    <div className="flex items-center">
                      <Car size={24} className="mr-4" />
                      <div>
                        <div className="font-medium">Premium</div>
                        <div className="text-sm text-neutral-500">
                          <span className="font-semibold text-neutral-700">
                            ${premiumPrice}
                          </span>{" "}
                          base fare
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                          Luxury vehicles with top-rated drivers
                        </div>
                      </div>
                    </div>
                  </Card>
                </Radio>
              </div>
            </Radio.Group>
          </Form.Item>

          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="flex items-start">
              <Info size={16} className="text-neutral-500 mr-2 mt-1" />
              <div className="text-sm text-neutral-600">
                <p className="font-medium mb-1">Recommended for your trip:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Standard: Perfect for 1-4 passengers with regular luggage
                  </li>
                  <li>
                    Premium: Ideal for special occasions or business travel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      // Form validation failed
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Card
      className="w-full shadow-lg rounded-xl border-0"
      title={
        <Steps
          current={currentStep}
          items={steps.map((item) => ({ title: item.title }))}
          size="small"
          className="mb-4"
        />
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        className="mt-4"
      >
        {steps[currentStep].content}

        <div className="flex justify-between mt-8">
          {currentStep > 0 && <Button onClick={prev}>Previous</Button>}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Request Ride
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default QuickBookWidget;
