import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import Profile from '../pages/profile/Profile'
import Catalog from '../pages/catalog/Catalog'
import About from '../pages/about/About'
import NotFound from '../pages/not-found/NotFound'
import Layout from '../layout/Layout'
import MapaDelSitio from '../pages/mapa-del-sitio/MapaDelSitio'
import Contraseña from '../pages/contraseña/Contraseña'
import RecuperarContraseña from '../pages/recuperar-contraseña/RecuperarContraseña'

/**
 * RoutesCinemaPlatform Component
 * 
 * Main routing configuration for the CinePlatform application.
 * Defines all application routes and wraps them in the Layout component
 * for consistent header/footer structure across all pages.
 * 
 * Routes:
 * - `/` - Home page (landing page with welcome and team section)
 * - `/login` - User login page
 * - `/register` - New user registration page
 * - `/profile` - User profile management page (requires authentication)
 * - `/catalog` - Movie catalog page (requires authentication)
 * - `/about` - About page (placeholder)
 * - `/contraseña` - Password recovery request page
 * - `/reset-password` - Password reset page (with token)
 * - `/mapa-del-sitio` - Site map page
 * - `*` - 404 Not Found page (catch-all route)
 * 
 * @component
 * @returns {React.ReactElement} The complete routing structure with BrowserRouter
 * 
 * @example
 * // Used as the root component in main.tsx
 * <RoutesCinemaPlatform />
 * 
 * @remarks
 * - Uses React Router v6 for client-side routing
 * - All routes are wrapped in Layout component for consistent structure
 * - Protected routes (catalog, profile) should check authentication status
 * - Catch-all route (*) handles 404 errors for undefined paths
 * - Uses BrowserRouter for clean URLs without hash (#)
 */
const RoutesCinemaPlatform: React.FC = () => {
  return (
  <BrowserRouter>
  <Layout> 
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/catalog' element={<Catalog />} />
      <Route path='/about' element={<About />} />
      <Route path='/contraseña' element={<Contraseña />} />
      <Route path='/reset-password' element={<RecuperarContraseña />} />
      <Route path='/mapa-del-sitio' element={<MapaDelSitio />} />
      <Route path='*' element={<NotFound />} /> //renderiza la pagina 404 si no se encuentra la ruta
    </Routes>
  </Layout>
  </BrowserRouter>
  )
}

export default RoutesCinemaPlatform