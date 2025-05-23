import React from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { CarTaxiFront as Taxi, Clock, Shield, CreditCard, MapPin, Star } from 'lucide-react';

const { Title, Paragraph } = Typography;

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-500 text-white py-24">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Title level={1} className="text-white text-4xl md:text-5xl font-bold mb-6">
              Your ride, your way. Anytime, anywhere.
            </Title>
            <Paragraph className="text-lg mb-8 text-white opacity-90">
              Book premium taxis with experienced drivers. Quick, reliable, and safe journeys for all your transportation needs.
            </Paragraph>
            <div className="flex flex-wrap gap-4">
              <Button 
                type="primary" 
                size="large" 
                className="bg-white text-primary-600 border-white hover:bg-primary-50 hover:text-primary-700 h-12 px-8"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button 
                ghost 
                size="large" 
                className="border-white text-white hover:bg-white hover:text-primary-600 h-12 px-8"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative bg-white p-6 rounded-2xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Taxi Service" 
                className="rounded-lg object-cover h-80 w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-warning-500 text-white p-4 rounded-lg shadow-lg">
                <Title level={4} className="text-white m-0">
                  Premium Service
                </Title>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" fill="none">
            <path fill="#fff" fillOpacity="1" d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,58.7C1120,64,1280,64,1440,53.3L1440,80L0,80Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-16">
            <Title level={2} className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose TaxiGo?
            </Title>
            <Paragraph className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We prioritize safety, convenience, and reliability. Our service is designed with your needs in mind.
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md rounded-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-600 mb-6">
                    <Clock size={32} />
                  </div>
                  <Title level={3} className="text-xl mb-4">
                    On-Time Pickups
                  </Title>
                  <Paragraph className="text-neutral-600">
                    We value your time. Our drivers arrive punctually, ensuring you reach your destination without delays.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md rounded-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-600 mb-6">
                    <Shield size={32} />
                  </div>
                  <Title level={3} className="text-xl mb-4">
                    Safety First
                  </Title>
                  <Paragraph className="text-neutral-600">
                    All our drivers undergo rigorous background checks and our vehicles are regularly inspected.
                  </Paragraph>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={8}>
              <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md rounded-xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-warning-50 text-warning-600 mb-6">
                    <CreditCard size={32} />
                  </div>
                  <Title level={3} className="text-xl mb-4">
                    Flexible Payments
                  </Title>
                  <Paragraph className="text-neutral-600">
                    Pay your way – cash, card, or digital wallets. Transparent pricing with no hidden fees.
                  </Paragraph>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      
      {/* App Preview Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <div className="mb-8">
                <Title level={2} className="text-3xl md:text-4xl font-bold mb-4">
                  Seamless Booking Experience
                </Title>
                <Paragraph className="text-lg text-neutral-600 mb-6">
                  Our intuitive app makes it easy to book and track your rides. See nearby drivers, estimated prices, and arrival times in real-time.
                </Paragraph>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="text-primary-500 mt-1 mr-3" size={20} />
                    <div>
                      <div className="font-semibold">Real-time tracking</div>
                      <div className="text-neutral-600">Follow your driver's journey to your location</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Star className="text-primary-500 mt-1 mr-3" size={20} />
                    <div>
                      <div className="font-semibold">Premium vehicles</div>
                      <div className="text-neutral-600">Choose between standard and premium cars</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CreditCard className="text-primary-500 mt-1 mr-3" size={20} />
                    <div>
                      <div className="font-semibold">Transparent pricing</div>
                      <div className="text-neutral-600">Know your fare upfront with no surprises</div>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <Button 
                    type="primary" 
                    size="large" 
                    className="h-12 px-8"
                  >
                    <Link to="/signup">Try It Now</Link>
                  </Button>
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <div className="relative">
                <div className="bg-white rounded-xl shadow-xl p-4 transform rotate-2">
                  <img 
                    src="https://images.pexels.com/photos/6794938/pexels-photo-6794938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Taxi App Preview" 
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 bg-primary-500 text-white p-6 rounded-xl shadow-lg transform -rotate-3">
                  <div className="flex items-center">
                    <Taxi size={24} className="mr-3" />
                    <div>
                      <div className="text-lg font-bold">Book Now</div>
                      <div className="text-sm opacity-90">Fast & Reliable</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl py-16 px-8 text-white text-center">
            <Title level={2} className="text-white text-3xl md:text-4xl font-bold mb-4">
              Ready to experience the best taxi service?
            </Title>
            <Paragraph className="text-lg mb-8 text-white opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who rely on TaxiGo for their daily commute and special occasions.
            </Paragraph>
            <Button 
              type="primary" 
              size="large" 
              className="bg-white text-primary-600 border-white hover:bg-primary-50 hover:text-primary-700 h-12 px-10"
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;