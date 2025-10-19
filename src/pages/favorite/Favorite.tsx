import React from 'react'
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
  /**
   * Mock data for favorite movies
   * In a real application, this would be fetched from an API
   * or retrieved from user's saved favorites
   */
  const favoriteMovies = [
    {
      id: 1,
      title: "Avatar: La leyenda de Aang",
      rating: 4,
      poster: "/placeholder-movie.jpg"
    },
    {
      id: 2,
      title: "Avatar 2: La leyenda de Korra",
      rating: 4,
      poster: "/placeholder-movie.jpg"
    }
  ]

  return (
    <section className="favorite">
      <div className="favorite__container">
        <h1 className="favorite__title">Lista de Favoritos</h1>
        <div className="favorite__movies">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Favorite