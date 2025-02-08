"use client";

import React from "react";
import Link from "next/link";
import MovieCard from "./Card";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface CategoryRowProps {
  id: number;
  name: string;
  movies: Movie[];
}

const CategoryRow: React.FC<CategoryRowProps> = ({ id, name, movies }) => {
  return (
    <div className="mb-10">
      {/* Category Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Category Title */}
        <h2 className="text-xl font-bold text-white">{name}</h2>
        {/* Link to View All Movies in Category */}
        {/* <Link
          href={`/category/${id}`}
          className="text-primary hover:text-accent text-sm font-medium"
        >
          View All
        </Link> */}
      </div>

      {/* Horizontal Scrollable Row for Movies */}
      <div
        className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
