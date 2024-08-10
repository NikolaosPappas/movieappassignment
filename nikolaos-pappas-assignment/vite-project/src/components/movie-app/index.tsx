import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import useFilms, { Film } from '../../hooks/useFilms';
import SearchBar from '../search-bar';
import FilmList from '../film-list';
import FilmDetails from '../film-details';
import { Grid, Stack, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { lightTheme, darkTheme } from '../../util/themesProvider';

const MovieApp: React.FC = () => {
  const { films, loading, error } = useFilms();
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('Year');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleFilmDetails = (film: Film) => {
    setSelectedFilm(selectedFilm?.episode_id === film.episode_id ? null : film);
  };

  const filteredFilms = films.filter(
    (film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.director.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFilms = filteredFilms.sort((a, b) => {
    switch (sortOption) {
      case 'Year':
        return (
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
        );
      case 'Episode':
        return a.episode_id - b.episode_id;
      case 'Average Rating':
        return (b.averageRating || 0) - (a.averageRating || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        sortOption={sortOption}
        onSortOptionChange={setSortOption}
        darkMode={darkMode}
        onDarkModeChange={(darkMode) => setDarkMode(darkMode)}
        darkModeIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      />
      <Grid container spacing={2}>
        <FilmList
          films={sortedFilms}
          selectedFilm={selectedFilm}
          onFilmSelect={toggleFilmDetails}
        />
        {selectedFilm ? (
          <FilmDetails film={selectedFilm} />
        ) : (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Stack
              direction='row'
              justifyContent='center'
              sx={{ paddingTop: 20, width: '100%' }}
            >
              <Typography sx={{ textAlign: 'center' }} variant='body2'>
                No movie selected
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default MovieApp;
