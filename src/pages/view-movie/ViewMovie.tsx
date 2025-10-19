import React from 'react'
import { useLocation } from 'react-router-dom'
import './ViewMovie.scss'

/**
 * Movie data interface for ViewMovie component
 * @interface MovieData
 */
interface MovieData {
  /** Movie title */
  title: string
  /** Movie description */
  description: string
  /** Movie duration in minutes */
  duration: number
  /** Array of movie genres */
  genre?: string[]
  /** Optional video URL for playback */
  videoUrl?: string
  /** Optional movie poster image URL */
  poster?: string
  /** Optional alternative movie image URL */
  image?: string
  /** Additional movie properties (can be extended as needed) */
  [key: string]: any
}

/**
 * ViewMovie Page Component
 * 
 * Displays a movie player page with video playback and movie information.
 * This page is accessed when users click on a movie from catalog, favorites,
 * or search results. It shows the movie video (if available) along with
 * detailed information about the movie.
 * 
 * Features:
 * - Video player with controls and poster image
 * - Movie title and description display
 * - Movie metadata (duration, genres)
 * - Fallback handling for missing video content
 * - Error state for movies not found
 * - Responsive design for different screen sizes
 * 
 * Data Source:
 * - Receives movie data via React Router navigation state
 * - Handles cases where no movie data is provided
 * 
 * @component
 * @returns {React.ReactElement} Complete movie viewing page with player and info
 * 
 * @example
 * // Navigation to ViewMovie with movie data
 * navigate('/view-movie', { state: { movie: movieData } })
 * 
 * @example
 * // Route usage in React Router
 * <Route path="/view-movie" element={<ViewMovie />} />
 * 
 * @remarks
 * - Page uses the Layout component for consistent header/footer
 * - Movie data is passed via React Router location state
 * - Video player supports HTML5 video with controls
 * - Fallback message displayed when video is not available
 * - Error page shown when no movie data is provided
 * - Styled with SCSS using BEM methodology
 * - Accessible via /view-movie route
 */
const ViewMovie: React.FC = () => {
  const location = useLocation()
  const movie: MovieData | undefined = location.state?.movie

  /**
   * Error state component when no movie data is available
   * @returns {React.ReactElement} Error message component
   */
  const renderErrorState = () => {
    return (
      <div className="view-movie">
        <div className="view-movie__container">
          <div className="view-movie__header">
            <h1 className="view-movie__title">Película no encontrada</h1>
            <p>No se encontró información de la película</p>
          </div>
        </div>
      </div>
    )
  }

  /**
   * Video player component with fallback handling
   * @param {MovieData} movieData - Movie data containing video URL and poster
   * @returns {React.ReactElement} Video player or fallback message
   */
  const renderVideoPlayer = (movieData: MovieData) => {
    return movieData.videoUrl ? (
      <video 
        src={movieData.videoUrl} 
        controls 
        className="view-movie__video"
        poster={movieData.poster || movieData.image}
      />
    ) : (
      <div 
        className="view-movie__video" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#9ca3af',
          fontSize: '1.2rem'
        }}
      >
        Video no disponible
      </div>
    )
  }

  // Show error state if no movie data is available
  if (!movie) {
    return renderErrorState()
  }

  return (
    <div className="view-movie">
      <div className="view-movie__container">
        <div className="view-movie__header">
          <h1 className="view-movie__title">Reproductor</h1>
        </div>

        <div className="view-movie__content">
          <div className="view-movie__video-section">
            {renderVideoPlayer(movie)}
          </div>

          <div className="view-movie__info">
            <h2 className="view-movie__movie-title">{movie.title}</h2>
            <p className="view-movie__description">{movie.description}</p>
            
            <div className="view-movie__meta">
              <div className="view-movie__meta-item">
                <span className="view-movie__meta-label">Duración:</span>
                <span className="view-movie__meta-value">{movie.duration} minutos</span>
              </div>
              
              <div className="view-movie__meta-item">
                <span className="view-movie__meta-label">Géneros:</span>
                <div className="view-movie__genres">
                  {movie.genre?.map((genre: string, index: number) => (
                    <span key={index} className="view-movie__genre">{genre}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewMovie