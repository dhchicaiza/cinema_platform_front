import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MovieCard.scss'

/**
 * Props interface for MovieCard component
 */
interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    // 👇 1. CORRECCIÓN: Tu API envía 'averageRating'
    averageRating: number; 
    poster?: string;
    image?: string;
  };
  onRemoveFavorite: (movieId: string) => void;
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
// 👇 2. CORRECCIÓN: Recibe 'onRemoveFavorite' como prop
const MovieCard: React.FC<MovieCardProps> = ({ movie, onRemoveFavorite }) => {
  const navigate = useNavigate()

  /**
   * Renders star rating display
   */
  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating); 
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < roundedRating ? 'filled' : ''}`}
      >
        ★
      </span>
    ))
  }

  /**
   * Handles navigation to movie details page
   */
  const handleViewMovie = () => {
    navigate('/view-movie', { state: { movie: movie } })
  }

  /**
   * Handles deleting the movie from favorites
   * Calls the onRemoveFavorite prop passed from the parent.
   */
  const handleDeleteMovie = () => {
    onRemoveFavorite(movie.id);
  }

  return (
    <div className="movie-card">
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__rating" aria-label={`Calificación: ${Math.round(movie.averageRating)} de 5 estrellas`}>
          {renderStars(4)}
        </div>
        <button 
          className="movie-card__button"
          onClick={handleViewMovie}
          aria-label={`Ver detalles de ${movie.title}`}
        >
          Ver
        </button>
        <button 
          className="movie-card__button movie-card__button--delete"
          onClick={handleDeleteMovie}
          aria-label={`Eliminar ${movie.title} de favoritos`}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default MovieCard