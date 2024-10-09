import "../../../styles/template6.css"
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button, Popconfirm } from "antd";
import upload from '../../../assets/invoiceTemplates/file.png'
import { useSelector } from "react-redux";
import SaveInvoice from "../../../components/SaveInvoice";
import { PrinterFilled } from "@ant-design/icons";
import CreateNewInvoice from "../../../components/CeateNewInvoice";

export default function Template6() {
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
                <div className='template6' ref={componentRef} style={{ position: 'relative' }}>
                    <div className='invo-header6'>
                        <div className="inh-top6">
                            <section className='brand6'>
                                <section className="logo6">
                                    <img src={user.logo || upload} alt="logo" />
                                </section>
                                <section className='brandname6'>
                                    <h1 className="text-2xl font-semibold">{store.name}</h1>
                                    <p className="text-sm">{store.gst}</p>
                                </section>
                            </section>
                            <h1 className='heading6 font-semibold text-5xl' >INVOICE</h1>
                        </div>
                        <div className="inh-bottom6">
                            <section><h4 className="font-semibold">Invoice no.</h4><p>{invoice.invoiceNumber}</p></section>
                            <section><h4 className="font-semibold">Date</h4><p>{invoice.invoiceDate}</p></section>
                        </div>
                    </div>
                    <div className="invo-details6">
                        <div className="invo-to6">
                            <h4 className='invd-head font-semibold'>Bill to</h4>
                            <p>{customer.name}</p>
                            <p>{customer.phone}</p>
                            <p>{customer.email}</p>
                        </div>
                        <div className="invo-from6">
                            <h4 className='invd-head font-semibold'>Bill from</h4>
                            <p>{store.name}</p>
                            <p>Phone: {store.phone}</p>
                            <p>Email: {store.email}</p>
                        </div>
                    </div>
                    <div className="items6">
                        <div className="tab-head6">
                            <p>Description</p>
                            <p>Quantity</p>
                            <p>Price(₹)</p>
                            <p>Total(₹)</p>
                        </div>
                        {
                            invoice.items.map((item, index) => (
                                <div key={index} className={"tab-row6"}>
                                    <p>{item.name}</p>
                                    <p>{item.quantity}</p>
                                    <p>{item.price}</p>
                                    <p>{item.total}</p>
                                </div>
                            ))
                        }
                        <span className="flex justify-end mt-5  gap-2 py-1">
                            <h4 className="font-semibold">Subtotal(₹)</h4>
                            <p className="min-w-[130px] text-center">{invoice.subtotal }</p>
                        </span>
                    </div>

                    <div className="item-footer6">
                        <div className="if-payMethod6">
                            <h5 className="font-semibold">Payment Details</h5>
                            <section><p>Payment mode</p><p>{invoice.paymentMode}</p></section>
                            <section><p>Amount Paid(₹)</p><p>{invoice.amountPaid}</p></section>
                        </div>
                        <div className="if-total6">
                            <section><h5 className="font-semibold">CGST(%)</h5><p>{invoice.cgst}</p></section>
                            <section><h5 className="font-semibold">SGST(%)</h5><p>{invoice.sgst}</p></section>
                            <section><h5 className="font-semibold">Total(₹)</h5><p>{invoice.finalAmount}</p></section>
                        </div>
                    </div>
                    <div className="invo-footer6">
                        <section>
                            <h3 className="font-semibold text-2xl">Thank you !</h3>
                            <p>
                                Thank you for trusting us with your business.
                                We&apos;re honored to serve you and look forward to continuing our partnership.
                            </p>
                        </section>
                        <section className='auth-sign'>
                            <p className="font-semibold">Authorised Signature</p>
                        </section>
                    </div>
                    <div className="footer-line w-full" style={{ position: 'absolute', bottom: 0, left: 0 }}>
                        <p>{store.phone}</p>
                        <p>{store.email}</p>
                        <p>{store.address}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
