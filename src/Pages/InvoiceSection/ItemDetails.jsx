import { Button, Col, DatePicker, Divider, Form, Input, Row, Select, Space, Table, Checkbox, Popconfirm, message } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ImageUploader from '../../components/ImageUploader';
import { useDispatch, useSelector } from 'react-redux';
import { pushInvoiceData, setDataFlag } from '../../features/Slices/invoiceSlice';
import dayjs from 'dayjs';


export default function ItemDetails() {
    const savedInvoice = useSelector(state => state.invoice.invoiceData);
    const defLogo = useSelector(state => state.user.user.logo);
    const isStore = useSelector((state) => state.invoice.storeData);
    const [invoiceDate, setInvoiceDate] = useState(savedInvoice?.invoiceDate ? dayjs(savedInvoice.invoiceDate) : dayjs());
    const [dateString, setDateString] = useState();
    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: generateInvoiceNumber(),
        paymentMode: '',
        items: [],
        discount: 0,
        cgst: 0,
        sgst: 0,
        amountPaid: 0,
    });

    const [grandTotal, setGrandTotal] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);
    const [editingItem, setEditingItem] = useState(null);
    const [form] = Form.useForm();
    const [isDone, setIsDone] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        // Check if there's a saved invoice
        if (savedInvoice) {
            setInvoiceData({
                invoiceNumber: savedInvoice.invoiceNumber,
                paymentMode: savedInvoice.paymentMode,
                discount: savedInvoice.discount || 0,
                cgst: savedInvoice.cgst || 0,
                sgst: savedInvoice.sgst || 0,
                amountPaid: savedInvoice.amountPaid || 0,
                items: savedInvoice.items.map((item, index) => ({ ...item, key: index }))
            });
        }
    }, [savedInvoice]); // Dependency array to trigger effect when savedInvoice changes


    const columns = [
        {
            title: 'Item Description',
            dataIndex: 'name',
            width: '30%',
            editable: true,
            fixed: 'left',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '20%',
            editable: true,
        },
        {
            title: 'Price/Unit',
            dataIndex: 'price',
            width: '20%',
            editable: true,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            width: '20%',
            editable: false,
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
                    <Popconfirm
                        title="Are you sure to delete this item?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            type="text"
                            icon={<DeleteFilled />}
                            danger
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        calculateTotals();
    }, [invoiceData.items, invoiceData.discount, invoiceData.cgst, invoiceData.sgst, invoiceData.amountPaid]);

    const calculateTotals = () => {
        let total = 0;
        let totalItems = [...invoiceData.items];

        totalItems.forEach(item => {
            item.total = item.quantity * item.price; // Calculate total for each item
            total += item.total;
        });

        setGrandTotal(total);

        const discountAmount = (total * (invoiceData.discount / 100));
        const grandTotalAfterDiscount = total - discountAmount;
        const cgstAmount = (grandTotalAfterDiscount * (invoiceData.cgst / 100));
        const sgstAmount = (grandTotalAfterDiscount * (invoiceData.sgst / 100));

        const finalAmount = Number((grandTotalAfterDiscount + cgstAmount + sgstAmount).toFixed(3));

        setFinalAmount(finalAmount);

        const dueAmount = finalAmount - invoiceData.amountPaid;
        setDueAmount(dueAmount);
    };

    function generateInvoiceNumber() {
        const prefix = 'INV';
        const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // Generate a 7-digit random number
        return `${prefix}${randomNumber}`;
    }

    const handleAddItem = (values) => {
        const newItem = {
            key: editingItem ? editingItem.key : Date.now(),
            name: values.itemDescription,
            quantity: values.quantity,
            price: values.pricePerUnit,
            total: values.quantity * values.pricePerUnit,
        };

        setInvoiceData(prevData => ({
            ...prevData,
            items: editingItem
                ? prevData.items.map(item => item.key === editingItem.key ? newItem : item)
                : [...prevData.items, newItem]
        }));

        // Reset form
        form.resetFields();
        setEditingItem(null); // Reset editing item
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        form.setFieldsValue({
            itemDescription: item.name,
            quantity: item.quantity,
            pricePerUnit: item.price,
        });
    };

    const handleDelete = (key) => {
        setInvoiceData(prevData => ({
            ...prevData,
            items: prevData.items.filter(item => item.key !== key),
        }));
    };

    const handleConfirmDone = () => {
        if (!isStore) {
            message.warning('Please select the outlet');
            setIsDone(false);
            return;
        }
        if (invoiceData.items.length === 0) {
            message.warning('Please add items');
            setIsDone(false);
            return;
        }
        if (invoiceData.paymentMode === '') {
            message.warning('Please select payment mode');
            setIsDone(false);
            return;
        }
        if (invoiceData.invoiceDate === '') {
            message.warning('Please select invoice date');
            setIsDone(false);
            return;
        }
        const completeData = { ...invoiceData, subtotal: grandTotal, finalAmount: finalAmount, dueAmount: dueAmount, invoiceDate: dateString || dayjs().format('YYYY-MM-DD') };
        dispatch(pushInvoiceData(completeData));
        dispatch(setDataFlag(true));
        message.success("Details Saved");
    };

    return (
        <div>
            <Divider style={{ borderColor: 'gray', opacity: 0.3 }}>Payment Mode</Divider>
            <section>
                <Row gutter={10}>
                    <Col xs={24} md={8} className='mb-3'>
                        <span>
                            <Input readOnly value={invoiceData.invoiceNumber} size={window.innerWidth < 768 ? 'large' : ''} />
                        </span>
                    </Col>
                    <Col xs={24} md={8} className='mb-3'>
                        <span>
                            <DatePicker
                                size={window.innerWidth < 768 ? 'large' : ''}
                                style={{ width: '100%' }}
                                value={invoiceDate}
                                onChange={(date, dateString) => {
                                    setInvoiceDate(date);
                                    setDateString(dateString);
                                }}

                            />
                        </span>
                    </Col>
                    <Col xs={24} md={8}>
                        <span>
                            <Select
                                placeholder="Select a payment mode"
                                size={window.innerWidth < 768 ? 'large' : ''}
                                style={{ width: '100%' }}
                                value={invoiceData.paymentMode || undefined}
                                onChange={(value) => setInvoiceData({ ...invoiceData, paymentMode: value })}
                            >
                                <Select.Option value="Cash">Cash</Select.Option>
                                <Select.Option value="Card">Card</Select.Option>
                                <Select.Option value="UPI">UPI</Select.Option>
                                <Select.Option value="Net Banking">Net Banking</Select.Option>
                            </Select>
                        </span>
                    </Col>
                </Row>
            </section>

            <Divider style={{ borderColor: 'gray', opacity: 0.3 }}>Item Details</Divider>
            <Form name="itemDetails" layout="vertical" onFinish={handleAddItem} form={form}>
                <Row gutter={10}>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Item Description"
                            name="itemDescription"
                            rules={[{ required: true, message: 'Please enter item description' }]} // Added validation rule
                        >
                            <Input placeholder='Item Description' size={window.innerWidth < 768 ? 'large' : ''} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: 'Please enter quantity' }]} // Added validation rule
                        >
                            <Input placeholder='Enter Quantity' type='number' size={window.innerWidth < 768 ? 'large' : ''} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item
                            label="Price/Unit"
                            name="pricePerUnit"
                            rules={[{ required: true, message: 'Please enter price per unit' }]} // Added validation rule
                        >
                            <Input placeholder='Enter Price' type='number' size={window.innerWidth < 768 ? 'large' : ''} />
                        </Form.Item>
                    </Col>
                </Row>
                <Button size={window.innerWidth < 768 ? 'large' : ''} type='primary' htmlType='submit' block>
                    {editingItem ? 'Update Item' : '+ Add Item'}
                </Button>
            </Form>

            <Table
                className='custom-table mt-5'
                columns={columns}
                dataSource={invoiceData.items}
                pagination={false}
                scroll={{ x: 800 }}
                size='small'
            />

            <section className='mt-5'>
                <Row gutter={16}>
                    <Col xs={12} md={6}>
                        <label className='text-xs'>Grand Total</label>
                        <Input size={window.innerWidth < 768 ? 'large' : ''} readOnly value={grandTotal} />
                    </Col>
                    <Col xs={12} md={6}>
                        <label className='text-xs'>Discount (%)</label>
                        <Input
                            size={window.innerWidth < 768 ? 'large' : ''}
                            value={invoiceData.discount}
                            onChange={(e) => setInvoiceData({ ...invoiceData, discount: e.target.value })}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <label className='text-xs'>CGST (%)</label>
                        <Input
                            size={window.innerWidth < 768 ? 'large' : ''}
                            value={invoiceData.cgst}
                            onChange={(e) => setInvoiceData({ ...invoiceData, cgst: e.target.value })}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <label className='text-xs'>SGST (%)</label>
                        <Input
                            size={window.innerWidth < 768 ? 'large' : ''}
                            value={invoiceData.sgst}
                            onChange={(e) => setInvoiceData({ ...invoiceData, sgst: e.target.value })}
                        />
                    </Col>
                    <Col xs={12} md={6} className='mt-5'>
                        <label className='text-xs'>Final Amount</label>
                        <Input size={window.innerWidth < 768 ? 'large' : ''} readOnly value={finalAmount} />
                    </Col>
                    <Col xs={12} md={6} className='mt-5'>
                        <label className='text-xs'>Amount Paid</label>
                        <Input
                            size={window.innerWidth < 768 ? 'large' : ''}
                            value={invoiceData.amountPaid}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (value <= finalAmount) {
                                    setInvoiceData({ ...invoiceData, amountPaid: value });
                                } else {
                                    // Optionally, show a warning or prevent further input
                                    message.warning("Amount Paid cannot exceed the Final Amount");
                                }
                            }}
                        />
                    </Col>
                    <Col xs={24} md={6} className='mt-5'>
                        <label className='text-xs'>Due Amount</label>
                        <Input size={window.innerWidth < 768 ? 'large' : ''} readOnly value={dueAmount} />
                    </Col>
                </Row>
            </section>
            {/* // Added a checkbox to mark the invoice as done */}
            <section className='w-full flex flex-col items-center justify-center p-5 '>
                <label>Upload Logo</label>
                <section className='mb-5'>
                    <ImageUploader imageName={"logo"} defImage={defLogo} />
                </section>
                <Checkbox
                    checked={isDone}
                    onChange={(e) => {
                        setIsDone(e.target.checked);
                        if (e.target.checked) {
                            handleConfirmDone(); // Call the function when checked
                        } else {
                            dispatch(setDataFlag(false)); // Reset data flag when unchecked
                        }
                    }}
                >
                    Mark as Done
                </Checkbox>
            </section>
        </div>
    );
}
