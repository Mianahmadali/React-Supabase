import React, { useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { supabase } from '../../../config/supabase';


const { Title } = Typography;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (values) => {
    const { email } = values;
    setIsProcessing(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsProcessing(false);

    if (error) {
      return window.notify(error.message, 'error');
    }

    window.notify('Password reset link sent to your email.', 'success');
  };

  return (
    <main className="forgot-password p-3 p-lg-4">
      <div className="card p-3 p-lg-4">
        <Title className="text-primary text-center mb-4">Forgot Password</Title>

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input size="large" placeholder="Enter your Email" />
          </Form.Item>

          <Button
            block
            size="large"
            type="primary"
            htmlType="submit"
            loading={isProcessing}
          >
            {isProcessing ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <div className="text-center mt-3">
            <Link to="/auth/login">Back to Login</Link>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default ForgotPassword;
