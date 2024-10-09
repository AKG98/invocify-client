import { Table, Button,Tag, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { useGetInvoicesQuery, useUpdateInvoiceMutation } from '../../features/Slices/invoiceApi';
import { useSelector } from 'react-redux';
import { FileTextOutlined } from '@ant-design/icons';

const AllInvoice = () => {
  const ownerId = useSelector((state) => state.user.user._id);
  const { data: invoicesData, error: invoicesError, isLoading: isInvoicesLoading } = useGetInvoicesQuery(ownerId);
  const [invoiceData, setInvoiceData] = useState([]);

  const [updateInvoice] = useUpdateInvoiceMutation();

  const handlePaymentState = async (record) => {
    const { _id, grandTotal } = record;
    const invoiceId = _id;
    const invoice = {
      amountDue: 0,
      paymentStatus: 'paid',
      amountPaid: grandTotal,
    };

    try {
      await updateInvoice({ invoiceId, invoice });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (invoicesData) {
      setInvoiceData(invoicesData);
    }
  }, [invoicesData]);

  const parentColumns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Client Name',
      dataIndex: ['client', 'name'],
      key: 'clientName',
    },
    {
      title: 'Client Phone',
      dataIndex: ['client', 'phone'],
      key: 'clientPhone',
    },
    {
      title: 'Store Name',
      dataIndex: ['store', 'name'],
      key: 'storeName',
    },
    {
      title: 'Store Phone',
      dataIndex: ['store', 'phone'],
      key: 'storePhone',
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      render: (text) => `₹${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Amount Paid',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      render: (text) => `₹${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Amount Due',
      dataIndex: 'amountDue',
      key: 'amountDue',
      render: (text) => `₹${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (paymentStatus) => (
        <Tag size='large' color={paymentStatus === 'paid' ? 'green' : 'orange'}>
          {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Payment Mode',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      const { paymentStatus } = record;
      return (
        <span>
          {paymentStatus === 'paid' ? (
            <Button type="link" disabled>
              Paid
            </Button>
          ) : (
            <Popconfirm
              title="Are you sure your bill is paid fully ? This can't be undone."
              onConfirm={() => handlePaymentState(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link">Paid?</Button>
            </Popconfirm>
          )}
        </span>
      );
    },
  },
  ];
  


  const expandableRowRender = (record) => {
    const itemColumns = [
      {
        title: 'Item Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text) => `₹${parseFloat(text).toFixed(2)}`,
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (text) => `₹${parseFloat(text).toFixed(2)}`,
      },
    ];

    const clientColumns = [
      {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Client Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Client Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Client Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    const storeColumns = [
      {
        title: 'Store Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Store Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Store Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Store Address',
        dataIndex: 'address',
        key: 'address',
      },
    ];

    return (
      <>
        <h4 className='font-semibold mb-5'>Items</h4>
        <Table
          columns={itemColumns}
          dataSource={record.items}
          pagination={false}
          rowKey="_id"
          scroll={{ x: 800 }}
        />
        <h4 className='font-semibold mb-5'>Client Info</h4>
        <Table
          size='small'
          className="custom-table"
          columns={clientColumns}
          dataSource={[record.client]}
          pagination={false}
          rowKey="_id"
          scroll={{ x: 800 }}
        />
        <h4 className='font-semibold mb-5'>Store Info</h4>
        <Table
          size='small'
          className="custom-table"
          columns={storeColumns}
          dataSource={[record.store]}
          pagination={false}
          rowKey="_id"
          scroll={{ x: 800 }}
        />
      </>
    );
  };

  return (
    <main className=" w-full p-2">
      <span className="flex items-center mb-5">
        <FileTextOutlined className="text-4xl"/>
        <h1 className="text-5xl font-semibold">Invoices</h1>
      </span>
    <Table
      size='small'
      className="custom-table"
      columns={parentColumns}
      dataSource={invoiceData}
      expandable={{
        expandedRowRender:expandableRowRender,
        rowExpandable: (record) => record.items && record.items.length > 0,
      }}
      rowKey="_id"
      scroll={{ x: 800 }}
    />
    </main>
  );
};

export default AllInvoice;
