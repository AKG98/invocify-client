import { Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddInvoiceMutation } from '../features/Slices/invoiceApi';
import { CloudUploadOutlined } from '@ant-design/icons';

export default function SaveInvoice() {
    const invoiceData = useSelector((state) => state.invoice.invoiceData);
    const user = useSelector((state) => state.user.user);
    const customer = useSelector((state) => state.invoice.customerData);
    const store = useSelector((state) => state.invoice.storeData);
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    
    const [invoiceDetails, setInvoiceDetails] = useState({
        invoiceNumber: String(invoiceData.invoiceNumber),
        invoiceDate: String(invoiceData.invoiceDate),
        items: [],
        subtotal: String(invoiceData.subtotal),
        grandTotal: String(invoiceData.finalAmount),
        discount: String(invoiceData.discount),
        cgst: String(invoiceData.cgst),
        sgst: String(invoiceData.sgst),
        amountPaid: String(invoiceData.amountPaid),
        amountDue: String(invoiceData.dueAmount),
        paymentMode: String(invoiceData.paymentMode),
        paymentStatus: '',
        ownerId: String(user._id),
        clientId: String(customer._id),
        storeId: String(store._id),
    });

    const [addInvoice] = useAddInvoiceMutation();

    useEffect(() => {
        const paymentStatus = (Number(invoiceData.finalAmount) - Number(invoiceData.amountPaid)) === 0 ? 'paid' : 'pending';
        setInvoiceDetails({
            ...invoiceDetails,
            items: invoiceData.items.map((item) => ({
                name: String(item.name),
                quantity: String(item.quantity),
                price: String(item.price),
                total: String(item.total),
            })),
            paymentStatus: String(paymentStatus),
        });
    }, [invoiceData]);

    const handleSave = async() => {
        try {
            setLoading(true);
            const stringifiedInvoiceDetails = {
                ...invoiceDetails,
                items: invoiceDetails.items.map(item => ({
                    ...item,
                    name: String(item.name),
                    quantity: String(item.quantity),
                    price: String(item.price),
                    total: String(item.total),
                })),
            };
            await addInvoice(stringifiedInvoiceDetails).unwrap();
            setVisible(false);
            message.success('Invoice saved successfully');
        } catch (error) {
            message.warning('Already saved');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Button 
            
            onClick={handleSave} 
            icon={<CloudUploadOutlined />}
            loading={loading}
            disabled={!visible}
            >
                {visible?'save':'saved'}
        </Button>
    );
}
