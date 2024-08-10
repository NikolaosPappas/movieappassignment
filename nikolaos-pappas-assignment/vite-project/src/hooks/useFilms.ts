// useStarWarsFilms.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface SWAPIFilm {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
}

export interface OMDBFilm {
  Title: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
}

export interface Film extends SWAPIFilm {
  poster?: string;
  ratings?: { Source: string; Value: string }[];
  averageRating?: number;
  imdbRating?: number;
  metaRating?: number;
  rtRating?: number;
  opening_crawl?: string;
}

const useFilms = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('https://swapi.dev/api/films/?format=json')
      .then(async (response) => {
        const swapiFilms: SWAPIFilm[] = response.data.results;
        const filmDataPromises = swapiFilms.map(async (film) => {
          try {
            const omdbResponse = await axios.get<OMDBFilm>(
              `https://www.omdbapi.com/?t=${encodeURIComponent(
                film.title
              )}&apikey=b9a5e69d`
            );
            const ratings = omdbResponse.data.Ratings || [];
            const imdbRating = parseFloat(
              ratings
                .find((r) => r.Source === 'Internet Movie Database')
                ?.Value.split('/')[0] || '0'
            );
            const metaRating = parseFloat(
              ratings
                .find((r) => r.Source === 'Metacritic')
                ?.Value.split('/')[0] || '0'
            );
            const rtRating = parseFloat(
              ratings
                .find((r) => r.Source === 'Rotten Tomatoes')
                ?.Value.replace('%', '') || '0'
            );

            const averageRating =
              (imdbRating + metaRating / 10 + rtRating / 10) / 3;

            return {
              ...film,
              poster: omdbResponse.data.Poster,
              ratings: omdbResponse.data.Ratings,
              averageRating,
              imdbRating,
              metaRating,
              rtRating,
            };
          } catch (error) {
            console.error(
              `Failed to fetch data for ${film.title} from OMDB`,
              error
            );
            return film;
          }
        });

        const filmsWithOmdbData = await Promise.all(filmDataPromises);
        setFilms(filmsWithOmdbData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  return { films, loading, error };
};

export default useFilms;
