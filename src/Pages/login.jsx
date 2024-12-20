import React from 'react'
import Login from '../components/Login'

function login() {
  return (
    <div>
      <div
        className="absolute inset-0 bg-orange-50"
        style={{ zIndex: -1 }}
      >
        <div
          style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-circular-food-frame_23-2148723455.jpg?t=st=1734521074~exp=1734524674~hmac=7b00696977e1fa6c8169ef3c5887450344265f9875995ffb44368c528f9e7520&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, height: '100%' }}
        ></div>
      </div>
      <Login/>
    </div>
  )
}

export default login