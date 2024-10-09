import CustomerForm from './CustomerForm';
import InvoiceForm from './InvoiceForm';
import PreviewForm from './PreviewForm';
import InvoiceTemplates from './InvoiceTemplates';
import FinishForm from './FinishForm';
import { FileAddOutlined, UserOutlined, SolutionOutlined,FileDoneOutlined, FileTextOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message, Steps } from 'antd';
import { decrementStep, incrementStep, setDataFlag, } from '../../features/Slices/invoiceSlice';

export default function InvoicePage() {
  const step = useSelector(state => state.invoice.step);
  const dataFlag = useSelector(state => state.invoice.dataFlag);
  const dispatch = useDispatch();


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <CustomerForm />;
      case 1:
        return <InvoiceForm />;
      case 2:
        return <PreviewForm />;
      case 3:
        return <InvoiceTemplates />;
      case 4:
        return <FinishForm />;
      default:
        return <CustomerForm />;
    }
  };

  const handleNext = () => {
    if (dataFlag === false) {
      switch (step) {
        case 0:
          message.warning("Please select a customer.");
          return;
        case 1:
          message.warning("Click Mark as done to proceed.");
          return;
        case 2:
          message.warning("Please confirm the dtails.");
          return;
        case 3:
          message.warning("Please select the template first.");
          return;

      }
    }
    dispatch(incrementStep());
  }
  const handlePrevious = () => {
    dispatch(decrementStep());
    if (step <= 2) {
      dispatch(setDataFlag(false));
    }
  }

  return (
    <main className="w-full p-2 overflow-hidden" >
      <header className='mb-5'>
        <span>
          <FileAddOutlined className="text-4xl mr-2" />
        </span>
        <span>
          <span className="text-3xl font-semibold">Create Invoice</span>
          <p className="text-sm">Create and manage invoices for your clients.</p>
        </span>
      </header>
      <div className="md:px-10 px-5">
        <Steps current={step} status="process" size="small" responsive={false}>
          <Steps.Step icon={<UserOutlined/>}  title={window.innerWidth < 768 ? "":"Customer Details"} />
          <Steps.Step icon={<FileTextOutlined />} title={window.innerWidth < 768 ? "":"Invoice Detail"} />
          <Steps.Step icon={<SolutionOutlined/>} title={window.innerWidth < 768 ? "":"Confirm Detail"} />
          <Steps.Step icon={<FileSearchOutlined />} title={window.innerWidth < 768 ? "":"Select Template"} />
          <Steps.Step icon={<FileDoneOutlined />} title={window.innerWidth < 768 ? "":"Finish"} />
        </Steps>
      </div>
      <div className="mt-5">
          {renderStepContent(step)}
        </div>

      <section className='w-full flex justify-between h-[100px]'>
        <Button 
          onClick={handlePrevious} 
          disabled={step > 0 ? false:true}>
            prev
        </Button>
        <Button 
          type="primary"
          onClick={handleNext}
          disabled={step == 4 ? true:false}
          style={{marginLeft:"5px"}}>
            next
        </Button>
      </section>
      
    </main>
  )
}
