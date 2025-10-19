import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MovieCard.scss'

/**
 * Props interface for MovieCard component
 * @interface MovieCardProps
 */
interface MovieCardProps {
  /** Movie object containing all necessary information */
  movie: {
    /** Unique identifier for the movie */
    id: number
    /** Movie title */
    title: string
    /** Movie rating from 0 to 5 stars */
    rating: number
    /** Optional movie poster image URL */
    poster?: string
    /** Optional alternative movie image URL */
    image?: string
  }
}

/**
 * MovieCard Component
 * 
 * A reusable component that displays movie information in a card format.
 * Designed specifically for the favorites page with a dark theme and purple accent colors.
 * 
 * Features:
 * - Displays movie title, rating with stars, and a "Ver" (View) button
 * - Renders up to 5 stars based on the movie's rating
 * - Navigates to movie details page when "Ver" button is clicked
 * - Responsive design that adapts to different screen sizes
 * - Hover effects and smooth transitions
 * 
 * @component
 * @param {MovieCardProps} props - Component props
 * @param {Object} props.movie - Movie data object
 * @param {number} props.movie.id - Unique movie identifier
 * @param {string} props.movie.title - Movie title
 * @param {number} props.movie.rating - Movie rating (0-5)
 * @param {string} [props.movie.poster] - Optional poster image URL
 * @param {string} [props.movie.image] - Optional alternative image URL
 * @returns {React.ReactElement} Movie card component with title, rating stars, and view button
 * 
 * @example
 * // Basic usage with required movie data
 * <MovieCard 
 *   movie={{
 *     id: 1,
 *     title: "Avatar: La leyenda de Aang",
 *     rating: 4
 *   }} 
 * />
 * 
 * @example
 * // Usage with optional poster image
 * <MovieCard 
 *   movie={{
 *     id: 2,
 *     title: "Avatar 2: La leyenda de Korra",
 *     rating: 4,
 *     poster: "/images/avatar2-poster.jpg"
 *   }} 
 * />
 * 
 * @remarks
 * - Used primarily in the favorites page to display favorite movies
 * - Stars are rendered as filled (yellow) or empty (gray) based on rating
 * - Clicking the "Ver" button navigates to the movie details page
 * - Component is fully responsive and includes hover animations
 * - Styled with SCSS using BEM methodology
 */
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate()

  /**
   * Renders star rating display
   * Creates an array of 5 stars where filled stars represent the movie rating
   * 
   * @param {number} rating - Movie rating from 0 to 5
   * @returns {React.ReactElement[]} Array of star span elements
   */
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ))
  }

  /**
   * Handles navigation to movie details page
   * Passes the movie data as state to the destination route
   */
  const handleViewMovie = () => {
    navigate('/view-movie', { state: { movie: movie } })
  }

  return (
    <div className="movie-card">
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__rating">
          {renderStars(movie.rating)}
        </div>
        <button 
          className="movie-card__button"
          onClick={handleViewMovie}
        >
          Ver
        </button>
      </div>
    </div>
  )
}

export default MovieCard
