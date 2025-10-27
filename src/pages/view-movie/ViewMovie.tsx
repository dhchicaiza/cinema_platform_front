import React, { useRef } from 'react'
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
  /** Alternative video URL property */
  url?: string
  /** Optional movie poster image URL */
  poster?: string
  /** Optional subtitles URLs */	
  subtitles?: {
    spanish?: string
    english?: string
  }
  /** Optional alternative movie image URL */
  image?: string
  /** Additional movie properties (can be extended as needed) */
  [key: string]: any
}

/**
 * Comment interface for display
 * @remarks Uncomment when implementing comment functionality
 */
// interface Comment {
//   /** Comment ID */
//   id: string
//   /** Comment content */
//   content: string
//   /** User who made the comment */
//   user: {
//     name: string
//     avatar?: string
//     initials: string
//   }
//   /** Timestamp */
//   createdAt: string
//   /** Whether comment was edited */
//   edited?: boolean
// }

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [subtitleLanguage, setSubtitleLanguage] = React.useState<'es' | 'en' | 'off'>('off')

  console.log(movie)

  /**
   * Handle subtitle language change
   */
  const handleSubtitleChange = (lang: 'es' | 'en' | 'off') => {
    setSubtitleLanguage(lang)
    
    if (videoRef.current && videoRef.current.textTracks) {
      // Hide all tracks first
      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
        const track = videoRef.current.textTracks[i]
        track.mode = 'hidden'
      }
      
      // Show selected track
      if (lang !== 'off') {
        for (let i = 0; i < videoRef.current.textTracks.length; i++) {
          const track = videoRef.current.textTracks[i]
          console.log('Track found:', i, 'language:', track.language, 'kind:', track.kind)
          // Match by index: 0 = spanish (es), 1 = english (en)
          const shouldShow = (lang === 'es' && i === 0) || (lang === 'en' && i === 1)
          if (shouldShow) {
            track.mode = 'showing'
            console.log('Subtitle track activated:', track.language)
            break
          }
        }
      }
    }
  }

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
    const videoUrl = movieData.videoUrl || movieData.url;
    const spanishSubtitles = movieData.subtitles?.spanish;
    const englishSubtitles = movieData.subtitles?.english;
    const hasSubtitles = spanishSubtitles || englishSubtitles;
    
    return videoUrl ? (
      <div className="view-movie__player-wrapper">
        <video 
          ref={videoRef}
          controls 
          className="view-movie__video"
          poster={movieData.poster || movieData.image}
          crossOrigin="anonymous"
        >
          <source src={videoUrl} type="video/mp4" />
          {spanishSubtitles && (
            <track
              kind="subtitles"
              srcLang="es"
              label="Español"
              src={spanishSubtitles}
            />
          )}
          {englishSubtitles && (
            <track
              kind="subtitles"
              srcLang="en"
              label="English"
              src={englishSubtitles}
            />
          )}
        </video>
        {hasSubtitles && (
          <div className="view-movie__subtitle-controls">
            <p className="view-movie__subtitle-label">Subtítulos:</p>
            <div className="view-movie__subtitle-buttons">
              <button 
                onClick={() => handleSubtitleChange('es')}
                className={`view-movie__subtitle-btn ${subtitleLanguage === 'es' ? 'view-movie__subtitle-btn--active' : ''}`}
                disabled={!spanishSubtitles}
                title="Español"
              >
           
                ESP
              </button>
              <button 
                onClick={() => handleSubtitleChange('en')}
                className={`view-movie__subtitle-btn ${subtitleLanguage === 'en' ? 'view-movie__subtitle-btn--active' : ''}`}
                disabled={!englishSubtitles}
                title="English"
              >

                ENG
              </button>
              <button 
                onClick={() => handleSubtitleChange('off')}
                className={`view-movie__subtitle-btn view-movie__subtitle-btn--off ${subtitleLanguage === 'off' ? 'view-movie__subtitle-btn--active' : ''}`}
                title="Sin Subtítulos"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                OFF
              </button>
            </div>
          </div>
        )}
      </div>
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

        {/* Comments Section */}
        <div className="view-movie__comments-section">
          <h2 className="view-movie__comments-title">Comentarios</h2>
          
          {/* Comment Input Area */}
          <div className="view-movie__comment-form">
            <h3 className="view-movie__comment-form-title">Comparte tu opinión</h3>
            <textarea
              className="view-movie__comment-input"
              placeholder="¿Qué te pareció esta película? Comparte tu experiencia..."
              rows={4}
            />
            <button className="view-movie__comment-submit">
              Publicar Comentario
            </button>
          </div>

          {/* Comments List */}
          <div className="view-movie__comments-list">
            {/* Comment Card 1 */}
            <div className="view-movie__comment-card">
              <div className="view-movie__comment-header">
                <div className="view-movie__comment-user">
                  <div className="view-movie__comment-avatar">
                    <span>LS</span>
                  </div>
                  <div className="view-movie__comment-user-info">
                    <p className="view-movie__comment-name">Laura Salazar</p>
                    <p className="view-movie__comment-time">
                      hace 2 horas
                      {false && <span className="view-movie__comment-edited">Editado</span>}
                    </p>
                  </div>
                </div>
                <div className="view-movie__comment-actions">
                  <button className="view-movie__comment-action view-movie__comment-action--edit">
                    Editar
                  </button>
                  <button className="view-movie__comment-action view-movie__comment-action--delete">
                    Eliminar
                  </button>
                </div>
              </div>
              <p className="view-movie__comment-text">
                Una película visualmente espectacular que redefine lo que es posible en el cine. Los años de espera valieron la pena.
              </p>
            </div>

            {/* Comment Card 2 */}
            <div className="view-movie__comment-card">
              <div className="view-movie__comment-header">
                <div className="view-movie__comment-user">
                  <div className="view-movie__comment-avatar">
                    <span>LI</span>
                  </div>
                  <div className="view-movie__comment-user-info">
                    <p className="view-movie__comment-name">Laura Isabel</p>
                    <p className="view-movie__comment-time">
                      hace 1 día
                      <span className="view-movie__comment-edited">Editado</span>
                    </p>
                  </div>
                </div>
                <div className="view-movie__comment-actions">
                  <button className="view-movie__comment-action view-movie__comment-action--edit">
                    Editar
                  </button>
                  <button className="view-movie__comment-action view-movie__comment-action--delete">
                    Eliminar
                  </button>
                </div>
              </div>
              <p className="view-movie__comment-text">
                Una película visualmente espectacular que redefine lo que es posible en el cine. Los años de espera valieron la pena.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewMovie