"use client";

import { fetchFromApi } from "@/api/core";
import { formatDate } from "@/utils/functions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, Clock, Calendar, Globe, Building2, DollarSign } from "lucide-react";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  runtime: number;
  tagline?: string;
  budget?: number;
  revenue?: number;
  production_companies?: { id: number; name: string; logo_path: string | null }[];
  homepage?: string;
  spoken_languages?: { english_name: string }[];
}

const MovieDetailPage = ({ params }: { params: { id: string } }) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetchFromApi(`/movie/${params.id}`);
      setMovie(res);
    };

    fetchMovieDetails();
  }, [params.id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section with Backdrop */}
      <div className="relative h-96">
        {movie.backdrop_path ? (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary"></div>
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-secondary to-secondary"></div>
        )}
      </div>

      {/* Content Section */}
      <div className="relative max-w-6xl mx-auto px-4 -mt-32">
        <div className="bg-secondary rounded-lg shadow-xl p-6 md:p-8 border border-tertiary">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            {movie.poster_path && (
              <div className="flex-shrink-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}

            {/* Movie Details */}
            <div className="flex-grow">
              <h1 className="text-4xl font-bold text-primary mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-accent italic mb-6">{movie.tagline}</p>
              )}

              {/* Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-tertiary">{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-tertiary">{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-tertiary">{movie.runtime} min</span>
                </div>
                {movie.spoken_languages && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-accent" />
                    <span className="text-tertiary">
                      {movie.spoken_languages.map(lang => lang.english_name).join(", ")}
                    </span>
                  </div>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-primary text-secondary px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Overview</h2>
                <p className="text-tertiary leading-relaxed">{movie.overview}</p>
              </div>

              {/* Financial Info */}
              {(movie.budget || movie.revenue) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {movie.budget && (
                    <div className="flex items-center gap-3 border border-tertiary p-4 rounded-lg">
                      <DollarSign className="w-6 h-6 text-accent" />
                      <div>
                        <p className="text-sm text-tertiary">Budget</p>
                        <p className="text-lg font-semibold text-primary">${movie.budget.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  {movie.revenue && (
                    <div className="flex items-center gap-3 border border-tertiary p-4 rounded-lg">
                      <DollarSign className="w-6 h-6 text-accent" />
                      <div>
                        <p className="text-sm text-tertiary">Revenue</p>
                        <p className="text-lg font-semibold text-primary">${movie.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-accent" />
                    Production Companies
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="flex items-center gap-3 border border-tertiary p-4 rounded-lg">
                        {company.logo_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            width={50}
                            height={50}
                            className="object-contain"
                          />
                        ) : (
                          <Building2 className="w-8 h-8 text-tertiary" />
                        )}
                        <span className="text-tertiary font-medium">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Homepage Link */}
              {movie.homepage && (
                <div className="mt-8">
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-secondary rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Visit Official Website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;