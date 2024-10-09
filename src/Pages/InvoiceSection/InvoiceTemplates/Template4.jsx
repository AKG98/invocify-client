import "../../../styles/template4.css"
import bg from "../../../assets/backgrounds/template4bg.svg"
import upload from "../../../assets/invoiceTemplates/file.png"
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import SaveInvoice from "../../../components/SaveInvoice";
import { PrinterFilled } from "@ant-design/icons";
import CreateNewInvoice from "../../../components/CeateNewInvoice";

export default function Template4() {
    const user = useSelector((state) => state.user.user);
    const customer = useSelector((state) => state.invoice.customerData);
    const store = useSelector((state) => state.invoice.storeData);
    const invoice = useSelector((state) => state.invoice.invoiceData);
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
                <div className="template-4 bg-white" ref={componentRef}>
                    <div className="invoice-header4">
                        <div className="invoice-header-left4" style={{ backgroundImage: `url(${bg})` }}>
                            <h1 className="font-semibold text-5xl">Invoice</h1>
                            <p className="font-semibold text-xl">{store.name}</p>
                        </div>
                        <div className="invoice-header-right4">
                            <div className="content4">
                                <section>
                                    <h4 className="font-semibold">Invoice Number</h4>
                                    <p>{invoice.invoiceNumber}</p>
                                </section>
                                <section>
                                    <h4 className="font-semibold">Date</h4>
                                    <p>{invoice.invoiceDate}</p>
                                </section>
                            </div>
                        </div>
                    </div>

                    <div className="billing-info4">
                        <div className="bi-left4">
                            <h4 className="font-semibold">Bill To</h4>
                            <p className="text-sm">{customer.name}</p>
                            <p className="text-sm">{customer.phone}</p>
                            <p className="text-sm">{customer.email}</p>
                        </div>
                        <div className="bi-right4">
                            <h4 className="font-semibold">Bill From</h4>
                            <p className="text-sm">{store.name}</p>
                            <p className="text-sm">GST:{store.gst}</p>
                            <p className="text-sm">{store.email}</p>
                        </div>
                    </div>
                    <div className="item-details4">
                        <div className="table-head4 font-semibold bg-[#FEE358] ps-2">
                            <p >Item Description</p>
                            <p>Quantity</p>
                            <p>Price(₹)</p>
                            <p>Total(₹)</p>
                        </div>
                        {invoice.items.map((item, index) => (
                            <div className="table-row4" key={index}>
                                <p className="ps-2">{item.name}</p>
                                <p>{item.quantity}</p>
                                <p>{item.price}</p>
                                <p>{item.total}</p>
                            </div>
                        ))}
                    </div>
                    <div className="item-totals4">
                        <div className="it-right4 text-end">
                            <span>
                                <h4 className="font-semibold">Subtotal(₹)</h4>
                                <p>{invoice.subtotal}</p>
                            </span>
                            <span>
                                <h4 className="font-semibold">CGST(%)</h4>
                                <p>{invoice.cgst}</p>
                            </span>
                            <span>
                                <h4 className="font-semibold">SGST(%)</h4>
                                <p>{invoice.sgst}</p>
                            </span>
                            <span>
                                <h4 className="font-semibold">Total(₹)</h4>
                                <p>{invoice.finalAmount}</p>
                            </span>
                        </div>
                    </div>
                    <div className="invoice-footer4">
                        <div className="if-left4">
                            <h1 className="text-2xl font-semibold">Thank you !</h1>
                            <p>
                                Thank you for trusting us with your business.
                                We&apos;re honored to serve you and look forward to continuing our partnership.
                            </p>
                        </div>
                        <div className="if-right4">
                            <div className="ifr-left4">
                                <section className="text-sm"> <PhoneOutlined /><p >{store.phone}</p></section>
                                <section className="text-sm"><MailOutlined /><p>{store.email}</p></section>
                                <section className="text-sm"><EnvironmentOutlined /><p>{store.address}</p></section>
                            </div>
                            <div className="ifr-right4 flex justify-end">
                                <img src={user.logo || upload} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
