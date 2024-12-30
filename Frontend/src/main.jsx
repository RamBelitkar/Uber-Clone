import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { UserContext } from './Context/UserContext.jsx' 
import { User } from 'lucide-react'
import { CaptainContext } from './Context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContext>
    <UserContext>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </UserContext>
    </CaptainContext>
  </StrictMode>
)
