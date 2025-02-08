"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchFromApi } from "@/api/core";
import MovieCard from "@/components/Card";
import { Movie } from "@/type";
import Link from "next/link";

const SearchPage = ({ params }: { params: Promise<{ query: string }> }) => {

  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [localQuery, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchResults = async () => {
      const query = (await params).query;
      try {
        setLoading(true);
        setError("");

        const { results, total_pages } = await fetchFromApi("/search/movie", {
          query,
          page,
        });

        setSearchResults((prevResults) =>
          page === 1 ? results : [...prevResults, ...results]
        );
        setQuery(query);
        setHasMore(page < total_pages);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [page]);

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
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Search Results for "{localQuery}"
      </h1>

      {/* Loading and Error States */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((movie, index) => {
          if (searchResults.length === index + 1) {
            return (
              <div ref={lastMovieRef} key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                />
              </div>
            );
          } else {
            return (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterPath={movie.poster_path}
              />
            );
          }
        })}
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-accent mt-6">Loading...</p>}

      {/* No Results Found */}
      {!loading && searchResults.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No movies found for "{localQuery}".
        </p>
      )}
    </div>
  );
};

export default SearchPage;
