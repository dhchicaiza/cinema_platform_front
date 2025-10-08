import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import RoutesCinemaPlatform from './routes/RoutesCinemaPlatform'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesCinemaPlatform />
   
  </StrictMode>,
)
