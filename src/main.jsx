import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Cards from './components/Cards'


createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <Cards />
  //</StrictMode>,
)
