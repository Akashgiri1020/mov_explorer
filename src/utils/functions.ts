import { Movie } from "@/type";

export const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // Short month (e.g., Jan, Feb, etc.)
      day: "2-digit",
    });
  };

// Get all favorite movies
export const getFavoriteMovies = (): Movie[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
};

// Check if a movie is in favorites
export const isMovieFavorite = (movieId: number): boolean => {
  const favorites = getFavoriteMovies();
  return favorites.some((movie) => movie.id === movieId);
};

// Add a movie to favorites
export const addToFavorites = (movie: Movie): void => {
  const favorites = getFavoriteMovies();
  const updatedFavorites = [...favorites, movie];
  localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  // Dispatch storage event for cross-component communication
  window.dispatchEvent(new Event('favoritesUpdated'));
};

// Remove a movie from favorites
export const removeFromFavorites = (movieId: number): void => {
  const favorites = getFavoriteMovies();
  const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
  localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  // Dispatch storage event for cross-component communication
  window.dispatchEvent(new Event('favoritesUpdated'));
};

// Toggle favorite status
export const toggleFavorite = (movie: Movie): boolean => {
  const isFavorite = isMovieFavorite(movie.id);
  
  if (isFavorite) {
    removeFromFavorites(movie.id);
    return false;
  } else {
    addToFavorites(movie);
    return true;
  }
};