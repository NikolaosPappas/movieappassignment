import React from 'react';
import {
  Grid,
  Paper,
  List,
  ListItemButton,
  Typography,
  Rating,
  Divider,
  Box,
} from '@mui/material';
import { Film } from '../../hooks/useFilms';
import { toRoman } from '../../util/helpers';

interface FilmListProps {
  films: Film[];
  selectedFilm: Film | null;
  onFilmSelect: (film: Film) => void;
}

const FilmList: React.FC<FilmListProps> = ({
  films = [],
  selectedFilm,
  onFilmSelect,
}) => (
  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
    <Paper style={{ height: '100vh', overflowY: 'auto', padding: '0 10px' }}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {films.map((film) => (
          <Box key={film.episode_id}>
            <ListItemButton
              onClick={() => onFilmSelect(film)}
              selected={selectedFilm?.episode_id === film.episode_id}
              style={{ padding: '10px' }}
            >
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                width='100%'
                gap={2}
              >
                <Typography sx={{ minWidth: '272px' }} variant='body1'>
                  <strong>Episode {toRoman(film.episode_id)} - </strong>
                  {film.title}
                </Typography>
                <Rating
                  size='small'
                  max={10}
                  precision={0.5}
                  readOnly
                  value={film.averageRating}
                />
                <Typography variant='body2'>
                  <span style={{ fontSize: '14px', color: 'gray' }}>
                    {new Date(film.release_date).toLocaleDateString()}
                  </span>
                </Typography>
              </Box>
            </ListItemButton>
            <Divider variant='fullWidth' component='li' />
          </Box>
        ))}
      </List>
    </Paper>
  </Grid>
);

export default FilmList;
