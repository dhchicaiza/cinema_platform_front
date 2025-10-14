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