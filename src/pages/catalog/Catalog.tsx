import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserStore from '../../stores/useUserStores';
import './Catalog.scss'
import Movie from '../../components/movie/Movie';

/**
 * Catalog Page Component
 * 
 * The main catalog page for browsing and managing movies.
 * Features:
 * - Search functionality for movies and genres
 * - Movie cards with detailed information
 * - Rating system with star display and breakdown
 * - Favorite toggle functionality
 * - Play button for movie viewing
 * - Responsive grid layout
 * 
 * Currently displays a sample movie (Avatar: The Last Airbender) with:
 * - Title and cover information
 * - Star rating (out of 5)
 * - Rating breakdown by star level
 * - Favorite heart button
 * 
 * @component
 * @returns {React.ReactElement} The catalog page with search and movie display
 * 
 * @example
 * // Rendered through React Router (protected route)
 * <Route path="/catalog" element={<Catalog />} />
 * 
 * @remarks
 * - Accessible only to authenticated users
 * - Search input for filtering movies (UI only, functionality to be implemented)
 * - "Mis Favoritos" button for filtering favorite movies
 * - Rating system displays average rating and distribution
 * - Responsive design adapts to various screen sizes
 * - Future: Will integrate with backend API for actual movie data
 */
const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteMap, setFavoriteMap] = useState(new Map<string, string>());
  const { user } = useUserStore();
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

  const toggleFavorite = async (movieId: string, isCurrentlyFavorite: boolean) => {
        const token = localStorage.getItem('authToken');
        if (!user || !token) {
            navigate('/login'); 
            return;
        }
        console.log("datos que se envian al back: ", movieId, isCurrentlyFavorite );
        
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        try {
            if (isCurrentlyFavorite) {
                if (!movieId) return; 

                const response = await fetch(`${API_BASE_URL}/api/favorites/${movieId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error('Failed to remove favorite');

              
                setFavoriteMap(prevMap => {
                    const newMap = new Map(prevMap);
                    newMap.delete(movieId);
                    return newMap;
                });

            } else {
                const response = await fetch(`${API_BASE_URL}/api/favorites`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ movieId: movieId })
                });

                if (!response.ok) throw new Error('Failed to add favorite');

                const data = await response.json();
                console.log("Respuesta del back al agregar favorito: ", data);
                if (!data.success || !data.data || !data.data.movieId || !data.data.favoriteId) {
                  console.error("Respuesta inválida de la API:", data);
                  throw new Error("Respuesta inválida del servidor.");
                  }

                
                const newFavoriteMovieId = data.data.movieId;
                const newFavoriteId = data.data.favoriteId;

    
                setFavoriteMap(prevMap => {
                  const newMap = new Map(prevMap);
        
                  newMap.set(newFavoriteMovieId, newFavoriteId); 
                    return newMap;
                            });
                        }
                    } catch (err) {
                        console.error(err);
                    }
    };


  const handlePlayMovie = (movie: any) => {
        navigate('/view-movie', { state: { movie: movie } });
    };

  useEffect(() => {
        const token = localStorage.getItem('authToken');

       
        const fetchMovies = fetch(`${import.meta.env.VITE_API_BASE_URL}/api/movies/popular`)
            .then(res => res.json());
        
        
        const fetchFavorites = () => {
            if (user && token) {
                return fetch(`${import.meta.env.VITE_API_BASE_URL}/api/favorites`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }).then(res => res.json());
            }
            return Promise.resolve(null);
        };

        // Ejecuta ambas peticiones en paralelo
        Promise.all([fetchMovies, fetchFavorites()])
            .then(([movieData, favData]) => {
                // Carga las películas
                if (movieData.success) {
                    setMovies(movieData.data.movies);
                    console.log("Datos que vienen del back: ", movieData);

                }

                // Carga el mapa de favoritos
                if (favData && favData.success) {
                    const newMap = new Map<string, string>();
                    favData.data.favorites.forEach((fav: any) => {
                        if (fav.movie && fav.movie.id) {
                        newMap.set(fav.movie.id, fav.favoriteId);
                     }
                    });
                    setFavoriteMap(newMap);
                }
            })
            .catch(err => console.error(err));

    }, [user]); 

    

    
    
 return (
        <section className="catalog">
            <div className="catalog__container">
                <h1 className="catalog__title">Catálogo</h1>
                
                <div className="catalog__section">
                    <h2 className="section__title">Catálogo de Películas</h2>
                    
                    <div className="search__container">
                        <input 
                            type="text" 
                            className="search__input"
                            placeholder="Buscar películas, géneros..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button className="btn btn--favorites" onClick={() => navigate('/favorite')}>Mis Favoritos</button>
                    </div>

                    <div className="movies__grid">

                        {
                        
                        movies.map((movie: any) => {
                            const isFavorited = favoriteMap.has(movie.id)
                            return (
                                <div key={movie.id} className="movie__card">
                                    <div className="movie__header">
                                        <h3 className="movie__title">{movie.title}</h3>
                                    </div>
                                    
                                    <div className="movie__content">

                                        <div className="movie__poster">
                                            <Movie movie={movie} />
                                        </div>
                                        
                                        <div className="movie__info">
                                            <div className="movie__title-section">
                                                <h4 className="movie__name">{movie.title}</h4>
                                                <button 
                                                  className={`favorite__btn ${isFavorited ? 'active' : ''}`} // ✅ Usa la variable individual
                                                  onClick={() => toggleFavorite(movie.id, isFavorited)} // ✅ Llama a la nueva función async
                                                >
                                                ❤️
                                                </button>
                                            </div>
                                            
                                            <div className="movie__details">
                                                <p className="movie__description">{movie.description}</p>
                                                <div className="movie__meta">
                                                    <span className="movie__duration">{movie.duration} min</span>
                                                    <span className="movie__genre">{movie.genre?.join(', ')}</span>
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
                                            onClick={() => handlePlayMovie(movie)}
                                        >
                                            Reproducir
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Catalog