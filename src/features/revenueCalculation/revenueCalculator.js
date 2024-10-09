export function calculateLastMonthRevenue(invoices) {
    if (!invoices || invoices.length === 0) return 0;
  
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthYear = lastMonth.getFullYear();
    const lastMonthNumber = lastMonth.getMonth();
  
    const lastMonthRevenue = invoices.reduce((total, invoice) => {
      const invoiceDate = new Date(invoice.invoiceDate);
      // Trim and parse the grandTotal, removing leading zeros
      const trimmedTotal = parseFloat(invoice.grandTotal.toString().trim());
      if (invoiceDate.getFullYear() === lastMonthYear && invoiceDate.getMonth() === lastMonthNumber) {
        return total + trimmedTotal;
      }
      return total;
    }, 0);
  
    return lastMonthRevenue;
  }
  
  
  export function calculateCurrentMonthRevenue(invoices) {
    if (!invoices || invoices.length === 0) return 0;
  
    const currentMonth = new Date();
    const currentMonthYear = currentMonth.getFullYear();
    const currentMonthNumber = currentMonth.getMonth();
  
    const currentMonthRevenue = invoices.reduce((total, invoice) => {
      const invoiceDate = new Date(invoice.invoiceDate);
      // Trim and parse the grandTotal, removing leading zeros
      const trimmedTotal = parseFloat(invoice.grandTotal.toString().trim());
      if (invoiceDate.getFullYear() === currentMonthYear && invoiceDate.getMonth() === currentMonthNumber) {
        return total + trimmedTotal;
      }
      return total;
    }, 0);
  
    return currentMonthRevenue;
  }
  
export function prepareGraphData(invoices) {
    if (!invoices || !Array.isArray(invoices)) {
      return Array(12).fill(0).map((_, index) => ({
        month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, index)),
        revenue: 0,
      }));
    }
  
    const monthlyRevenue = Array(12).fill(0);
  
    invoices.forEach(invoice => {
      const invoiceDate = new Date(invoice.invoiceDate);
      const monthIndex = invoiceDate.getMonth();
      const trimmedTotal = parseFloat(invoice.grandTotal?.toString().trim()) || 0; // Handle null/undefined
      monthlyRevenue[monthIndex] += trimmedTotal;
    });
  
    const data = monthlyRevenue.map((revenue, index) => ({
      month: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, index)),
      revenue: revenue > 0 ? revenue : 0,
    }));
  
    return data;
  }
  