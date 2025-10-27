import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/useUserStores'
import './Favorite.scss'
import Movie from '../../components/movie/Movie'

/**
 * Favorite Page Component
 * 
 * Displays the user's favorite movies in a grid layout with a dark theme.
 * This page shows a list of movies that the user has marked as favorites,
 * each displayed in a card format with rating stars and a "Ver" (View) button.
 * 
 * Features:
 * - Displays "Lista de Favoritos" heading
 * - Grid layout of favorite movie cards
 * - Responsive design that adapts to different screen sizes
 * - Dark theme with purple accents matching the application design
 * - Each movie card shows title, rating stars, and navigation button
 * - Remove favorite functionality
 * - Navigation to movie details page
 * 
 * @component
 * @returns {React.ReactElement} Complete favorites page with movie cards grid
 * 
 * @example
 * // Route usage in React Router
 * <Route path="/favorite" element={<Favorite />} />
 * 
 * @remarks
 * - Page uses the same styling as Catalog for consistency
 * - Movie cards are rendered using the Movie component
 * - Grid layout automatically adjusts based on screen size
 * - Integrated with backend API for real user favorites
 * - Styled with SCSS using BEM methodology
 * - Accessible via /favorite route
 */

const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useUserStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (!user || !token) {
      navigate('/login?message=Inicia-sesion-para-ver-tus-favoritos');
      return;
    }
    
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites?limit=100`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'No se pudieron cargar los favoritos.');
        }

        const data = await response.json();
        
        if (data.success && Array.isArray(data.data.favorites)) {
          setFavorites(data.data.favorites);
        } else {
          throw new Error('Formato de datos inválido.');
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();

  }, [user, navigate]);


  const handleRemoveFavorite = async (movieId: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return; 

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Error al eliminar el favorito.");
      }

      setFavorites(currentFavorites => 
        currentFavorites.filter(fav => fav.movie.id !== movieId)
      );

    } catch (err: any) {
      setError(err.message); 
    }
  };

  const handlePlayMovie = (movie: any) => {
    // Ensure we have a complete movie object with all necessary properties
    const completeMovie = {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      genre: movie.genre,
      poster: movie.poster,
      image: movie.image,
      videoUrl: movie.videoUrl,
      url: movie.url,
      averageRating: movie.averageRating,
      totalRatings: movie.totalRatings,
      createdAt: movie.createdAt,
      ...movie // Spread all other properties
    };
    
    navigate('/view-movie', { state: { movie: completeMovie } });
  };

  const renderContent = () => {
    if (isLoading) {
      return <p className="favorite__message">Cargando tus favoritos...</p>;
    }
    
    if (!isLoading && favorites.length === 0) {
      return (
        <div className="favorite__empty">
          <div className="favorite__empty-icon">📽️</div>
          <h2 className="favorite__empty-title">Lista de Favoritos Vacía</h2>
          <p className="favorite__message">Aún no has añadido ninguna película a favoritos.</p>
          <button className="btn btn--catalog" onClick={() => navigate('/catalog')}>
            Ir al Catálogo
          </button>
        </div>
      );
    }
    
    return (
      <div className="movies__grid">
        {favorites.map((fav) => (
          <div key={fav.favoriteId} className="movie__card">
            <div className="movie__header">
              <h3 className="movie__title">{fav.movie.title}</h3>
            </div>
            
            <div className="movie__content">
              <div className="movie__poster">
                <Movie movie={fav.movie} />
              </div>
              
              <div className="movie__info">
                <div className="movie__title-section">
                  <h4 className="movie__name">{fav.movie.title}</h4>
                  <button 
                    className="favorite__btn active"
                    onClick={() => handleRemoveFavorite(fav.movie.id)}
                    title="Quitar de favoritos"
                  >
                    ❤️
                  </button>
                </div>
                
                <div className="movie__details">
                  <p className="movie__description">{fav.movie.description}</p>
                  <div className="movie__meta">
                    <span className="movie__duration">{fav.movie.duration} min</span>
                    <span className="movie__genre">{fav.movie.genre?.join(', ')}</span>
                  </div>
                </div>
                
                <div className="movie__rating">
                  <div className="stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star half">★</span>
                  </div>
                  <span className="rating__number">4.5</span>
                </div>
              </div>

              <button 
                className="btn btn--play"
                onClick={() => handlePlayMovie(fav.movie)}
              >
                Reproducir
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <section className="favorite">
      <div className="favorite__container">
        <h1 className="favorite__title">Lista de Favoritos</h1>
        
        {error && (
          <div className="favorite__error">
            <p className="favorite__message favorite__message--error">{error}</p>
          </div>
        )}
        
        {renderContent()}
      </div>
    </section>
  );
}

export default Favorite