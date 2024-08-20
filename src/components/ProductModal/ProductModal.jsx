import React, { useEffect, useState } from 'react';
import { Modal, Input, Form, message, Button, InputNumber, Select } from 'antd';
import { addProduct } from '../../api/productApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { getProducts } from '../../api/productApi';
import { setProducts } from '../../redux/productSlice';
import { getCategory } from '../../api/categoryApi';
const { Option } = Select;


const ProductModal = () => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([])
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen1(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (imgs.length === 0) {
        message.error('Please upload at least one image.');
        return;
      }
      values.images = imgs;
      setLoading(true);

      const res = await addProduct(values);
      if (res.status === 200) {
        const response = await getProducts();
        dispatch(
          setProducts({
            products: response?.data,
          })
        );
        toast.success('Product added successfully!');
      } else {
        toast.error('Failed to add product.');
      }
      setIsModalOpen1(false);
      form.resetFields();
      setImgs([]);
    } catch (info) {
      console.log('Validate Failed:', info);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
    form.resetFields();
    setImgs([]);
  };

  const handleImgChange = (e) => {
    const selectedFiles = e.target.files;
    setImgToBase(selectedFiles);
  };

  const setImgToBase = (files) => {
    const imgArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        imgArray.push(reader.result);
        if (imgArray.length === files.length) {
          setImgs(imgArray);
        }
      };
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategory()
      setCategories(response.data.data)
    }
    fetchCategories()
  }, [])

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="bg-yellow-500 hover:bg-[#003F62] text-black font-bold py-2 px-4 rounded-2xl transition-colors duration-300"
      >
        Add Product
      </Button>
      <Modal
        title="Add Product"
        open={isModalOpen1}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        className="modal-custom"
        centered
        width={800}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} loading={loading} disabled={loading}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input className="input-custom" />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: 'Please input the brand!' }]}
          >
            <Input className="input-custom" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber className="input-custom w-full" min={0} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select className="input-custom">
              {categories.map((category) => (
                <Option key={category._id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea className="input-custom" />
          </Form.Item>
          <Form.Item label="Images">
            <input
              type='file'
              className='file-input file-input-bordered file-input-info w-full max-w-xs rounded-lg border border-gray-300 py-2 px-3'
              onChange={handleImgChange}
              multiple
              required
            />
            <div className="flex flex-wrap mt-4">
              {imgs.map((image, index) => (
                <div key={index} className="m-2 w-24 h-24">
                  <img
                    src={image}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductModal;
