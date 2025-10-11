import React, { useState } from 'react'
import './Catalog.scss'
import useUserStore from '../../stores/useUserStores';

const Catalog: React.FC = () => {
  const { user } = useUserStore();
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