import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DrumMachine from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Drum Machine</h1>
    <DrumMachine />
  </StrictMode>,
)
