"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchFromApi } from "@/api/core";
import MovieCard from "@/components/Card";
import { Movie } from "@/type";
import Link from "next/link";
import Loader from "@/components/Loader";

const SearchPage = ({ params }: { params: Promise<{ query: string }> }) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [localQuery, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // For initial loading
  const [pageLoading, setPageLoading] = useState(false); // For infinite scroll loading
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (pageLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [pageLoading, hasMore]
  );

  const fetchResults = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) setLoading(true);
      else setPageLoading(true);

      const query = (await params).query;
      setError("");

      const { results, total_pages } = await fetchFromApi("/search/movie", {
        query,
        page,
      });

      setSearchResults((prevResults) =>
        isInitialLoad ? results : [...prevResults, ...results]
      );
      setQuery(query);
      setHasMore(page < total_pages);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      if (isInitialLoad) setLoading(false);
      else setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(true); // Initial load
  }, []);

  useEffect(() => {
    if (page > 1) fetchResults(false); // Load more data for infinite scroll
  }, [page]);

  if (loading) {
    return <Loader />;
  }

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

      {/* Page Loading Indicator */}
      {pageLoading && <p className="text-center text-accent mt-6">Loading more movies...</p>}

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
