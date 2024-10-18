import React from 'react'
import HotelMenu from '../components/Restaurant Manager/HotelMenu'
import Footer from '../components/footer';
import Navbar from '../components/navbar';


function HotelMenuPage() {
  return (
    
    <div>
      <Navbar/>
       <HotelMenu/>

       <div className='absolute inset-x-0 bottom-0'>
        <Footer/>
      </div>

    </div>
  )
}

export default HotelMenuPage