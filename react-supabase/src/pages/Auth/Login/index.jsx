// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { Form, Input, Typography, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { supabase } from '../../../config/supabase';
import AuthLayout from '../../../Layout/AuthLayout';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsProcessing(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;
      
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
        <Title level={2} className="text-center mb-4">Login</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="email"
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
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Password" 
              size="large" 
            />
          </Form.Item>

          <Form.Item>
            <div className="d-flex justify-content-between mb-3">
              <Link to="/auth/forgot-password">Forgot password?</Link>
              <Link to="/auth/register">Create an account</Link>
            </div>
            
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isProcessing}
              icon={<MailOutlined />}
            >
              {isProcessing ? 'Logging in...' : 'Login with Email'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center my-3">OR</div>

        <Button
          block
          size="large"
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>
      </div>
    </AuthLayout>

  );
};

export default Login;



