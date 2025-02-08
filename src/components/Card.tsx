"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { isMovieFavorite, toggleFavorite } from "@/utils/functions";
import { Movie } from "@/type";



const MovieCard: React.FC<Movie> = ({ id, title, poster_path,release_date }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if movie is in favorites on component mount and when favorites update
  useEffect(() => {
    const updateFavoriteStatus = () => {
      setIsFavorite(isMovieFavorite(id));
    };

    // Initial check
    updateFavoriteStatus();

    // Listen for favorites updates
    window.addEventListener('favoritesUpdated', updateFavoriteStatus);
    
    return () => {
      window.removeEventListener('favoritesUpdated', updateFavoriteStatus);
    };
  }, [id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking heart
    
    const newFavoriteStatus = toggleFavorite({
      id,
      title,
      poster_path: poster_path || "",
      release_date: release_date, // Add a valid release date here
    });
    
    setIsFavorite(newFavoriteStatus);
  };

  return (
    <div className="relative flex-shrink-0 w-40 sm:w-48 md:w-60">
      <Link
        href={`/movie/${id}`}
        className="block bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all"
      >
        {/* Movie Poster */}
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "/placeholder.jpg"
          }
          alt={title}
          className="w-full h-40 sm:h-48 md:h-60 object-cover"
        />

        {/* Movie Title */}
        <div className="p-2">
          <h3 className="text-xs sm:text-sm font-semibold truncate text-secondary">
            {title}
          </h3>
        </div>
      </Link>

      {/* Favorite Button */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`w-4 h-4 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-white"
          }`}
        />
      </button>
    </div>
  );
};

export default MovieCard;