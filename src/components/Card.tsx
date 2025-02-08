"use client";

import React from "react";
import Link from "next/link";

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, posterPath }) => {
  return (
    <Link
      href={`/movie/${id}`}
      className="flex-shrink-0 w-40 sm:w-48 md:w-60 bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition-all"
    >
      {/* Movie Poster */}
      <img
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
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
  );
};

export default MovieCard;
