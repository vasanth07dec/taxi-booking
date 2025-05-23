import React, { useEffect, useState } from 'react';
import { Table, Card, Button, Tag, Modal, Form, Input, Select, notification } from 'antd';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchVehicles, updateVehicleAvailability } from '../../store/slices/vehicleSlice';
import type { Vehicle } from '../../types';

const { Option } = Select;

const FleetManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vehicles, status } = useAppSelector((state) => state.vehicles);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // In a real app, we'd filter by the current owner's ID
    dispatch(fetchVehicles());
  }, [dispatch]);

  const handleAvailabilityToggle = (id: string, currentStatus: boolean) => {
    dispatch(updateVehicleAvailability({
      vehicleId: id,
      isAvailable: !currentStatus,
    }));
  };

  const showAddModal = () => {
    setEditingVehicle(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    form.setFieldsValue(vehicle);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        // In a real app, this would dispatch an action to save the vehicle
        notification.success({
          message: editingVehicle ? 'Vehicle Updated' : 'Vehicle Added',
          description: `${values.make} ${values.model} has been ${editingVehicle ? 'updated' : 'added'} successfully.`,
        });
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'premium' ? 'gold' : 'blue'}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Vehicle',
      dataIndex: 'make',
      key: 'vehicle',
      render: (_: string, record: Vehicle) => (
        <span>{record.make} {record.model} ({record.year})</span>
      ),
    },
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: string, record: Vehicle) => (
        <Tag color={record.isAvailable ? 'success' : 'default'}>
          {record.isAvailable ? 'Available' : 'Unavailable'}
        </Tag>
      ),
    },
    {
      title: 'Company Owned',
      key: 'isCompanyOwned',
      render: (_: string, record: Vehicle) => (
        <Tag color={record.isCompanyOwned ? 'processing' : 'default'}>
          {record.isCompanyOwned ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: Vehicle) => (
        <div className="flex space-x-2">
          <Button 
            type="text" 
            onClick={() => handleAvailabilityToggle(record.id, record.isAvailable)}
            className="flex items-center justify-center"
          >
            {record.isAvailable ? 'Set Unavailable' : 'Set Available'}
          </Button>
          
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => showEditModal(record)}
          />
          
          <Button
            danger
            type="text"
            icon={<Trash2 size={16} />}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fleet Management</h2>
        <Button 
          type="primary" 
          onClick={showAddModal}
          icon={<PlusCircle size={16} />}
        >
          Add Vehicle
        </Button>
      </div>
      
      <Card className="shadow-md">
        <Table 
          columns={columns} 
          dataSource={vehicles} 
          rowKey="id" 
          loading={status === 'loading'}
          pagination={{ pageSize: 10 }}
        />
      </Card>
      
      <Modal
        title={editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        okText={editingVehicle ? 'Save Changes' : 'Add Vehicle'}
      >
        <Form
          form={form}
          layout="vertical"
          name="vehicleForm"
          initialValues={{ type: 'standard', isCompanyOwned: true, isAvailable: true }}
        >
          <Form.Item
            name="type"
            label="Vehicle Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="standard">Standard</Option>
              <Option value="premium">Premium</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="make"
            label="Make"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="year"
            label="Year"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          
          <Form.Item
            name="licensePlate"
            label="License Plate"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="isCompanyOwned"
            label="Company Owned"
            valuePropName="checked"
          >
            <Select>
              <Option value={true}>Yes</Option>
              <Option value={false}>No</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="isAvailable"
            label="Availability"
            valuePropName="checked"
          >
            <Select>
              <Option value={true}>Available</Option>
              <Option value={false}>Unavailable</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FleetManagement;