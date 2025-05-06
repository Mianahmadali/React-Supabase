// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { Form, Input, Typography, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOutlined, UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { supabase } from '../../../config/supabase';
import AuthLayout from '../../../Layout/AuthLayout';

const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      
      message.success('Registration successful! Please check your email for verification.');
      navigate('/auth/login');
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <Title level={2} className="text-center mb-4">Create Account</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="First Name" 
                  size="large" 
                />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Last Name" 
                  size="large" 
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
            hasFeedback
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large" 
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords do not match!');
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Confirm Password" 
              size="large" 
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isProcessing}
            >
              {isProcessing ? 'Registering...' : 'Create Account'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center my-3">OR</div>

        <Button
          block
          size="large"
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignUp}
        >
          Continue with Google
        </Button>

        <div className="text-center mt-3">
          Already have an account? <Link to="/auth/login">Login</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;


