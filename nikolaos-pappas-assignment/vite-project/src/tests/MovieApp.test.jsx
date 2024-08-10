import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { it, vi } from 'vitest';
import FilmList from '../components/film-list';
import SearchBar from '../components/search-bar';
import FilmDetails from '../components/film-details';

// Renders SearchBar component with default props
test('should render SearchBar component with default props', () => {
  const { getByPlaceholderText, getByLabelText } = render(
    <SearchBar
      searchQuery=''
      onSearchQueryChange={() => {}}
      sortOption='Year'
      onSortOptionChange={() => {}}
      darkMode={false}
      onDarkModeChange={() => {}}
      darkModeIcon={<span>🌞</span>}
    />
  );

  expect(
    getByPlaceholderText('Search by title or director...')
  ).toBeInTheDocument();
  // expect(getByLabelText('Sort by')).toBeInTheDocument();
  expect(getByLabelText('dark mode toggle')).toBeInTheDocument();
});

// Updates searchQuery state when input changes
test('should update searchQuery state when input changes', () => {
  const { getByPlaceholderText } = render(
    <SearchBar
      searchQuery=''
      onSearchQueryChange={(value) => {
        expect(value).toBe('new search query');
      }}
      sortOption=''
      onSortOptionChange={() => {}}
      darkMode={false}
      onDarkModeChange={() => {}}
      darkModeIcon={<span>🌙</span>}
    />
  );

  fireEvent.change(getByPlaceholderText('Search by title or director...'), {
    target: { value: 'new search query' },
  });
});

// Displays theme switch icon correctly based on dark mode state
it('should display theme icon correctly based on dark mode state', () => {
  const { getByText } = render(
    <SearchBar
      searchQuery=''
      onSearchQueryChange={() => {}}
      sortOption=''
      onSortOptionChange={() => {}}
      darkMode={true}
      onDarkModeChange={() => {}}
      darkModeIcon={<span>🌙</span>}
    />
  );

  expect(getByText('🌙')).toBeInTheDocument();
});

// Renders a list of films correctly
test('should render a list of films correctly when films are provided', () => {
  const films = [
    {
      episode_id: 1,
      title: 'Film 1',
      averageRating: 8.5,
      release_date: '2024-10-08',
    },
    {
      episode_id: 2,
      title: 'Film 2',
      averageRating: 7.0,
      release_date: '2024-10-08',
    },
  ];
  const selectedFilm = null;
  const onFilmSelect = vi.fn();

  render(
    <FilmList
      films={films}
      selectedFilm={selectedFilm}
      onFilmSelect={onFilmSelect}
    />
  );

  expect(screen.getByText(/Film 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Film 2/i)).toBeInTheDocument();
});

// Renders film details correctly when provided with a valid film object
it('should render film details correctly when provided with a valid film object', () => {
  const film = {
    episode_id: 4,
    title: 'A New Hope',
    poster: 'https://example.com/poster.jpg',
    opening_crawl: 'It is a period of civil war...',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    averageRating: 8.5,
    ratings: [
      { Source: 'Internet Movie Database', Value: '8.6/10' },
      { Source: 'Rotten Tomatoes', Value: '92%' },
    ],
  };

  const { getByText, getByAltText } = render(<FilmDetails film={film} />);

  expect(getByText('EPISODE IV - A New Hope')).toBeInTheDocument();
  expect(getByAltText('A New Hope')).toBeInTheDocument();
  expect(getByText('It is a period of civil war...')).toBeInTheDocument();
});
