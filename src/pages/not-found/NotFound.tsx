import React from 'react'
import './NotFound.scss'

/**
 * NotFound (404) Page Component
 * 
 * Error page displayed when users navigate to a non-existent route.
 * Provides feedback that the requested page was not found.
 * 
 * @component
 * @returns {React.ReactElement} The 404 error page
 * 
 * @example
 * // Rendered through React Router as catch-all route
 * <Route path="*" element={<NotFound />} />
 * 
 * @remarks
 * - Currently a placeholder component
 * - Future: Will include helpful navigation links back to main sections
 * - Should feature user-friendly error message and design
 */
const NotFound: React.FC = () => {
  return (
    <div>NotFound</div>
  )
}

export default NotFound