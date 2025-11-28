import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import UploadMemePage from './pages/UploadMemePage.jsx' // IMPORT KOMPONEN BARU
import './App.css'

function App() {
  const [count, setCount] = useState(0) // State count tetap

  // Hapus state name, email, dan fungsi handleSubmit lama.
  // Fungsionalitas upload ada di UploadMemePage.jsx

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={appLogo} className="logo" alt="TA-Prak-PPB logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Meme Uploader Supabase</h1> 
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Tampilkan komponen Upload Meme */}
      <UploadMemePage /> 

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <PWABadge />
    </>
  )
}

export default App