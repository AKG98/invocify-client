export function getPaymentModeData(invoicesData) {
    const paymentModesCount = {};
  
    invoicesData.forEach((invoice) => {
      const mode = invoice.paymentMode.toLowerCase(); // Handle case insensitivity
      paymentModesCount[mode] = (paymentModesCount[mode] || 0) + 1;
    });
  
    return [
      { labelName: 'Cash', value: paymentModesCount['cash'] || 0 },
      { labelName: 'UPI', value: paymentModesCount['upi'] || 0 },
      { labelName: 'Card', value: paymentModesCount['card'] || 0 },
      { labelName: 'Net Banking', value: paymentModesCount['net banking'] || 0 }, // Assuming online payment includes net banking
    ];
  }
  
  export function getInvoiceStatusData(invoicesData) {
    const invoiceStatusCount = {};
  
    invoicesData.forEach((invoice) => {
      const status = invoice.paymentStatus.toLowerCase(); // Handle case insensitivity
      invoiceStatusCount[status] = (invoiceStatusCount[status] || 0) + 1;
    });
  
    return [
      { labelName: 'Paid', value: invoiceStatusCount['paid'] || 0 },
      { labelName: 'Pending', value: invoiceStatusCount['pending'] || 0 },
    ];
  }
  