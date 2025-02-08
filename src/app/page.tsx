"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CategoryRow from "@/components/CategoryRow";
import { fetchFromApi } from "@/api/core";
import MovieCard from "@/components/Card";
import { Category, Movie } from "@/type";
import Loader from "@/components/Loader";
import { getFavoriteMovies } from "@/utils/functions";



const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchResult, setSearchResult] = useState<Movie[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Fetch categories on initial render
  useEffect(() => {
    fetchCategories();
  }, []);

  // Debounce user input for search to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  // Perform search or reset to categories based on the debounced query
  useEffect(() => {
    if (debouncedQuery) {
      searchQuery(debouncedQuery);
    } else {
      fetchCategories();
    }
  }, [debouncedQuery]);

  // Function to fetch search results
  const searchQuery = async (query: string) => {
    try {
      setLoading(true);
      setError("");

      const { results } = await fetchFromApi("/search/movie", { query: query });
      setSearchResult(results);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch categories and associated movies
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch categories
      const { genres } = await fetchFromApi("/genre/movie/list");

      // Fetch movies for each category
      const categoryData: Category[] = await Promise.all(
        genres.map(async (genre: { id: number; name: string }) => {
          const { results: movies } = await fetchFromApi("/discover/movie", {
            with_genres: genre.id,
          });
          return {
            id: genre.id,
            name: genre.name,
            movies: movies.slice(0, 10), // Limit to top 10 movies
          };
        })
      );

      setCategories(categoryData);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return(
      <Loader/>
    )
  }

  return (
    <div className="p-4 bg-secondary">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        Search Your Movie Here...
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center mb-8 gap-4">
        <input
          type="text"
          className="border border-tertiary text-secondary rounded-lg px-4 py-2 w-full max-w-md"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link
          href={`/search/${encodeURIComponent(
            query.trim().replace(" ", "+")
          )}`}
          className="bg-primary text-white hover:bg-accent max-sm:text-center px-4 py-2 rounded-lg"
        >
          Search
        </Link>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-center text-accent">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Search Results */}
      {!loading && debouncedQuery && searchResult?.length && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResult?.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
            />
          ))}
        </div>
      )}

      {/* No Results Found */}
      {!loading && debouncedQuery && searchResult?.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No movies found for "{debouncedQuery}".
        </p>
      )}

      {/* Categories Section */}
      {!loading && categories.length > 0 && !debouncedQuery && (
        <div>
          {
            getFavoriteMovies()?.length !== 0 &&
            <CategoryRow
              id={1}
              name={"My Favourites"}
              movies={getFavoriteMovies()}
            />
          }
          
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              id={category.id}
              name={category.name}
              movies={category.movies}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
