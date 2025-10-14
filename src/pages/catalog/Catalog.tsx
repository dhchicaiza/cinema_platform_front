import React, { useState } from 'react'
import './Catalog.scss'

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
  const [searchQuery, setSearchQuery] = useState('');
  const [isFavorite, setIsFavorite] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
            <button className="btn btn--favorites">Mis Favoritos</button>
          </div>

          <div className="movie__card">
            <div className="movie__header">
              <h3 className="movie__title">Avatar: La leyenda de Aang</h3>
            </div>
            
            <div className="movie__content">
              <div className="movie__info">
                <div className="movie__title-section">
                  <h4 className="movie__name">Avatar: La leyenda de Aang</h4>
                  <button 
                    className={`favorite__btn ${isFavorite ? 'active' : ''}`}
                    onClick={toggleFavorite}
                  >
                    ❤️
                  </button>
                </div>
                
                <div className="movie__rating">
                  <div className="stars">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star half">★</span>
                  </div>
                  <span className="rating__number">4.86</span>
                </div>
              </div>

              <div className="rating__breakdown">
                <div className="rating__item">
                  <span className="rating__label">5</span>
                  <div className="rating__bar">
                    <div className="rating__fill rating__fill--high"></div>
                  </div>
                </div>
                <div className="rating__item">
                  <span className="rating__label">4</span>
                  <div className="rating__bar">
                    <div className="rating__fill rating__fill--medium"></div>
                  </div>
                </div>
                <div className="rating__item">
                  <span className="rating__label">3</span>
                  <div className="rating__bar">
                    <div className="rating__fill rating__fill--low"></div>
                  </div>
                </div>
                <div className="rating__item">
                  <span className="rating__label">2</span>
                  <div className="rating__bar">
                    <div className="rating__fill rating__fill--low"></div>
                  </div>
                </div>
                <div className="rating__item">
                  <span className="rating__label">1</span>
                  <div className="rating__bar">
                    <div className="rating__fill rating__fill--low"></div>
                  </div>
                </div>
              </div>

              <button className="btn btn--play">Reproducir</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Catalog