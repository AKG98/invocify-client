import { useSelector } from "react-redux";
import { useDeleteStoreMutation, useGetStoresQuery } from "../../features/Slices/storesApi";
import { Button, Table, AutoComplete, Space, Modal, message, Spin } from "antd";
import { ShopOutlined, ArrowRightOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import StoreModal from "./StoreModal";
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";

export default function Stores() {
  const ownerId = useSelector((state) => state.user.user._id);
  const { data, error, isLoading } = useGetStoresQuery(ownerId);
  const [isModal, setIsModal] = useState(false);
  const [formType, setFormType] = useState("");
  const [modData, setModData] = useState({});
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  // Delete Api from the storesApi
  const [deleteStore] = useDeleteStoreMutation();

  // @Function to fetch stores
  async function fetchingStores(data, setSelectOptions) {
    try {
      if (data && data.length > 0) {
        const options = data.map((store, index) => ({ value: store.name, key: index }));
        setSelectOptions(options); 
      } 
    } catch (error) {
      console.error("Failed to fetch stores:", error);
    }
  }
  
  useEffect(() => {
    async function fetchData() {
      await fetchingStores(data, setSelectOptions);
    }
  
    fetchData();
  }, [data, setSelectOptions]); // Include setSelectOptions in the dependency array

  const handleSelect = (value) => {
    if (!value) {
      setSelectedStore(null);
    } else {
      const selectedStore = data.find((store) => store.name === value);
      setSelectedStore(selectedStore);
    }
  };

  // @Function to handle editing a store
  const handleEditStore = (record) => {
    setFormType("Edit Store");
    setModData(record); // Set the selected store for editing
    setIsModal(true);
  };

  // @Function to handle deleting a store
  const handleDeleteStore = (storeId) => {
    Modal.confirm({
      centered: true,
      title: "Are you sure?",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      content: "This action cannot be reversed",
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await deleteStore(storeId).unwrap();
          message.success("Store deleted successfully");
        } catch (error) {
          message.error("Failed to delete store:", error);
        }
      },
      onCancel: () => {
        console.log("Delete canceled");
      },
    });
  };

  // @Function to handle adding a new store
  const handleAddStore = () => {
    setFormType("Create Store");
    setSelectedStore(null); // Clear selected store for creating a new store
    setIsModal(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Gst',
      dataIndex: 'gst',
      key: 'gst',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditFilled />} 
            style={{ color: 'steelblue' }} 
            onClick={() => handleEditStore(record)} // Corrected to pass the record to handleEditStore
          />
          <Button type="text" danger icon={<DeleteFilled />} onClick={() => handleDeleteStore(record._id)} /> {/* Use store ID */}
        </Space>
      ),
    },
  ];

  // Handle loading state
  if(isLoading) return <div><Spinner isActive={isLoading}/></div>;

  return (
    <main className="w-full p-2">
      <header className='mb-5'>
        <span>
          <ShopOutlined className="text-4xl mr-2" />
        </span>
        <span>
          <span className="text-3xl font-semibold">My Outlets</span>
          <p className="text-sm">Manage all business details owned by you.</p>
        </span>
      </header>
      <section className='flex md:flex-row flex-col gap-2 md:items-end mb-5'>
        <span className='w-full'>
          <label className='text-xs'>Search store</label>
          <AutoComplete
            allowClear
            size={window.innerWidth < 800 ? 'large' : ''}
            className='w-full'
            options={selectOptions}
            placeholder="Search Store"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={handleSelect}
            onChange={(value) => {
              if (!value) handleSelect(''); 
            }}
          />
        </span>
        <Button size={window.innerWidth < 800 ? 'large' : ''} onClick={handleAddStore} icon={<ShopOutlined />}>
          Add Store
        </Button>
      </section>
      <section>
        <Table
          className="custom-table"
          columns={columns}
          dataSource={selectedStore ? [selectedStore] : data}
          size="small"
          scroll={{ x: 800 }}
          pagination={{ pageSize: 5 }}
          locale={{
            emptyText: (
              <span className="text-gray-300 text-2xl">Start Adding <ShopOutlined/></span>
            ),
          }}
          rowKey={(record) => record._id}
          
        />
        <p className="md:hidden opacity-40 text-center mt-5">
          Swipe to explore, edit, delete
          <ArrowRightOutlined className="text-xs ms-2" />
        </p>
      </section>
      {isModal && (
        <StoreModal
          data={formType === "Create Store" ? {} : modData} // Pass the correct data to modal
          isModal={isModal}
          setIsModal={setIsModal}
          formType={formType}
        />
      )}
    </main>
  );
}
