"use client";

import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/Card';
import { Heart } from 'lucide-react';
import { Movie } from '@/type';
import { getFavoriteMovies } from '@/utils/functions';


const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    // Load favorites initially
    const loadFavorites = () => {
      const favoriteMovies = getFavoriteMovies();
      setFavorites(favoriteMovies);
    };

    loadFavorites();

    // Listen for changes in favorites
    window.addEventListener('favoritesUpdated', loadFavorites);
    window.addEventListener('storage', loadFavorites);

    return () => {
      window.removeEventListener('favoritesUpdated', loadFavorites);
      window.removeEventListener('storage', loadFavorites);
    };
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-secondary p-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          My Favorites
        </h1>
        <div className="flex flex-col items-center justify-center space-y-4 text-tertiary">
          <Heart className="w-16 h-16" />
          <p className="text-xl">No favorites yet</p>
          <p className="text-sm">
            Start adding movies to your favorites by clicking the heart icon on any movie card
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary p-8">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        My Favorites
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
          />
        ))}
      </div>

      <div className="mt-8 text-center text-tertiary">
        <p>{favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} in favorites</p>
      </div>
    </div>
  );
};

export default FavoritesPage;