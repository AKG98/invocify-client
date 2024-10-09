import StatisticsC from './StatisticsC';
import Graph from './Graph';
import Insights from './Insights';
import { useSelector } from 'react-redux';
import { useGetStoresQuery } from '../../features/Slices/storesApi';
import { useGetClientsQuery } from '../../features/Slices/clientApi';
import { useGetInvoicesQuery } from '../../features/Slices/invoiceApi';
import { calculateCurrentMonthRevenue, calculateLastMonthRevenue, prepareGraphData } from '../../features/revenueCalculation/revenueCalculator';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';



export default function Dashboard() {
  const user = useSelector((state) => state.user.user);
  const stores = useGetStoresQuery(user._id);
  const clients = useGetClientsQuery(user._id);
  const { data: invoicesData, error: invoicesError, isLoading } = useGetInvoicesQuery(user._id);
  const [graphData, setGraphData] = useState();

  // Get the total number of stores, clients and invoices
  const totalStores = stores.data?.length;
  const totalClients = clients.data?.length;

  // Get revenues for last month and this month
  const lastMonthRevenue = calculateLastMonthRevenue(invoicesData);
  const currentMonthRevenue = calculateCurrentMonthRevenue(invoicesData);

  // Prepare graph data
  useEffect(() => {
    if (invoicesError) {
      console.error("Error fetching invoices:", invoicesError);
      return;
    }
  
    if (invoicesData) {
      const dataset = prepareGraphData(invoicesData);
      setGraphData(dataset);
    }
  }, [invoicesData, invoicesError]);
  
  if (isLoading) {
    return <Spinner />;
  }


  return (
    <div className="w-full h-auto p-2 mb-10">
      <header className='mb-5'>
        <span className="text-2xl">Hello,</span>
        <span className="text-2xl font-semibold"> {user.name}</span>
        <p className="text-sm">Here is the summary of your business.</p>
      </header>
      <StatisticsC  storeCount={totalStores} clientCount={totalClients}  lastMonthRevenue={lastMonthRevenue} currentMonthRevenue={currentMonthRevenue}/>
      <div className='flex md:flex-row flex-col justify-between gap-2'>

      <Graph graphData={graphData || []}/>
      <Insights invoicesData={invoicesData || []}/>
      </div>
      <br />
      
    </div>
  );
}
