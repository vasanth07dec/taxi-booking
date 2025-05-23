import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Divider, notification } from 'antd';
import { CarTaxiFront as Taxi, Mail, Lock } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await dispatch(login(values)).unwrap();
      
      notification.success({
        message: 'Login Successful',
        description: `Welcome back, ${result.user.name}!`,
      });
      
      // Navigate based on user role
      const roleRoutes = {
        customer: '/',
        driver: '/dashboard',
        owner: '/dashboard',
        admin: '/admin',
      };
      
      navigate(roleRoutes[result.user.role]);
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-50">
      <Card className="w-full max-w-md shadow-lg rounded-xl border-0">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Taxi size={40} className="text-primary-500" />
          </div>
          <Title level={3}>Welcome to TaxiGo</Title>
          <Text type="secondary">Sign in to your account</Text>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input 
              prefix={<Mail size={16} className="text-neutral-400 mr-2" />} 
              placeholder="Email"
              className="rounded-lg py-2"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password 
              prefix={<Lock size={16} className="text-neutral-400 mr-2" />} 
              placeholder="Password"
              className="rounded-lg py-2"
            />
          </Form.Item>
          
          <div className="flex justify-between items-center mb-4">
            <Text className="cursor-pointer text-primary-500 hover:text-primary-600">
              Forgot password?
            </Text>
          </div>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
              className="h-12 text-base font-medium"
            >
              Sign In
            </Button>
          </Form.Item>
          
          <div className="mt-4 text-center">
            <Text type="secondary">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-600">
                Create one
              </Link>
            </Text>
          </div>
          
          <Divider plain>Or sign in as</Divider>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button 
              block 
              className="text-left pl-4" 
              onClick={() => onFinish({ email: 'customer@example.com', password: 'password' })}
            >
              Customer Demo
            </Button>
            <Button 
              block 
              className="text-left pl-4" 
              onClick={() => onFinish({ email: 'driver@example.com', password: 'password' })}
            >
              Driver Demo
            </Button>
            <Button 
              block 
              className="text-left pl-4" 
              onClick={() => onFinish({ email: 'owner@example.com', password: 'password' })}
            >
              Owner Demo
            </Button>
            <Button 
              block 
              className="text-left pl-4" 
              onClick={() => onFinish({ email: 'admin@example.com', password: 'password' })}
            >
              Admin Demo
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;