import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

function Root() {
  return (
<Suspense fallback={<div>Loading...</div>}>
    <div className='root-elememt'>
     <Outlet/>
    </div>
</Suspense>

  )
}

export default Root