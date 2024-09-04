import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card m-50 p-60 flex-row justify-center align-middle">
        <button className="bg-red-600 p-2 text-xl font-bold underline" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {<Footer/>}
      </div>
    </>
  )
}

export default App
