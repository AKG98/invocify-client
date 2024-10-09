import { Divider, Button, Popconfirm } from 'antd';
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useSelector } from 'react-redux';
import "../../../styles/template3.css"
import { MailOutlined, PhoneOutlined,PrinterFilled } from '@ant-design/icons';
import SaveInvoice from '../../../components/SaveInvoice';
import CreateNewInvoice from '../../../components/CeateNewInvoice';

export default function Template3() {
    const customer = useSelector((state) => state.invoice.customerData);
    const store = useSelector((state) => state.invoice.storeData);
    const invoice = useSelector((state) => state.invoice.invoiceData);
    const fullName = store.name;
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    const componentRef = useRef();
    const printRef = useRef();

    // Handle printing on confirm
    const handlePrint = () => {
        printRef.current.handlePrint(); // Manually trigger the print action
    };
    return (
        <div className='flex flex-col items-center justify-center p-4'>
            {/* Print Button */}
            <div className='flex gap-2 mb-4'>
                <Popconfirm
                    title="The invoice will be saved to local storage only."
                    okText="Confirm"
                    cancelText="Cancel"
                    onConfirm={handlePrint}
                >
                    <Button type="primary" icon={<PrinterFilled/>}>Print/Download</Button>
                </Popconfirm>
                <ReactToPrint
                    ref={printRef} // Attach the ref here
                    content={() => componentRef.current}
                    trigger={null} // Remove the default trigger since we handle it manually
                />
                <SaveInvoice />
                <CreateNewInvoice/>
            </div>
            <div className='w-full max-w-[794px] h-[1200px] overflow-scroll border-2 border-gray-300'>
                <div className="w-[794px] h-[1123px] p-8 text-[#132E4B] bg-white" ref={componentRef}>
                    <div className="flex items-center justify-between">
                        <div className="invo3">
                            <h1 className='text-5xl font-semibold'>Invoice</h1>
                        </div>
                        <div className="flex items-center gap-2.5 text-2xl">
                            <h2 className='font-semibold text-[#31c763]'>{firstName || "firstName"}</h2><p className="">{lastName}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end text-xs mb-7">GST: {store.gst || "gst number"}</div>
                    <div className="flex items-center justify-between mb-10">
                        <section>Date: {invoice.invoiceDate || "invoice date"}</section>
                        <section>Invoice no.: {invoice.invoiceNumber || "invoice number"}</section>
                    </div>
                    <Divider />
                    <div className="flex items-start justify-between mb-7 text-sm gap-2.5">
                        <div className="w-[25%]">
                            <p className="font-bold">{customer.name || "customer name"}</p>
                            <p>{customer.phone || "customer phone"}</p>
                            <p>{customer.email || "customer email"}</p>
                        </div>
                        <div className="w-[25%]">
                            <p className="font-bold">Address</p>
                            <p>{customer.address || "customer's address"}</p>
                        </div>
                        <div className="w-[25%]">
                            <p className="font-bold">{store?.name}</p>
                            <p>{store.phone || "company phone"}</p>
                            <p>{store.email || "company email"}</p>
                        </div>
                        <div className="w-[25%]">
                            <p className="font-bold">Address</p>
                            <p>{store.address || "company address"}.</p>
                        </div>
                    </div>
                    <div className="text-sm mb-2.5 min-h-[400px]">
                        <section className="flex items-center justify-between bg-[#132E4B] text-white p-2.5 mb-2.5">
                            <p className="w-[477px]">Description</p>
                            <p className="text-center w-[79px]">Qty</p>
                            <p className="text-center w-[119px]">Rate (₹)</p>
                            <p className="text-center w-[119px]">Total (₹)</p>
                        </section>
                        {invoice.items.map((item, index) => (
                            <section className="flex items-center justify-between p-2.5 border-b border-black" key={index}>
                                <p className="w-[60%]">{item.name}</p>
                                <p className="text-center w-[10%]">{item.quantity}</p>
                                <p className="text-center w-[15%]">{item.price}</p>
                                <p className="text-center w-[15%]">{item.total}</p>
                            </section>
                        ))}
                    </div>
                    <div className="flex items-start mb-7">
                        <section className="w-[477px]">
                            <span className="flex">
                                <h4 className='font-semibold text-xl'>Payment Info</h4>
                            </span>
                            <span className="flex gap-2">
                                <p>Mode</p>
                                <p>{invoice.paymentMode || "payment mode"}</p>
                            </span>
                            <span className="flex gap-2">
                                <p>Amount paid(₹)</p>
                                <p>{invoice.amountPaid || 0}</p>
                            </span>
                        </section>
                        <section className="w-[279px]">
                            <span className="flex justify-between bg-[#31c763] text-white p-2.5">
                                <h4>Subtotal(₹)</h4>
                                <p>{invoice.subtotal || 0}</p>
                            </span>
                            <span className="flex justify-between bg-[#31c763] text-white p-2.5">
                                <h4>CGST(%)</h4>
                                <p>{invoice.cgst || 0}</p>
                            </span>
                            <span className="flex justify-between bg-[#31c763] text-white p-2.5">
                                <h4>SGST(%)</h4>
                                <p>{invoice.sgst || 0}</p>
                            </span>
                            <span className="flex justify-between bg-[#132E4B] text-white p-2.5">
                                <h4>Grand Total(₹)</h4>
                                <p>{invoice.finalAmount || "grand total"}</p>
                            </span>
                        </section>
                    </div>
                    <div className="text-start">
                        <h1 className='text-2xl font-semibold'>Thank you!</h1>
                        <p>Thank you for trusting us with your business.
                            We&apos;re honored to serve you and look forward to continuing our partnership.
                        </p>
                        <Divider />
                        <div className="flex items-center justify-around w-full bg-[#132E4B] text-white p-2.5">
                            <p>For queries, contact us at:</p>
                            <p><MailOutlined /> {store.email || "email"}</p>
                            <p><PhoneOutlined /> {store.phone || "phone"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
