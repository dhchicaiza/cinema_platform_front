/**
 * @fileoverview Application Entry Point
 * @description Main file that initializes and renders the React application
 * @version 1.0.0
 * @author Cinema Platform Team
 * @since 2025-01-01
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import RoutesCinemaPlatform from './routes/RoutesCinemaPlatform'

/**
 * Application Bootstrap
 * 
 * Initializes the React application by:
 * 1. Finding the root DOM element
 * 2. Creating a React root
 * 3. Rendering the app in StrictMode
 * 4. Loading the routing configuration
 * 
 * StrictMode enables additional checks and warnings for development:
 * - Identifies components with unsafe lifecycles
 * - Warns about legacy string ref API usage
 * - Detects unexpected side effects
 * - Ensures reusable state
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesCinemaPlatform />
   
  </StrictMode>,
)
