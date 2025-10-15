import React from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

/**
 * Layout Component
 * 
 * Main layout wrapper component that provides consistent structure across all pages.
 * Includes:
 * - Header navigation (top)
 * - Main content area (middle)
 * - Footer (bottom)
 * 
 * This component ensures all pages have the same header/footer structure
 * while allowing dynamic content in the main section.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to be rendered in the main section
 * @returns {React.ReactElement} The complete page layout with header, content, and footer
 * 
 * @example
 * // Wrapping a route in the Layout
 * <Layout>
 *   <Home />
 * </Layout>
 * 
 * @example
 * // Usage in React Router
 * <Route path="/" element={<Layout><Home /></Layout>} />
 * 
 * @remarks
 * - Used by all main application pages
 * - Header adapts based on user authentication state
 * - Footer provides consistent copyright and site map link
 * - Main content area expands to fill available space
 */
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