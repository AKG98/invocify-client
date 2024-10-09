import React from 'react'
import Header from './Header'
import CustomerTable from './CustomerTable'

export default function Customers() {
  return (
    <main className='w-full p-2'>
      <Header />
      <CustomerTable />
    </main>
  )
}
