import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/useUserStores'
import './Favorite.scss'
import MovieCard from '../../components/movie-card/MovieCard'
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
 * 
 * Current Implementation:
 * - Uses mock data with Avatar movies as examples
 * - Displays 2 sample favorite movies
 * - Ready for integration with backend API for real user favorites
 * 
 * @component
 * @returns {React.ReactElement} Complete favorites page with movie cards grid
 * 
 * @example
 * // Route usage in React Router
 * <Route path="/favorite" element={<Favorite />} />
 * 
 * @example
 * // Direct component usage
 * <Favorite />
 * 
 * @remarks
 * - Page uses the Layout component for consistent header/footer
 * - Movie cards are rendered using the MovieCard component
 * - Grid layout automatically adjusts based on screen size
 * - Currently uses static data but ready for dynamic favorites from API
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

  /**
   * Función que se encarga de eliminar un favorito.
   * Se pasará como prop a cada MovieCard.
   */
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

  const renderContent = () => {
    if (isLoading) {
      return <p className="favorite__message">Cargando tus favoritos...</p>;
    }
    
    if (!isLoading && favorites.length === 0) {
      return <p className="favorite__message">Aún no has añadido ninguna película a favoritos.</p>;
    }
    
    return (
      <div className="favorite__movies">
        {favorites.map((fav) => (
          <MovieCard 
            key={fav.favoriteId} 
            movie={fav.movie} 
            
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </div>
    );
  };
  
  return (
    <section className="favorite">
      <div className="favorite__container">
        <h1 className="favorite__title">Lista de Favoritos</h1>
        {error && (
          <p className="favorite__message favorite__message--error">{error}</p>
        )}
        
        {renderContent()}
      </div>
    </section>
  )
}

export default Favorite