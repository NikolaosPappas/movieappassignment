import React from 'react';
import {
  AppBar,
  Toolbar,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Switch,
} from '@mui/material';

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  sortOption: string;
  onSortOptionChange: (option: string) => void;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
  darkModeIcon: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchQueryChange,
  sortOption,
  onSortOptionChange,
  darkMode,
  onDarkModeChange,
  darkModeIcon,
}) => (
  <AppBar position='static' sx={{ marginBottom: '25px', padding: '15px 0' }}>
    <Toolbar>
      <Box display='flex' alignItems='center' width='100%'>
        <TextField
          variant='outlined'
          placeholder='Search by title or director...'
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          style={{
            flexGrow: 1,
            marginRight: '20px',
            backgroundColor: darkMode ? '#333' : 'white',
          }}
        />
        <FormControl variant='standard' sx={{ m: 1, minWidth: 140 }}>
          <InputLabel style={{ color: darkMode ? 'white' : 'black' }}>
            Sort by
          </InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => onSortOptionChange(e.target.value as string)}
            sx={{
              '& .MuiSelect-select': { color: darkMode ? 'white' : 'black' },
              '& .MuiSelect-icon': { color: darkMode ? 'white' : 'black' },
            }}
          >
            <MenuItem value='Year'>Year</MenuItem>
            <MenuItem value='Episode'>Episode</MenuItem>
            <MenuItem value='Average Rating'>Average Rating</MenuItem>
          </Select>
        </FormControl>
        <Box display='flex' alignItems='center' ml={2}>
          <Switch
            checked={darkMode}
            onChange={(e) => onDarkModeChange(e.target.checked)}
            inputProps={{ 'aria-label': 'dark mode toggle' }}
          />
          <Box ml={1} fontSize={14} color={darkMode ? 'white' : 'black'}>
            {darkModeIcon}
          </Box>
        </Box>
      </Box>
    </Toolbar>
  </AppBar>
);

export default SearchBar;
