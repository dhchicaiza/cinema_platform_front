import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const [isFavorite, setIsFavorite] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handlePlayMovie = (movie: any) => {
    navigate('/view-movie', { state: { movie: movie } });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/movies/popular`)
      .then(res => res.json())
      .then(data => setMovies(data.data.movies))
      .catch(err => console.error(err))
  }, [])

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
            {movies.map((movie: any) => (
              <div key={movie._id || movie.id} className="movie__card">
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
                        className={`favorite__btn ${isFavorite ? 'active' : ''}`}
                        onClick={toggleFavorite}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Catalog