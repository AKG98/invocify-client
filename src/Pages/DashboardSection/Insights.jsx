import { Bar } from '@ant-design/plots';
import { getInvoiceStatusData, getPaymentModeData } from '../../features/insightCalculation/insightCalculator';

export default function BarChartComponent({ invoicesData }) {
  const paymentMode = getPaymentModeData(invoicesData); // Get payment mode data
  const invoiceStatus = getInvoiceStatusData(invoicesData); // Get invoice status data

  // Calculate max values for dynamic domains
  const paymentModeMaxValue = paymentMode.reduce((acc, curr) => acc + curr.value, 0);
  const invoiceStatusMaxValue = invoiceStatus.reduce((acc, curr) => acc + curr.value, 0);

  const payConfig = {
    data: paymentMode,
    xField: 'labelName',
    yField: 'value',
    paddingRight: 80,
    barWidth: 15,
    scale: {
      y: {
        domain: [0, paymentModeMaxValue], // Set dynamic domain for payment mode
      },
    },
    interaction: {
      elementHighlight: false,
    },
  };

  const invoiceConfig = {
    data: invoiceStatus,
    xField: 'labelName',
    yField: 'value',
    paddingRight: 80,
    barWidth: 15,
    scale: {
      y: {
        domain: [0, invoiceStatusMaxValue], // Set dynamic domain for invoice status
      },
    },
    interaction: {
      elementHighlight: false,
    },
  };

  return (
    <div className="mt-3 bg-white p-5 md:w-1/2 rounded-xl border-2">
      <h1 className='font-semibold'>Some useful insights</h1>
      <Bar {...payConfig} height={150}/>
      <h1 className='text-sm opacity-25'>Invoice status</h1>
      <Bar {...invoiceConfig} height={100} />
    </div>
  );
}
