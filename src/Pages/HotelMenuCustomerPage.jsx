import React from 'react'
import HotelMenuCustomer from '../components/Customer/HotelMenuCustomer'
import Footer from '../components/footer';
import Navbar from '../components/navbar';

function HotelMenuCustomerPage() {
  return (
    <div>

      <div>
        <Navbar/>
      </div>

   <HotelMenuCustomer/>

   <div className='absolute inset-x-0 bottom-0'>
        <Footer/>
      </div>
    </div>

  )
}

export default HotelMenuCustomerPage