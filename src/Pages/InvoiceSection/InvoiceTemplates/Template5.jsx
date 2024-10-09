import "../../../styles/template5.css"
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import logo from '../../../assets/images/logoVector.jpg';
import SaveInvoice from "../../../components/SaveInvoice";
import { PrinterFilled } from "@ant-design/icons";
import CreateNewInvoice from "../../../components/CeateNewInvoice";


export default function Template5() {
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

    // Split the input string into an array of words
    const words = store.name.split(" ");

    // Get the first two words for firstname
    const firstname = words.slice(0, 2).join(" ");

    // Get the rest of the words for lastname
    const lastname = words.slice(2).join(" ");

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

                <div className="template5 bg-white" ref={componentRef}>
                    <div className="invo-header5">
                        <section className="logo5">
                            <img className="w-full h-full" src={user.logo || logo} alt="logo" />
                        </section>
                        <section className="brand5">
                            <h1 className="text-2xl font-bold">{firstname}</h1>
                            <p className="text-sm">{lastname}</p>
                        </section>
                    </div>
                    <h1 className="heading5 text-6xl font-semibold">INVOICE</h1>
                    <div className="invo-details5">
                        <div className="invo-to5">
                            <h4 className="font-semibold">Bill to</h4>
                            <p>{customer.name}</p>
                            <p>{customer.phone}</p>
                            <p>{customer.email}</p>
                        </div>
                        <div className="invo-from5">
                            <h4 className="font-semibold">Bill from</h4>
                            <p>gst {store.gst}</p>
                            <p>Phone: {store.phone}</p>
                            <p>Email: {store.email}</p>
                        </div>
                        <div className="invo-date5">
                            <h4 className="font-semibold">Invoice Number</h4>
                            <p>{invoice.invoiceNumber}</p>
                            <h4>Invoice Date</h4>
                            <p>{invoice.invoiceDate}</p>
                        </div>
                    </div>
                    <div className="items5">
                        <div className="tab-head5">
                            <p>Item Description</p>
                            <p>Quantity</p>
                            <p>Price(₹)</p>
                            <p>Total(₹)</p>
                        </div>
                        {invoice.items.map((item, index) => (
                            <div key={index} className={`tab-row5 ${index % 2 === 0 ? "" : "row-2"}`}>
                                <p>{item.name}</p>
                                <p>{item.quantity}</p>
                                <p>{item.price}</p>
                                <p>{item.total}</p>
                            </div>
                            
                        ))}
                        <span className="flex justify-end mt-5 bg-[#314929] gap-2 text-white py-1">
                            <h4 className="font-semibold">Subtotal(₹)</h4>
                            <p className="min-w-[130px] text-center">{invoice.subtotal }</p>
                        </span>
                    </div>
                    <div className="item-footer5">
                        <div className="if-payMethod5">
                            <h4 className="font-semibold">Payment Details</h4>
                            <section><p>Payment mode</p><p>{invoice.paymentMode}</p></section>
                            <section><p>Amount Paid(₹)</p><p>{invoice.amountPaid}</p></section>
                        </div>
                        <div className="if-total5">
                            <section><h4 className="font-semibold">CGST(%)</h4><p>{invoice.cgst}</p></section>
                            <section><h4 className="font-semibold">SGST(%)</h4><p>{invoice.sgst}</p></section>
                            <section><h4 className="font-semibold">Total(₹)</h4><p>{invoice.finalAmount}</p></section>
                        </div>
                    </div>
                    <div className="invo-footer5">
                        <h1 className="font-semibold text-2xl">Thank you !</h1>
                        <p>
                            Thank you for trusting us with your business.
                            We&apos;re honored to serve you and look forward to continuing our partnership.
                        </p>
                    </div>
                    <div className="footer-line5">
                        <p>{store.address}</p>
                        <p>{store.phone}</p>
                        <p>{store.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
