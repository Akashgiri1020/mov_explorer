export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

export interface Category {
  id: number;
  name: string;
  movies: Movie[];
}