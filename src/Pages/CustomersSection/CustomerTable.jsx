import { AutoComplete, Button, message, Modal, Space, Table } from 'antd';
import { UsergroupAddOutlined, ArrowRightOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useEffect, useState, useCallback } from 'react';
import CustomerModal from './CustomerModal';
import { useSelector } from 'react-redux';
import Spinner from '../../components/Spinner';
import { useDeleteClientMutation, useGetClientsQuery } from '../../features/Slices/clientApi';
import Header from './Header';

export default function CustomerTable() {
    const ownerId = useSelector((state) => state.user.user._id);
    const { data, error, isLoading } = useGetClientsQuery(ownerId);
    const [isModal, setIsModal] = useState(false);
    const [formType, setFormType] = useState(null);
    const [modData, setModData] = useState(null);
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    // Delete client mutation
    const [deleteClient] = useDeleteClientMutation();

    // Function to fetch clients
    const fetchingClients = useCallback((data) => {
        try {
            if (data && data.length > 0) {
                const options = data.map((client, index) => ({ value: client.name, key: index }));
                setSelectOptions(options);
            }
        } catch (error) {
            console.error("Failed to fetch clients:", error);
        }
    }, []);

    useEffect(() => {
        fetchingClients(data);
    }, [data, fetchingClients]);

    const handleSelect = (value) => {
        const selectedClient = value ? data.find((client) => client.name === value) : null;
        setSelectedClient(selectedClient);
    };

    const handleEdit = (record) => {
        setFormType('Edit Client');
        setModData(record);
        setIsModal(true);
    };

    const handleDelete = (clientId) => {

        Modal.confirm({
            centered: true,
            title: 'Are you sure?',
            okText: 'Yes, Delete',
            cancelText: 'Cancel',
            content: 'This action cannot be reversed',
            okButtonProps: { danger: true },
            onOk: async () => {
                try {
                    await deleteClient(clientId).unwrap();
                    message.success('Client deleted successfully');
                } catch (error) {
                    message.error('Failed to delete client');
                }
            },
        });
    };

    const handleAdd = () => {
        setFormType('Add Client');
        setSelectedClient(null);
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
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="text"
                        icon={<DeleteFilled />}
                        danger
                        onClick={() => handleDelete(record._id)}
                    />
                </Space>
            ),
        },
    ];

    if (isLoading) return <Spinner isActive={isLoading} />;

    return (
        <>
            <section className='flex md:flex-row flex-col gap-2 md:items-end mb-5'>
                <span className='w-full'>
                    <label className='text-xs opacity-50'>Search client</label>
                    <AutoComplete
                        allowClear
                        size={window.innerWidth < 800 ? 'large' : undefined} // Corrected the size prop
                        className='w-full'
                        options={selectOptions}
                        placeholder="Search Clients"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().includes(inputValue.toUpperCase())
                        }
                        onSelect={handleSelect}
                    />
                </span>
                <Button size={window.innerWidth < 800 ? 'large' : undefined} icon={<UsergroupAddOutlined />} onClick={handleAdd}>
                    Add Client
                </Button>
            </section>
            <section>
                <Table
                    className='custom-table'
                    columns={columns}
                    scroll={{ x: 800 }}
                    size='small'
                    dataSource={selectedClient ? [selectedClient] : data}
                    pagination={{ pageSize: 5 }}
                    rowKey={(record) => record._id}
                />
                <p className="md:hidden opacity-40 text-center mt-5">
                    Swipe to explore, edit, delete
                    <ArrowRightOutlined className="text-xs ms-2" />
                </p>
            </section>
            {isModal && (
                <CustomerModal
                    data={formType === "Add Client" ? {} : modData}
                    isModal={isModal}
                    setIsModal={setIsModal}
                    formType={formType}
                />
            )}
        </>
    );
}
