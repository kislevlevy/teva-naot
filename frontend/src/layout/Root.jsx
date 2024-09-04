import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Navbar from '../components/Navbar'
// import React from 'react'
function Root() {
  return (
    <>
<Suspense fallback={<div>Loading...</div>}>
<Navbar/>
  <Outlet/>
</Suspense>   
    </>

  )
}

export default Root