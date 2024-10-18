import React from 'react'
import ItemMenu from '../components/Restaurant Manager/ItemMenu';
import Footer from '../components/footer';
import Navbar from '../components/navbar';


function ItemMenuPage() {
  return (

    <div>

    <div >
      <Navbar/>
    </div>


      < ItemMenu />
      <div className='absolute inset-x-0 bottom-0'>
        <Footer/>
      </div>

    </div>
  )
}

export default ItemMenuPage