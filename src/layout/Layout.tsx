import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

const Layout = (props: { children: React.ReactNode }) => {
  return (
   <>
    < Header />
    <main>{props.children}</main>
    < Footer />
   </>
  )
}

export default Layout