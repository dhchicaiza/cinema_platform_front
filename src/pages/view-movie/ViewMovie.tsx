import React, { useRef, useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import useUserStore from '../../stores/useUserStores'
import Modal from '../../components/modal/Modal'; 
import Alert from '../../components/alert/Alert';
import ConfirmAlert from '../../components/alert/ConfirmAlert';
import { SUCCESS_MESSAGES } from '../../constants';
import './ViewMovie.scss'

/**
 * Movie data interface for ViewMovie component
 * @interface MovieData
 */
interface MovieData {
  /**  movie id */
  id: string;
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
interface Comment {
   /** Comment ID */
   _id: string
   /** Comment content */
   content: string
   /** User who made the comment */
   userId: { 
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
   /** Timestamp */
   createdAt: string
   /** Whether comment was edited */
   edited?: boolean
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [subtitleLanguage, setSubtitleLanguage] = React.useState<'es' | 'en' | 'off'>('off')

  const { user } = useUserStore();
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); 
  const [editText, setEditText] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number>(0); 
  const [dbUserRating, setDbUserRating] = useState<number | null>(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false); 
  const [ratingError, setRatingError] = useState<string | null>(null);

  console.log(movie)
  console.log("Usuario logueado en ViewMovie:", user);

  /**
   * Fetch comments when component mounts or movie changes
   */
  useEffect(() => {
    if (movie && movie.id) {
      const token = localStorage.getItem('authToken');
      const fetchComments = async () => {
        try {
          setIsLoadingComments(true);
          setCommentError(null);
          
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/movie/${movie.id}`);
          if (!response.ok) {
            throw new Error("Failed to load comments.");
          }

          const data = await response.json();
          if (data.success && Array.isArray(data.data.comments)) {
            setComments(data.data.comments);
          } else {
            setComments([]);
          }
        } catch (err: any) {
          setCommentError(err.message);
        } finally {
          setIsLoadingComments(false);
        }
      };
      const fetchUserRating = async () => {
        if (user && token) {
          try {
            setRatingError(null);
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ratings/movie/${movie.id}/user`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data && data.data.hasRating) {
                setDbUserRating(data.data.rating);
              } else {
                setDbUserRating(null); 
              }
            } else if (response.status !== 404) { 
              console.error("Error fetching user rating:", response.statusText);
              setDbUserRating(null);
            } else {
                 setDbUserRating(null); 
            }
          } catch (err) {
            console.error("Error fetching user rating:", err);
            setDbUserRating(null); 
          }
        } else {
           setDbUserRating(null); 
        }
      };
      fetchUserRating();
      fetchComments();
    }
  }, [movie, user])

  const handleSubmitRating = async (ratingValue: number) => {
    const token = localStorage.getItem('authToken');
    if (!user || !token) {
        setRatingError("Debes iniciar sesión para calificar.");
        return;
    }
    if (!movie || !movie.id) {
        setRatingError("No se encontró la película para calificar.");
        return;
    }

    setIsSubmittingRating(true);
    setRatingError(null);

    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ratings`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ movieId: movie.id, rating: ratingValue })
        });

        const data = await response.json();
        console.log("Respuesta de guardar calificación:", data);

        if (!response.ok) {
            throw new Error(data.message || "No se pudo guardar la calificación.");
        }

        if (data.success && data.data && typeof data.data.rating === 'number') {
            console.log("Calificación guardada con éxito:", data.data.rating);
            setDbUserRating(data.data.rating);
            setSuccessMessage("¡Calificación guardada!");
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 2000);
        } else {
            throw new Error("Respuesta inválida del servidor al guardar calificación.");
        }

    } catch (err: any) {
        setRatingError(err.message);
    } finally {
        setIsSubmittingRating(false);
    }
  };

  /**
   * Handles subtitle language change
   * @param {('es'|'en'|'off')} lang - The subtitle language to display
   */
  const handleSubtitleChange = (lang: 'es' | 'en' | 'off') => {
    setSubtitleLanguage(lang)
    
    if (videoRef.current && videoRef.current.textTracks) {
      for (let i = 0; i < videoRef.current.textTracks.length; i++) {
        const track = videoRef.current.textTracks[i]
        track.mode = 'hidden'
      }
      
      if (lang !== 'off') {
        for (let i = 0; i < videoRef.current.textTracks.length; i++) {
          const track = videoRef.current.textTracks[i]
          const shouldShow = (lang === 'es' && i === 0) || (lang === 'en' && i === 1)
          if (shouldShow) {
            track.mode = 'showing'
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

  /**
   * Starts editing a comment
   * @param {Comment} comment - The comment to edit
   */
  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment._id); 
    setEditText(comment.content);
    setCommentError(null); 
  };

  /**
   * Cancels the editing operation
   */
  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditText("");    
  };

  /**
   * Handles comment editing
   */
  const handleEditComment = async () => {
    const token = localStorage.getItem('authToken');
    if (!editingCommentId || !token || !user) return; 

    if (editText.trim().length === 0) {
      setCommentError("Comment cannot be empty.");
      return;
  } 
   try {
     setCommentError(null);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${editingCommentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
       },
        body: JSON.stringify({ content: editText })
      });

      if (!response.ok) {
       const errData = await response.json();
       throw new Error(errData.message || "Failed to save comment.");
    }

      const data = await response.json();

      if (data.success && data.data && data.data.userId) {

        const updatedCommentData = data.data;
        setComments(prevComments =>
          prevComments.map(comment => {
             if (comment._id !== editingCommentId) {
              return comment;
            }
             return {
              ...comment, 
              content: updatedCommentData.content, 
              edited: updatedCommentData.edited,
              updatedAt: updatedCommentData.updatedAt 
             };
             })
             );
        cancelEditing();
        setSuccessMessage(SUCCESS_MESSAGES.COMMENT_EDITED);
        setShowSuccessAlert(true);
    } else {
    throw new Error("Server response was not valid when editing.");
    }
  } catch (err: any) {
      setCommentError(err.message);
    }
  };

  /**
   * Handles comment deletion
   */
  const handleDeleteComment = async () => {
    if (!commentToDelete) return;
    const token = localStorage.getItem('authToken');
    
    try {
      setCommentError(null); 
      
       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentToDelete}`, {
       method: 'DELETE',
       headers: {
        'Authorization': `Bearer ${token}`
   }
});

     if (!response.ok) {
        const errData = await response.json(); 
        throw new Error(errData.message || "Failed to delete comment.");
  }

    setComments(prevComments =>
    prevComments.filter(comment => comment._id !== commentToDelete)
 );

    setSuccessMessage(SUCCESS_MESSAGES.COMMENT_DELETED);
    setShowSuccessAlert(true);
    setShowDeleteConfirm(false);
    setCommentToDelete(null);

  } catch (err: any) {
     setCommentError(err.message);
  }
 };

  /**
   * Shows delete confirmation dialog
   * @param {string} commentId - The comment ID to delete
   */
  const showDeleteConfirmation = (commentId: string) => {
    setCommentToDelete(commentId);
    setShowDeleteConfirm(true);
  };

  /**
   * Handles adding a new comment
   */
  const handleAddComment = async () => {
    const token = localStorage.getItem('authToken');

    if (!user || !token) {
      setCommentError("You must log in to post a comment.");
      return;
    }
    if (!movie || !movie.id) {
      setCommentError("Cannot find movie to comment on.");
      return;
    }
    if (newComment.trim().length === 0) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    try {
      setCommentError(null); 
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${movie.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newComment })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to publish comment.");
      }

      const data = await response.json();

      if (data.success && data.data && data.data._id && data.data.userId) {

        const newCommentFromApi = {
          _id: data.data._id, 
          content: data.data.content,
          createdAt: data.data.createdAt,
          edited: data.data.edited,
          userId: { 
            _id: data.data.userId.id,
            firstName: data.data.userId.firstName,
            lastName: data.data.userId.lastName,
            avatar: data.data.userId.avatar
          }
        };

        setComments(prevComments => [newCommentFromApi, ...prevComments]);
        setNewComment(""); 

        setSuccessMessage(SUCCESS_MESSAGES.COMMENT_PUBLISHED);
        setShowSuccessAlert(true);

      } else {
        throw new Error("Server did not return a valid comment.");
      }

    } catch (err: any) {
      setCommentError(err.message);
    }
  };
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

          <div className="view-movie__rating-section">
            <h3 className="view-movie__rating-title">Califica esta película</h3>
            <p className="view-movie__rating-subtitle">¿Qué te pareció?</p>
            {ratingError && <Alert type="error" message={ratingError} onClose={()=> setRatingError(null)} />}
            <div className="view-movie__stars-container">
              {[1, 2, 3, 4, 5].map((starValue) => {

                const currentRatingFill = hoveredRating || dbUserRating || 0;
                return (
                <button
                  
                  key={starValue}
                  type="button"
                  className="view-movie__star"
                  onClick={() => handleSubmitRating(starValue)}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  disabled={isSubmittingRating}
                  
                >
                  <span
                    className={`view-movie__star-icon ${
                       starValue <= currentRatingFill ? 'view-movie__star-icon--active' : ''
                      }`}
                  >
                    ★
                  </span>
                </button>
              ); 
        })}
            </div>
            {dbUserRating !== null && dbUserRating > 0 && (
              <p className="view-movie__rating-feedback">
                Tu calificación:
                {dbUserRating === 5 && " ¡Excelente! ⭐"}
                {dbUserRating === 4 && " Muy buena 👍"}
                {dbUserRating === 3 && " Buena 👍"}
                {dbUserRating === 2 && " Regular 👌"}
                {dbUserRating === 1 && " No me gustó 😕"}
                </p>
            )}
          </div>
        </div>
      </div>

      <div className="view-movie__comments-section">
        <h2 className="view-movie__comments-title">Comentarios</h2>

        <div className="view-movie__comment-form">
          <h3 className="view-movie__comment-form-title">Comparte tu opinión</h3>
          <textarea
            className="view-movie__comment-input"
            placeholder="¿Qué te pareció esta película? Comparte tu experiencia..."
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {commentError && !editingCommentId && <p className="view-movie__comment-error">{commentError}</p>}
          <button
            className="view-movie__comment-submit"
            onClick={handleAddComment}
          >
            Publicar Comentario
          </button>
        </div>

        <div className="view-movie__comments-list">

          {isLoadingComments && (
            <p className="view-movie__comments-message">Cargando comentarios...</p>
          )}

          {!isLoadingComments && !commentError && comments.length === 0 && (
            <p className="view-movie__comments-message">No hay comentarios. ¡Sé el primero en opinar!</p>
          )}
          {!isLoadingComments && comments.map((comment) => (
            <div key={comment._id} className="view-movie__comment-card">
              <div className="view-movie__comment-header">
                 <div className="view-movie__comment-user">
                  <div className="view-movie__comment-avatar">
                    <span>
                      {(comment.userId && typeof comment.userId === 'object')
                        ? `${comment.userId.firstName?.[0] || ''}${comment.userId.lastName?.[0] || ''}`
                        : 'U'
                      }
                    </span>
                  </div>
                  <div className="view-movie__comment-user-info">
                    <p className="view-movie__comment-name">
                      {(comment.userId && typeof comment.userId === 'object')
                        ? `${comment.userId.firstName} ${comment.userId.lastName}`
                        : 'Usuario Eliminado'
                      }
                    </p>
                    <p className="view-movie__comment-time">
                      {new Date(comment.createdAt).toLocaleString('es-ES')}
                      {comment.edited && <span className="view-movie__comment-edited"> (Editado)</span>}
                    </p>
                  </div>
                </div>
                    {user && comment.userId && typeof comment.userId === 'object' && user.id === comment.userId._id && ( // <-- CORREGIDO: user.userId
                   <div className="view-movie__comment-actions">
                     <button
                      className="view-movie__comment-action view-movie__comment-action--edit"
                      onClick={() => startEditing(comment)} 
                    >
                       Editar 
                      </button>
                      <button
                      className="view-movie__comment-action view-movie__comment-action--delete"
                      onClick={() => showDeleteConfirmation(comment._id)}
                    >
                      Eliminar 
                      </button>
                      </div>
                    )}
                    </div>
                    <p className="view-movie__comment-text">
                      {comment.content}
                      </p>
                  </div>
          ))}
        </div>
      </div> 
      <Modal
        isOpen={editingCommentId !== null} 
        onClose={cancelEditing} 
        title="Editar Comentario"
      >
        <div className="modal__form"> 

         
          {commentError && editingCommentId && (
            <Alert
              message={commentError}
              type="error"
              onClose={() => setCommentError(null)}
            />
          )}

          <textarea
            className="view-movie__comment-input" 
            rows={5} 
            value={editText} 
            onChange={(e) => setEditText(e.target.value)}
          />

          <div className="modal__actions">
            <button
              className="btn btn--save" 
              onClick={handleEditComment} 
            >
              Guardar Cambios
            </button>
            <button
              className="btn btn--cancel"
              onClick={cancelEditing} 
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {showSuccessAlert && (
        <Alert
          message={successMessage}
          type="success"
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmAlert
          message="¿Estás seguro de que quieres eliminar este comentario?"
          type="danger"
          onConfirm={handleDeleteComment}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setCommentToDelete(null);
          }}
        />
      )}
    </div> 
  </div> 
);
}

export default ViewMovie