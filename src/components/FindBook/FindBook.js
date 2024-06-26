import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import tw from 'tailwind-styled-components';
import { useQuery } from '@apollo/client';
import { FIND_BOOK } from '@/graphql/queries/queries';

const FindBookContainer = tw(Box)`
  bg-white 
  p-4 
  rounded-lg 
  shadow-xl 
  w-full 
  max-w-md
`;

const FindBook = () => {
  const [searchCriteria, setSearchCriteria] = useState({ titel: '', isbn: '' });
  const [submitted, setSubmitted] = useState(false);
  const { loading, error, data } = useQuery(FIND_BOOK, {
    variables: { suchkriterien: searchCriteria },
    skip: !submitted
  });

  const handleSearch = () => {
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value
    });
  };

  return (
    <FindBookContainer>
      <Typography id="find-book-modal-title" variant="h6" component="h2">
        What are you Looking for?
      </Typography>
      <TextField
        fullWidth
        label="Titel"
        name="titel"
        margin="normal"
        variant="outlined"
        value={searchCriteria.titel}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        label="ISBN"
        name="isbn"
        margin="normal"
        variant="outlined"
        value={searchCriteria.isbn}
        onChange={handleInputChange}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      <div className='mt-3'>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            {data.buecher.map((book) => (
              <div key={book.id}>
                <p>Title: {book.titel.titel}</p>
                <p>Subtitle: {book.titel.untertitel}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Preis: {book.preis}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </FindBookContainer>
  );
};

export default FindBook;
