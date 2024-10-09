import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { DashboardOutlined, FileAddOutlined, UsergroupAddOutlined, ShopOutlined, SettingOutlined, PoweroffOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../Apis/authApi';
import { hideLoading, logout, showLoading } from '../../features/Slices/userSlice';
import { auth } from '../../firebase';
import { setResetInvoiceSlice } from '../../features/Slices/invoiceSlice';

export default function SideBar() {
  const {loading, error, message:responseMessage } = useSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  // Handle Modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle Logout action
  const handleOk = async () => {
    try {
      dispatch(showLoading());
      const response = await authApi.logoutUser();
      const data = response.data;
      if (data.success) {
        message.success(data.message);
        dispatch(logout());
        dispatch(setResetInvoiceSlice());
        setIsModalVisible(false);
      }
      else {
        auth.signOut();
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      dispatch(hideLoading());
      setIsModalVisible(false);
    }
  };

  // Handle Cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  

  return (
    <aside className="w-[15vw] h-full bg-[#03034A] rounded-xl p-4 text-white md:flex flex-col hidden">
      <span className="flex gap-2 items-center mb-10">
        <img src={logo} alt="logo" className='h-4 invert' />
        <h1 className='text-lg font-semibold'>Invocify</h1>
      </span>

      <section className='flex flex-col gap-2 text-sm flex-grow'>
        <NavLink to="" ></NavLink>
        <NavLink to="dashboard" className={({ isActive }) => isActive ? 'bg-indigo-400 p-2 rounded-md' : 'p-2 rounded-md'}>
          <Space><DashboardOutlined /> Dashboard</Space>
        </NavLink>

        <NavLink to="create-invoice" className={({ isActive }) => isActive ? 'bg-indigo-400 p-2 rounded-md' : 'p-2 rounded-md'}>
          <Space><FileAddOutlined /> Create Invoice</Space>
        </NavLink>

        <NavLink to="my-clients" className={({ isActive }) => isActive ? 'bg-indigo-400 p-2 rounded-md' : 'p-2 rounded-md'}>
          <Space><UsergroupAddOutlined /> Client Profiles</Space>
        </NavLink>

        <NavLink to="my-stores" className={({ isActive }) => isActive ? 'bg-indigo-400 p-2 rounded-md' : 'p-2 rounded-md'}>
          <Space><ShopOutlined /> My Outlets</Space>
        </NavLink>
        <NavLink to="all-invoices" className={({ isActive }) => isActive ? 'bg-indigo-400 p-2 rounded-md' : 'p-2 rounded-md'}>
          <Space><FileTextOutlined /> Get Invoices</Space>
        </NavLink>
        
      </section>

      <footer className='text-sm bg-white text-black flex flex-col rounded-md p-2'>
        <NavLink to="profile" className={({ isActive }) => isActive ? 'bg-indigo-400 p-2 rounded-md' : 'p-2 rounded-md'}>
          <Space><SettingOutlined /> Profile</Space></NavLink>

        <Button
          className='p-2 hover:text-red-500 hover:font-semibold'
          type='none'
          icon={<PoweroffOutlined />}
          style={{ justifyContent: 'flex-start' }} block
          onClick={showModal}>
          Logout
        </Button>

        <Modal
          title={<div className='w-full text-center text-xl'>Are you leaving?</div>}
          open={isModalVisible}
          width={400}
          footer={null}
          closable={false}
        >
          <p className='w-full text-center'>Are you sure you want to log out?</p>
          <div className='flex justify-center mt-4'>
            <Button key="back" onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
            <Button key="submit" type="primary" onClick={handleOk} danger loading={loading}>
              Logout
            </Button>
          </div>
        </Modal>
      </footer>
    </aside>
  );
}
