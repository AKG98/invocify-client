import { Avatar, Button, Dropdown, message, Space, Modal } from "antd";
import { PauseOutlined, UserOutlined } from "@ant-design/icons";
import { FileTextOutlined,DashboardOutlined, AppstoreAddOutlined, UsergroupAddOutlined, ShopOutlined, SettingOutlined, PoweroffOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../Apis/authApi";
import { hideLoading, logout, showLoading } from "../../features/Slices/userSlice";
import { auth } from "../../firebase";
import { setResetInvoiceSlice } from "../../features/Slices/invoiceSlice";



export default function FloatingMenu() {
  const { loading, user } = useSelector((state) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initials, setInitials] = useState(null);
  const dispatch = useDispatch();

  // Get Initials
  const getInitials = (name) => {
    const namesArray = name.split(' ');
    const initials = namesArray.map(n => n.charAt(0).toUpperCase()).slice(0, 2).join('');
    return initials;
  };

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
      } else {
        auth.signOut();
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
      setIsModalVisible(false);
    }
  };

  // Handle Cancel action
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if(user){
      const init = getInitials(user.name);

      setInitials(init);
    }
  }, [user]);

  const items = [
    {
      key: '1',
      label:
        <span className="mr-2 text-lg">
          <DashboardOutlined className="mr-2" />
          <NavLink to="dashboard">Dashboard</NavLink>
        </span>,
    },
    {
      key: '2',
      label:
        <span className="mr-2 text-lg">
          <AppstoreAddOutlined className="mr-2" /> 
          <NavLink to="create-invoice">Create Invoice</NavLink>
        </span>,
    },
    {
      key: '3',
      label:
        <span className="mr-2 text-lg">
          <UsergroupAddOutlined className="mr-2" /> 
          <NavLink to="my-clients">My Clients</NavLink>
        </span>,
    },
    {
      key: '4',
      label:
        <span className="mr-2 text-lg">
          <ShopOutlined className="mr-2" /> 
          <NavLink to="my-stores">My Stores</NavLink>
        </span>,
    },
    {
      key: '5',
      label:
        <span className="mr-2 text-lg">
          <FileTextOutlined className="mr-2" /> 
          <NavLink to="all-invoices">All Invoices</NavLink>
        </span>,
    },
    
    {
      type: 'divider',
    },
    {
      key: '6',
      label:
        <span className="mr-2 text-lg">
          <SettingOutlined className="mr-2" /> 
          <NavLink to="profile">Profile</NavLink>
        </span>,
    },
    {
      key: '7',
      label:
        <span className="mr-2 text-lg">
          <PoweroffOutlined className="mr-2" /> Logout
        </span>,
      onClick: showModal,
      danger: true,
    },
  ];



  return (
    <nav className="floating-menu w-full flex md:flex-row flex-row-reverse justify-between items-center border-b p-2">
      {/* Dropdown Menu */}
      <span >
        <Dropdown
          className="md:hidden "
          trigger={['click']}
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <PauseOutlined rotate={90} className="text-2xl" />
            </Space>
          </a>
        </Dropdown>
      </span>

      {/* Avatar */}
      <span>
        <Avatar
          size={45}
          src={user.picture || null}
        >
          {user.picture ? null : initials || <UserOutlined />}
        </Avatar>
      </span>

      {/* Logout Modal */}
      <Modal
        title={<div className="w-full text-center text-xl">Are you leaving?</div>}
        open={isModalVisible}
        width={400}
        footer={null}
        closable={false}
      >
        <p className="w-full text-center">Are you sure you want to log out?</p>
        <div className="flex justify-center mt-4">
          <Button key="back" onClick={handleCancel} className="mr-2">
            Cancel
          </Button>
          <Button key="submit" type="primary" onClick={handleOk} danger loading={loading}>
            Logout
          </Button>
        </div>
      </Modal>
    </nav>
  );
}
