import React, { useState } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { addCategory } from '../../api/categoryApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CategoryModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await addCategory(values.name);
      toast.success('Category added')
      setIsModalOpen(false);
      form.resetFields();
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button
        onClick={showModal}
        className="bg-yellow-500 hover:bg-[#003F62] text-black font-bold py-2 px-4 rounded-2xl transition-colors duration-300"
      >
        Add Category
      </Button>
      <Modal title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CategoryModal;
