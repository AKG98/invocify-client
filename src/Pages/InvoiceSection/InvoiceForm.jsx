import { AutoComplete, Button, message, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {debounce} from '../../features/others/debounceSearch';
import { EditOutlined,ShopOutlined } from '@ant-design/icons';
import { setDataFlag, setStoreData } from '../../features/Slices/invoiceSlice';
import { useGetStoresQuery } from '../../features/Slices/storesApi';
import Spinner from '../../components/Spinner';
import ItemDetails from './ItemDetails';
import StoreModal from '../StoresSection/StoreModal';

export default function InvoiceForm() {
  const store = useSelector(state => state.invoice.storeData);
  const ownerId = useSelector(state => state.user.user._id);
  const [formType, setFormType] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [modData, setModData] = useState(null);
  const {data,isLoading,error} = useGetStoresQuery(ownerId);
  const [options, setOptions] = useState([]);
  const [filteredStoreData, setFilteredStoreData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const debounceTimeout = useRef(null);
  const dispatch = useDispatch();

//-----------------------------------------------------------------------------------------------------------
//                                          Data Persist
//-----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if(store){
      setFilteredStoreData(store);
    }
  }, [store]);

//-----------------------------------------------------------------------------------------------------------
//                                          Autocomplete Section
//-----------------------------------------------------------------------------------------------------------
  const handleSearch = (value) => {
    if(value === ''){
      setSelectedRowKeys([]); // clear selected row
      dispatch(setDataFlag(false));
      dispatch(setStoreData(null));
      setFilteredStoreData(null);
      return setOptions([]);
    }

    const filteredOptions = data.filter((option) => {
      return option.name.toLowerCase().includes(value.toLowerCase()) || option.phone.includes(value);
    })

    if(filteredOptions.length === 0){
      message.warning('No store found');
    }
    setSelectedRowKeys([]);
    setOptions(
      filteredOptions.map((item) => ({
          value: `${item.name} | ${item.phone}`,
          label: `${item.name} - ${item.phone} - ${item.email}`,
      }))
    );
  }

  const debounceSearch = debounce(handleSearch, 500, debounceTimeout);

  const handleSelect = (value) => {
    const phone = value.split(' | ')[1];
    const selectedCustomer = data.find(
        (item) => item.name === value || item.phone === phone
    );
    dispatch(setStoreData(null));
    dispatch(setDataFlag(false));
    setFilteredStoreData(selectedCustomer);
};

//-----------------------------------------------------------------------------------------------------------
//                                          Table Section
//-----------------------------------------------------------------------------------------------------------
  const columns = [
    {
      key: 'name',
      title: 'Outlet Name',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      key: 'gst',
      title: 'Gst no.',
      dataIndex: 'gst',
    },
    {
      key: 'phone',
      title: 'Phone no.',
      dataIndex: 'phone',
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key:'address',
      title: 'Address',
      dataIndex: 'address',
    },
    {
      key: 'action',
      title: 'Action',
      width: 100,
      render: (record) => (
        <Button 
        block
        type='text'
        icon={<EditOutlined />}  
        onClick={(e) => {
          e.stopPropagation(); // Prevent row selection when clicking edit
          // Handle edit action here
          handleEdit(record);
        }} 
        />
      )
    }
  ];

  // handle edit action
  const handleEdit = (record) => {
    setFormType('Edit Store');
    setModData(record);
    setIsModal(true);
    resetTableAndRows();
  }

  // handle add customer
  const handleAddCustomer = () => {
    setFormType('Create Store');
    setIsModal(true);
    resetTableAndRows();
  }

  function resetTableAndRows(){
    setSelectedRowKeys([]);
    dispatch(setStoreData(null));
    dispatch(setDataFlag(false));
    setFilteredStoreData(null);
  }
  // handle rowselection
  const handleRowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      dispatch(setStoreData(selectedRows[0]));
      message.success("Outlet selected");
    },
  };

//-----------------------------------------------------------------------------------------------------------
//                                          Spinner Section
//-----------------------------------------------------------------------------------------------------------
  if(isLoading){
    return (
      <Spinner />
    )
  }

  return (
    <main className='w-full p-2'>
      {/* Autocomplete feature */}
      <section className='w-full mb-5'>
        <label className='text-sm'>Select Outlet</label>
        <span className='w-full flex gap-2 md:flex-row flex-col'>
          <AutoComplete
            options={options}
            onSearch={debounceSearch}
            onSelect={handleSelect}
            placeholder="Search for an outlet by phone number or name"
            allowClear
            style={{ width: '100%' }}
            size={window.innerWidth < 768 ? 'large' : ''}
          />
          <Button 
            color='default' 
            variant='solid' 
            size={window.innerWidth < 768 ? 'large' : ''}
            icon={<ShopOutlined />}
            onClick={handleAddCustomer}
            >
            Add Outlet
          </Button>
        </span>
      </section>
      {/* Table Section starts Here */}
      <section className="mt-5">
        <Table 
          size='small'
          className='custom-table'
          dataSource={filteredStoreData ? [filteredStoreData] : data}
          columns={columns}
          rowKey={(record) => record._id}
          rowSelection={{ type: 'radio',...handleRowSelection }}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
           // Click anywhere on the row to select it
           onRow={(record) => ({
            onClick: () => {
              setSelectedRowKeys([record._id]); // Set the selected row visually
              handleRowSelection.onChange([record._id], [record]); // Trigger the selection handler
            },
          })}
        />
      </section>
      <ItemDetails />
      {isModal && (
        <StoreModal
          data={formType === "Create Store" ? {} : modData} // Pass the correct data to modal
          isModal={isModal}
          setIsModal={setIsModal}
          formType={formType}
        />
      )}
    </main>
  )
}
