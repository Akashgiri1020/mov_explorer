"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchFromApi } from "@/api/core";
import MovieCard from "@/components/Card";
import { Movie } from "@/type";
import Link from "next/link";

const SearchPage = ({ params }: { params: { query: string } }) => {
  const searchParams = useSearchParams();
  const query = params.query;
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [localQuery, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const { results } = await fetchFromApi("/search/movie", {
          query:query,
          page,
        });

        setSearchResults(results);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (query){
        fetchResults();
        setQuery(query)
    }

  }, [query, page]);

  return (
    <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-center mb-8 gap-4">
        <input
          type="text"
          className="border border-tertiary text-secondary rounded-lg px-4 py-2 w-full max-w-md"
          placeholder="Search for movies..."
          value={localQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link
          href={`/search/${encodeURIComponent(
            localQuery.trim().replace(" ", "+")
          )}`}
          className="bg-primary text-white hover:bg-accent px-4 py-2 rounded-lg"
        >
          Search
        </Link>
      </div>
      <h1 className="text-3xl font-bold  mb-6 text-primary">
        Search Results for "{query}"
      </h1>

      {/* Loading and Error States */}
      {loading && <p className="text-center text-accent">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Results */}
      {!loading && searchResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      )}

      {/* No Results Found */}
      {!loading && searchResults.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No movies found for "{query}".
        </p>
      )}
    </div>
  );
};

export default SearchPage;
