import React, { useRef, useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import useUserStore from '../../stores/useUserStores'
import Modal from '../../components/modal/Modal'; 
import Alert from '../../components/alert/Alert'; 
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

  const { user } = useUserStore(); // Obtener el usuario logueado
  const [comments, setComments] = useState<Comment[]>([]); // Lista de comentarios
  const [newComment, setNewComment] = useState(""); // Texto del textarea
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [commentError, setCommentError] = useState<string | null>(null);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); 
  const [editText, setEditText] = useState(""); 

  console.log(movie)
  console.log("Usuario logueado en ViewMovie:", user);

  useEffect(() => {
    // Solo cargar comentarios si tenemos un ID de película
    if (movie && movie.id) {
      const fetchComments = async () => {
        try {
          setIsLoadingComments(true);
          setCommentError(null);
          
          // Ruta de tu API: GET /api/comments/movie/:movieId
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/movie/${movie.id}`);
          console.log("vuelve a cargar")
          if (!response.ok) {
            throw new Error("No se pudieron cargar los comentarios.");
          }

          const data = await response.json();
          console.log("get all movies of back: ", data);
          if (data.success && Array.isArray(data.data.comments)) {
            setComments(data.data.comments); // Guardar comentarios en el estado
          } else {
            setComments([]);
          }
        } catch (err: any) {
          setCommentError(err.message);
        } finally {
          setIsLoadingComments(false);
        }
      };

      fetchComments();
    }
  }, [movie])

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

  
 const startEditing = (comment: Comment) => {
   setEditingCommentId(comment._id); 
   setEditText(comment.content);
   setCommentError(null); 
  };

  const cancelEditing = () => {
     setEditingCommentId(null);
     setEditText("");    
     };

  const handleEditComment = async () => {
    const token = localStorage.getItem('authToken');
    if (!editingCommentId || !token || !user) return; 

    if (editText.trim().length === 0) {
      setCommentError("El comentario no puede estar vacío.");
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
       throw new Error(errData.message || "No se pudo guardar el comentario.");
    }

      const data = await response.json();
      console.log("Respuesta de editar comentario:", data);

      if (data.success && data.data && data.data.userId) {

        const updatedCommentData = data.data;
        console.log("Updated comment data:", updatedCommentData);
        setComments(prevComments =>
          prevComments.map(comment => {
            console.log("Updated comment data from API:", comment)
            console.log("editingCommentId:", editingCommentId)
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
    } else {
    console.error("Respuesta inesperada del PUT:", data);
    throw new Error("La respuesta del servidor no fue válida al editar.");
    }
  } catch (err: any) {
      setCommentError(err.message);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const token = localStorage.getItem('authToken');
    if (!user || !token) {
     setCommentError("Debes iniciar sesión para eliminar comentarios.");
    return;
 }
  
  if (!window.confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
}

    try {
      setCommentError(null); 
      
       const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/comments/${commentId}`, {
       method: 'DELETE',
       headers: {
        'Authorization': `Bearer ${token}`
   }
});

     if (!response.ok) {
        const errData = await response.json(); 
        throw new Error(errData.message || "No se pudo eliminar el comentario.");
  }

    setComments(prevComments =>
    prevComments.filter(comment => comment._id !== commentId)
 );

  } catch (err: any) {
     setCommentError(err.message);
  }
 };

  const handleAddComment = async () => {
    const token = localStorage.getItem('authToken');

    if (!user || !token) {
      setCommentError("Debes iniciar sesión para publicar un comentario.");
      return;
    }
    if (!movie || !movie.id) {
      setCommentError("No se puede encontrar la película para comentar.");
      return;
    }
    if (newComment.trim().length === 0) {
      setCommentError("El comentario no puede estar vacío.");
      return;
    }

    try {
      setCommentError(null); 
      console.log("Movie id:", movie.id);
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
        throw new Error(errData.message || "No se pudo publicar el comentario.");
      }

      const data = await response.json();
      console.log("Comentario del back: ", data);

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

      } else {
        console.error("Respuesta inesperada del servidor:", data);
        throw new Error("El servidor no devolvió un comentario válido.");
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
      {/* --- SECCIÓN DEL ENCABEZADO Y VIDEO --- */}
      <div className="view-movie__header">
        <h1 className="view-movie__title">Reproductor</h1>
      </div>

      <div className="view-movie__content">
        <div className="view-movie__video-section">
          {renderVideoPlayer(movie)}
        </div>

        {/* --- SECCIÓN DE INFORMACIÓN DE LA PELÍCULA --- */}
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

      {/* --- SECCIÓN DE COMENTARIOS --- */}
      <div className="view-movie__comments-section">
        <h2 className="view-movie__comments-title">Comentarios</h2>

        {/* --- FORMULARIO PARA NUEVO COMENTARIO --- */}
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

        {/* --- LISTA DE COMENTARIOS --- */}
        <div className="view-movie__comments-list">

          {isLoadingComments && (
            <p className="view-movie__comments-message">Cargando comentarios...</p>
          )}

          {/* Mensaje si no hay comentarios */}
          {!isLoadingComments && !commentError && comments.length === 0 && (
            <p className="view-movie__comments-message">No hay comentarios. ¡Sé el primero en opinar!</p>
          )}

          {/* Mapeo de comentarios existentes */}
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
                      onClick={() => handleDeleteComment(comment._id)}
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
    </div> 
  </div> 
);
}

export default ViewMovie