import { Button, Col, Divider, message, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikeOutlined } from '@ant-design/icons';
import { setDataFlag } from '../../features/Slices/invoiceSlice';


const customerColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

const storeColumns = [
  { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Gst no.', dataIndex: 'gst', key: 'gst' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

const itemColumns = [
  { title: 'Item details', dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  { title: 'Total', dataIndex: 'total', key: 'total' },
];


export default function PreviewForm() {
  const customerData = useSelector((state) => state.invoice.customerData);
  const storeData = useSelector((state) => state.invoice.storeData);
  const invoiceData = useSelector((state) => state.invoice.invoiceData);
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (invoiceData) {
      const itemData = invoiceData.items.map((item) => ({
        key: item.key,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      }));
      setItems(itemData);
    }
  }, [invoiceData]);

  function formatDateToDDMMYYYY(dateObj) {
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = dateObj.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  const invDate = formatDateToDDMMYYYY(new Date(invoiceData.invoiceDate));

  const handleConfirm = () => {
    dispatch(setDataFlag(true));
    message.success('Invoice confirmed successfully');
  }

  return (
    <main className='w-full p-2'>
      <h1 className='text-2xl font-semibold text-center my-5'>Confirm Details</h1>
      <label className='text-sm'>Customer Details</label>
      <Table
        className="custom-table"
        dataSource={[customerData]}
        columns={customerColumns}
        pagination={false}
        scroll={{ x: 800 }}
        rowKey="_id"
      />
      <Divider style={{ borderColor: 'GrayText', opacity: 0.3 }} />
      <label className='text-sm'>Outlet Details</label>
      <Table
        className="custom-table"
        dataSource={[storeData]}
        columns={storeColumns}
        pagination={false}
        scroll={{ x: 800 }}
        rowKey="_id"
      />
      <Divider style={{ borderColor: 'GrayText', opacity: 0.3 }} />
      <section className='mb-5 flex justify-between'>
        <span className='flex gap-2 items-center'>
          <label className='text-sm font-bold'>Invoice Date :</label>
          <p>{invoiceData.invoiceDate}</p>
        </span>
        <span className='flex gap-2 items-center'>
          <label className='text-sm font-bold'>Invoice Number :</label>
          <p>{invoiceData.invoiceNumber}</p>
        </span>
      </section>
      <label className='text-sm'>Item Details</label>
      <Table
        className="custom-table"
        dataSource={items}
        columns={itemColumns}
        pagination={false}
        scroll={{ x: 800 }}
        rowKey="key"
      />
      <Divider style={{ borderColor: 'GrayText', opacity: 0.3 }} />
      <Row gutter={10} className='mb-5'>
        <Col xs={12} md={6}>
          <label className='text-sm font-bold'>Payment Mode</label>
          <p>{invoiceData.paymentMode}</p>
        </Col>
        <Col xs={12} md={6} >
          <label className='text-sm font-bold'>Discount</label>
          <p>{invoiceData.discount}</p>
        </Col>
        <Col xs={12} md={6}>
          <label className='text-sm font-bold'>CGST</label>
          <p>{invoiceData.cgst}</p>
        </Col>
        <Col xs={12} md={6}>
          <label className='text-sm font-bold'>SGST</label>
          <p>{invoiceData.sgst}</p>
        </Col>
      </Row>

      <Row gutter={10} className='mb-10'>
        <Col xs={12} md={6}>
          <label className='text-sm font-bold'>Subtotal</label>
          <p>{invoiceData.subtotal}</p>
        </Col>
        <Col xs={12} md={6}>
          <label className='text-sm font-bold'>Total</label>
          <p>{invoiceData.finalAmount}</p>
        </Col>
        <Col xs={12} md={6}>
          <label className='text-sm font-bold'>Amount Paid</label>
          <p>{invoiceData.amountPaid}</p>
        </Col>
        <Col xs={12} md={6}>
          <label className='text-sm font-bold'>Balance Due</label>
          <p>{invoiceData.dueAmount}</p>
        </Col>
      </Row>
      <section className='w-full flex justify-center '>
        <Button 
          type='primary' 
          icon={<LikeOutlined />} 
          iconPosition='end' 
          size='large'
          onClick={handleConfirm}
          className='md:w-1/4 w-full md:my-10 my-5'
          >
            Confirm
        </Button>
      </section>
    </main>
  );
}
