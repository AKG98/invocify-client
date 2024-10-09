import { Button } from 'antd'
import { FileAddFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { setResetInvoiceSlice } from '../features/Slices/invoiceSlice';


export default function CreateNewInvoice() {
    const dispatch = useDispatch();

    const handleResetForm = () => {
        dispatch(setResetInvoiceSlice());
    }

  return (
    <Button 
        
        icon={<FileAddFilled />}
        onClick={handleResetForm}
        
        >
            Create New
    </Button>
  )
}
