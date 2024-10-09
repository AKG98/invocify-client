import { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Button, Popconfirm, Table } from "antd";
import "../../../styles/template1.css"
import { useSelector } from "react-redux";
import logo from "../../../assets/images/logoVector.jpg"
import SaveInvoice from "../../../components/SaveInvoice";
import { PrinterFilled } from "@ant-design/icons";
import CreateNewInvoice from "../../../components/CeateNewInvoice";

export default function Template1() {
  const user = useSelector((state) => state.user.user) || {};
  const customerData = useSelector((state) => state.invoice.customerData) || {};
  const storeData = useSelector((state) => state.invoice.storeData) || {};
  const invoiceData = useSelector((state) => state.invoice.invoiceData) || {};
  const [itemData, setItemData] = useState([]);
  const componentRef = useRef();
  const printRef = useRef();

  useEffect(() => {
    const data = [];
    invoiceData.items.forEach((item, index) => {
      data.push({
        key: index,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      });
    });
    setItemData(data);
  }, [invoiceData.items]);

  const columns = [
    {
      title: 'Item Description',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price(₹)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Total(₹)',
      dataIndex: 'total',
      key: 'total',
    },
  ];
  // Handle printing on confirm
  const handlePrint = () => {
    printRef.current.handlePrint(); // Manually trigger the print action
  };

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      {/* Print Button */}
      <div className='mb-4 flex gap-2'>
        <Popconfirm
          title="The invoice will be saved to local storage only."
          okText="Confirm"
          cancelText="Cancel"
          onConfirm={handlePrint}
        >
          <Button type="primary" icon={<PrinterFilled />}>Print/Download</Button>
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
        <div className='w-[794px] h-[1123px] bg-white ' ref={componentRef} style={{ position: 'relative' }}>
          <header className='p-[2.5vw] bg-indigo-50 '>
            <div id="upper" className='flex justify-between items-center mb-20'>
              <img src={user?.logo || logo} alt="" className='w-20 h-20' style={{ mixBlendMode: 'multiply' }} />
              <span>
                <h1 className='text-6xl'>INVOICE</h1>
                <p className='text-end'>{invoiceData.invoiceNumber || "Invoice Number"}</p>
              </span>
            </div>
            <div id="lower">
              <span className='flex gap-2 text-md'>
                <p className='font-semibold'>Invoice Date</p>
                <p>{invoiceData.invoiceDate || "dd-mm-yyyy"}</p>
              </span>
              <span className='flex gap-2 text-md'>
                <p className='font-semibold'>Payment Mode</p>
                <p>{invoiceData.paymentMode || "cash"}</p>
              </span>
            </div>
          </header>
          <main className='w-full flex justify-between gap-5 mt-5'>
            <div id="details" className='ps-[2.5vw] w-1/3 h-[750px] flex flex-col justify-around border-r border-black'>
              <section >
                <p className='font-semibold'>Invoice To :</p>
                <p className='font-semibold'>{customerData.name || "Customer Name"}</p>
                <p>{customerData.phone || "Customer Phone"}</p>
                <p>{customerData.email || "Customer Email"}</p>
                <p>{customerData.address || "Customer Address"}</p>
              </section>
              <section >
                <p className='font-semibold'>Invoice From :</p>
                <p className='font-semibold'>{storeData.name || "Company Name"}</p>
                <p>{storeData.phone || "Company Phone"}</p>
                <p>{storeData.email || "Company Email"}</p>
                <p>{storeData.address || "Company Address"}</p>
              </section>
            </div>
            <div className='pe-[2.5vw] w-3/4 h-[750px] flex flex-col justify-between'>
              <Table columns={columns} dataSource={itemData} pagination={false} className='temp1-table' />
              <section>
                <span className='flex justify-between'>
                  <p>Sub Total (₹)</p>
                  <p className='px-5 py-1 '>{invoiceData.subtotal || 0}</p>
                </span>
                <span className='flex justify-between'>
                  <p>Discount (%)</p>
                  <p className='px-5 py-1 '>{invoiceData.discount || 0}</p>
                </span>
                <span className='flex justify-between'>
                  <p>CGST (%)</p>
                  <p className='px-5 py-1 '>{invoiceData.cgst || 0}</p>
                </span>
                <span className='flex justify-between'>
                  <p>SGST(%)</p>
                  <p className='px-5 py-1 '>{invoiceData.sgst || 0}</p>
                </span>
                <span className='flex justify-between'>
                  <p>Grand Total (₹)</p>
                  <p className='px-5 py-1 bg-black text-white'>{invoiceData.finalAmount || "2200"}</p>
                </span>
              </section>
              <section>
                <h1 className='text-end font-semibold text-xl'>{user.name || "Avinash Gupta"}</h1>
                <h1 className='text-end text-sm'>(Avinash Gupta)</h1>
              </section>
            </div>
          </main>
          <footer className='bg-stone-800 text-white w-full text-center p-2' style={{ position: 'absolute', bottom: 0 }}>
            <p>This is computer generated bill requires no signature</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
