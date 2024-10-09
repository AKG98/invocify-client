import { AutoComplete, Button, message, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetClientsQuery } from '../../features/Slices/clientApi';
import {debounce} from '../../features/others/debounceSearch';
import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { setCustomerData, setDataFlag } from '../../features/Slices/invoiceSlice';
import Spinner from '../../components/Spinner';
import CustomerModal from '../CustomersSection/CustomerModal';

export default function CustomerForm() {
  const customer = useSelector(state => state.invoice.customerData);
  const ownerId = useSelector(state => state.user.user._id);
  const [formType, setFormType] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [modData, setModData] = useState(null);
  const {data,isLoading,error} = useGetClientsQuery(ownerId);
  const [options, setOptions] = useState([]);
  const [filteredCustomerData, setFilteredCustomerData] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const debounceTimeout = useRef(null);
  const dispatch = useDispatch();

//-----------------------------------------------------------------------------------------------------------
//                                          Data Persist
//-----------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if(customer){
      setFilteredCustomerData(customer);
    }
  }, [customer]);

//-----------------------------------------------------------------------------------------------------------
//                                          Autocomplete Section
//-----------------------------------------------------------------------------------------------------------
  const handleSearch = (value) => {
    if(value === ''){
      setSelectedRowKeys([]); // clear selected row
      dispatch(setDataFlag(false));
      dispatch(setCustomerData(null));
      setFilteredCustomerData(null);
      return setOptions([]);
    }

    const filteredOptions = data.filter((option) => {
      return option.name.toLowerCase().includes(value.toLowerCase()) || option.phone.includes(value);
    })

    if(filteredOptions.length === 0){
      message.warning('No customer found');
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
    dispatch(setCustomerData(null));
    dispatch(setDataFlag(false));
    setFilteredCustomerData(selectedCustomer);
};


//-----------------------------------------------------------------------------------------------------------
//                                          Table Section
//-----------------------------------------------------------------------------------------------------------
  const columns = [
    {
      key: 'name',
      title: 'Customer Name',
      dataIndex: 'name',
      fixed: 'left',
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
    setFormType('Edit Customer');
    setModData(record);
    setIsModal(true);
    resetTableAndRows();
  }

  // handle add customer
  const handleAddCustomer = () => {
    setFormType('Add Client');
    setIsModal(true);
    // reset selected row
    resetTableAndRows();
  }

  // Reset method
  function resetTableAndRows(){
    setSelectedRowKeys([]);
    dispatch(setCustomerData(null));
    dispatch(setDataFlag(false));
    setFilteredCustomerData(null);
  }

  // handle rowselection
  const handleRowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys, selectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys);
      dispatch(setCustomerData(selectedRows[0]));
      dispatch(setDataFlag(true));
      message.success("Customer selected");
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
      <section className='w-full'>
        <label className='text-sm'>Select Customer</label>
        <span className='w-full flex gap-2 md:flex-row flex-col'>
          <AutoComplete
            options={options}
            onSearch={debounceSearch}
            onSelect={handleSelect}
            placeholder="Search for a client by phone number or name"
            allowClear
            style={{ width: '100%' }}
            size={window.innerWidth < 768 ? 'large' : ''}
          />
          <Button 
            color='default' 
            variant='solid' 
            size={window.innerWidth < 768 ? 'large' : ''}
            icon={<UserAddOutlined />}
            onClick={handleAddCustomer}
            >
            Add Customer
          </Button>
        </span>
      </section>
      {/* Table Section starts Here */}
      <section className="mt-5">
        <Table 
          size='small'
          className='custom-table'
          dataSource={filteredCustomerData ? [filteredCustomerData] : data}
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
      {isModal && (
                <CustomerModal
                    data={formType === "Add Client" ? {} : modData}
                    isModal={isModal}
                    setIsModal={setIsModal}
                    formType={formType}
                />
            )}
    </main>
  )
}
