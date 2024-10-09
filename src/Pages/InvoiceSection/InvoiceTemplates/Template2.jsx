import { Divider, Button, Popconfirm } from 'antd';
import { useRef } from "react";
import { useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import logo from '../../../assets/images/logoVector.jpg';
import SaveInvoice from '../../../components/SaveInvoice';
import { PrinterFilled } from "@ant-design/icons";
import CreateNewInvoice from '../../../components/CeateNewInvoice';

export default function Template2() {
    const user = useSelector((state) => state.user.user) || {};
    const customer = useSelector((state) => state.invoice.customerData);
    const store = useSelector((state) => state.invoice.storeData);
    const invoice = useSelector((state) => state.invoice.invoiceData);
    const componentRef = useRef(null);
    const printRef = useRef();

    // Handle printing on confirm
    const handlePrint = () => {
        printRef.current.handlePrint(); // Manually trigger the print action
    };

    return (
        <div className='flex flex-col items-center justify-center p-4'>
            {/* Print Button */}
            <div className='flex mb-4 gap-2'>
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
                <div className="w-[794px] h-[1123px] p-[3vw] bg-white" ref={componentRef} style={{ position: 'relative' }}>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center h-[60px]">
                            <img className=" max-w-20 h-full  bg-red-500 object-contain" src={user?.logo || logo} style={{ mixBlendMode: 'multiply' }} />
                            <span className="w-[250px] ms-2 flex items-start">
                                <p className='font-bold text-xl text-blue-900'>{store?.name || "Company Name ABC DEF GHI"}</p>
                            </span>
                        </div>
                        <div className="text-red-500">
                            <h2 className='text-3xl font-semibold'>INVOICE</h2>
                        </div>
                    </div>
                    <div className="mb-8">
                        <section>Invoice no.: {invoice?.invoiceNumber || "INV1234567"}</section>
                        <section>Date: {invoice?.invoiceDate || "invoiceDate"}</section>
                    </div>
                    <div className="flex items-start justify-between gap-36 mb-8">
                        <div className="w-1/2">
                            <p className="bg-blue-900 text-white px-2">Bill To</p>
                            <p>{customer?.name || "customer.name"}</p>
                            <p>{customer?.phone || "customer.phone"}</p>
                            <p>{customer?.address || "customer.address"}</p>
                        </div>
                        <div className="w-1/2">
                            <p className="bg-blue-900 text-white px-2">Bill From</p>
                            <p>{store?.name || "store.name"}</p>
                            <p>{store?.phone || "store.phone"}</p>
                            <p>{store?.email || "store.email"}</p>
                        </div>
                    </div>
                    <div className="mb-8 text-xs min-h-[300px]">
                        <section className="flex items-center justify-between bg-blue-900 text-white p-2 mb-2">
                            <p className="w-[60%]">Description</p>
                            <p className="text-center w-[10%]">Quantiy</p>
                            <p className="text-center w-[15%]">Rate (₹)</p>
                            <p className="text-center w-[15%]">Total (₹)</p>
                        </section>

                        {invoice.items.map((item, index) => (
                            <section className="flex items-center justify-between p-2 border-b border-black" key={index}>
                                <p className="w-[60%]">{item.name}</p>
                                <p className="text-center w-[10%]">{item.quantity}</p>
                                <p className="text-center w-[15%]">{item.price}</p>
                                <p className="text-center w-[15%]">{item.total}</p>
                            </section>
                        ))}
                    </div>
                    <div className="flex gap-20 items-center justify-end mb-2">
                        <h4 >Discount (%)</h4>
                        <p className='w-[95px] text-end'>{invoice?.discount || "invoice.subtotal"}</p>
                    </div>
                    <div className="flex gap-20 items-center justify-end mb-8">
                        <h4 >Sub total (₹)</h4>
                        <p className='w-[95px] text-end'>{invoice?.subtotal || "invoice.subtotal"}</p>
                    </div>
                    <div className="flex items-center justify-between gap-48 mb-8">
                        <section className="flex-1">
                            <span><h4 className="bg-blue-900 text-white px-2">Payment Info</h4></span>
                            <span className="flex justify-between pl-2"><p>Mode</p><p>{invoice?.paymentMode || "invoice.paymentMode"}</p></span>
                            <span className="flex justify-between pl-2"><p>Amount paid (₹)</p><p>{invoice?.amountPaid || "invoice.amountPaid"}</p></span>
                        </section>
                        <section className="flex-1">
                            <span className="flex justify-between pl-2"><p>CGST (%)</p><p>{invoice?.cgst || "invoice.cgst"}</p></span>
                            <span className="flex justify-between pl-2"><p>SGST (%)</p><p>{invoice?.sgst || "invoice.sgst"}</p></span>
                            <span className="flex justify-between bg-blue-900 text-white px-2"><h4>Total (₹)</h4><h4>{invoice?.finalAmount || "invoice.finalAmount"}</h4></span>
                        </section>
                    </div>
                    <div className="text-center" style={{ position: 'absolute', bottom: 5, left: 0 }}>
                        <div className='px-[3vw]'>

                            <h1 className='text-2xl font-semibold'>Thank you !</h1>
                            <p>
                                Thank you for trusting us with your business.
                                We&apos;re honored to serve you and look forward to continuing our partnership.
                            </p>
                        </div>
                        <Divider />
                        <footer className="flex items-center justify-between w-full bg-blue-900 text-white p-2" >
                            <p>For queries, contact us at:</p>
                            <p>{store?.email || "store.email"}</p>
                            <p>{store?.phone || "store.phone"}</p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
