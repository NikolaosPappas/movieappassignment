import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Stack,
  Divider,
  Rating,
  Chip,
} from '@mui/material';
import { Film } from '../../hooks/useFilms';
import { toRoman } from '../../util/helpers';

interface FilmDetailsProps {
  film: Film;
}

const FilmDetails: React.FC<FilmDetailsProps> = ({ film }) => (
  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
    <Paper style={{ padding: '20px', height: '100vh', overflowY: 'auto' }}>
      <Typography variant='h5'>
        EPISODE {toRoman(film.episode_id)} - {film.title}
      </Typography>
      <Divider variant='middle' />
      <Box
        display='flex'
        alignItems='flex-start'
        sx={{ margin: '15px 0' }}
        gap={2}
        width='100%'
      >
        <Stack>
          {film.poster && (
            <img
              src={film.poster}
              alt={film.title}
              style={{ width: '150px' }}
            />
          )}
        </Stack>
        <Stack alignItems='flex-start'>
          <Typography
            sx={{ textAlign: 'left', marginBottom: '15px' }}
            variant='body1'
          >
            {film.opening_crawl}
          </Typography>
          <Typography sx={{ textAlign: 'left' }} variant='body2'>
            <strong>Director:</strong> {film.director}
          </Typography>
          <Typography sx={{ textAlign: 'left' }} variant='body2'>
            <strong>Producer:</strong> {film.producer}
          </Typography>
          <Typography sx={{ textAlign: 'left' }} variant='body2'>
            <strong>Release Date:</strong> {film.release_date}
          </Typography>
          <Stack direction='row' sx={{ margin: '10px 0' }}>
            <Typography sx={{ textAlign: 'left' }} variant='body2'>
              <strong>Average Rating:</strong>
            </Typography>
            <Rating
              size='small'
              max={10}
              precision={0.5}
              readOnly
              value={film.averageRating}
            />
          </Stack>
          {film.ratings && film.ratings.length > 0 && (
            <Stack direction='row' sx={{ flexWrap: 'wrap' }} gap={1}>
              {film.ratings.map((rating, index) => (
                <Chip
                  key={index}
                  label={`${rating.Source}: ${rating.Value}`}
                  color='primary'
                  variant='outlined'
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </Paper>
  </Grid>
);

export default FilmDetails;
