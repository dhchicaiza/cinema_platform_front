import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Props interface for Movie component
 * @interface MovieProps
 */
interface MovieProps {
  /** Movie object containing all necessary information */
  movie: {
    /** Movie title */
    title: string
    /** Optional movie poster image URL */
    poster?: string
    /** Optional alternative movie image URL */
    image?: string
    /** Additional movie properties (can be extended as needed) */
    [key: string]: any
  }
}

/**
 * Movie Component
 * 
 * A simple movie display component that renders a clickable movie poster image.
 * When clicked, it navigates to the movie details page with the movie data.
 * This component is used in various parts of the application where movies
 * need to be displayed as clickable images.
 * 
 * Features:
 * - Displays movie poster/image with fallback to placeholder
 * - Clickable image that navigates to movie details
 * - Handles missing images with a default placeholder
 * - Passes movie data to the destination page via navigation state
 * 
 * @component
 * @param {MovieProps} props - Component props
 * @param {Object} props.movie - Movie data object
 * @param {string} props.movie.title - Movie title (used for alt text)
 * @param {string} [props.movie.poster] - Optional poster image URL
 * @param {string} [props.movie.image] - Optional alternative image URL
 * @param {any} [props.movie.*] - Additional movie properties
 * @returns {React.ReactElement} Clickable movie poster image
 * 
 * @example
 * // Basic usage with movie data
 * <Movie 
 *   movie={{
 *     title: "Avatar: La leyenda de Aang",
 *     poster: "/images/avatar-poster.jpg"
 *   }} 
 * />
 * 
 * @example
 * // Usage with fallback image
 * <Movie 
 *   movie={{
 *     title: "Test Movie",
 *     image: "/images/test-movie.jpg"
 *   }} 
 * />
 * 
 * @remarks
 * - Used in catalog, search results, and other movie listing pages
 * - Image source priority: poster > image > placeholder
 * - Clicking navigates to /view-movie route with movie data
 * - Alt text uses movie title for accessibility
 * - Component is lightweight and focused on display/navigation
 */
const Movie: React.FC<MovieProps> = ({ movie }) => {
  const navigate = useNavigate()
 
  return (
    <img 
      src={movie.poster || movie.image || '/placeholder-movie.jpg'} 
      alt={movie.title} 
      onClick={() => { 
        navigate('/view-movie', { state: { movie: movie } })
      }} 
    />
  )
}

export default Movie