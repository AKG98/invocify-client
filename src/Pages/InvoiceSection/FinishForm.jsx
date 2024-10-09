import '../../styles/finishStyle.css'
import Template1 from './InvoiceTemplates/Template1'
import Template2 from './InvoiceTemplates/Template2'
import Template3 from './InvoiceTemplates/Template3'
import Template4 from './InvoiceTemplates/Template4'
import Template5 from './InvoiceTemplates/Template5'
import Template6 from './InvoiceTemplates/Template6'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function FinishForm() {
  const templateKey = useSelector((state) => state.invoice.templateKey);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (templateKey){
    setKey(templateKey);}
  }, [templateKey]);
    
  return (
    <div className="" >
  {(() => {
    switch(key) {
      case 0:
        return <Template1 />;
      case 1:
        return <Template2 />;
      case 2:
        return <Template3 />;
      case 3:
        return <Template4 />;
      case 4:
        return <Template5 />;
      case 5:
        return <Template6 />;
      default:
        return <Template1 />;
    }
  })()}
  
</div>

  )
}
