import React from 'react';
import { Layout, Form, Input, Button, Select, DatePicker, Typography, message } from 'antd';
import { supabase } from '../../../config/supabase';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function CreateTodo() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    const { subject, priority, text, image, due_date } = values;

    const { data: { user } } = await supabase.auth.getUser();
    const uid = user?.id;

    if (!uid) {
      message.error("User not logged in.");
      return;
    }

    const { error } = await supabase.from('todos').insert({
      uid,
      subject,
      priority,
      text,
      image,
      due_date: due_date.format('YYYY-MM-DD'),
    });

    if (error) {
      message.error(`Failed to create todo: ${error.message}`);
    } else {
      message.success("Todo created successfully!");
    }

    setLoading(false);
  };

  return (
    <Layout style={{ padding: '20px' }}>
      <Content>
        <Title level={2}>Create New Todo</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
            <Input placeholder="e.g. Buy groceries" />
          </Form.Item>

          <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
            <Select placeholder="Select priority">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>

          <Form.Item name="text" label="Description" rules={[{ required: true }]}>
            <TextArea rows={4} placeholder="Detailed description..." />
          </Form.Item>

          <Form.Item name="image" label="Image URL">
            <Input placeholder="https://example.com/image.jpg" />
          </Form.Item>

          <Form.Item name="due_date" label="Due Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} disabledDate={d => d.isBefore(dayjs(), 'day')} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Todo
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
