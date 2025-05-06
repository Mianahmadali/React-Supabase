import React, { useEffect, useState } from 'react';
import { Table, Layout, Typography, Tag } from 'antd';
import { supabase } from '../../../config/supabase';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Title } = Typography;

export default function TodoTable() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from('todos').select('*');

    if (error) {
      console.error('❌ Error fetching todos:', error.message);
    } else {
      console.log('✅ Fetched todos:', data);
      setTodos(data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const columns = [
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'green'}>
          {priority}
        </Tag>
      ),
    },
    { title: 'Text', dataIndex: 'text', key: 'text' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url) =>
        url ? <img src={url} alt="todo" width="50" style={{ borderRadius: 4 }} /> : 'No Image',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => (value ? dayjs(value).format('YYYY-MM-DD HH:mm') : 'N/A'),
    },
    { title: 'Due Date', dataIndex: 'due_date', key: 'due_date' },
  ];

  return (
    <Layout style={{ padding: '20px' }}>
      <Content>
        <Title level={2}>Todo List</Title>
        <Table columns={columns} dataSource={todos} rowKey="id" />
      </Content>
    </Layout>
  );
}
