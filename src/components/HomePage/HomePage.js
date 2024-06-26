import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { Button, Box } from '@mui/material'
import FindBook from '../FindBook/FindBook';
import CreateNewBookModel from '../CreateNewBookModel/CreateNewBookModel'

const CenteredContainer = tw.div`
  flex 
  flex-col
  justify-center 
  items-center 
  p-4
`;

const ButtonContainer = tw.div`
  flex 
  justify-between 
  w-full 
  max-w-screen-lg 
  mx-auto
`;

const StyledButton = tw(Button)`
  bg-gray-600
  hover:bg-gray-700
  text-white
`;

const HomePage = () => {
  const [findBookOpen, setFindBookOpen] = useState(false);
  const [createBookModalOpen, setCreateBookModalOpen] = useState(false);

  const handleToggleFindBook = () => setFindBookOpen((prev) => !prev);
  const handleOpenCreateBookModal = () => {
    setFindBookOpen(false);
    setCreateBookModalOpen(true);
  }
  const handleCloseCreateBookModal = () => setCreateBookModalOpen(false);

  return (
    <CenteredContainer>
      <ButtonContainer>
        <StyledButton variant="contained" onClick={handleToggleFindBook}>
          Find a Book
        </StyledButton>
        <StyledButton variant="contained" onClick={handleOpenCreateBookModal}>
          Create a Book
        </StyledButton>
      </ButtonContainer>

      {findBookOpen && (
        <Box className="w-full max-w-screen-lg mt-4">
          <FindBook />
        </Box>
      )}

      <CreateNewBookModel
        createBookModalOpen={createBookModalOpen}
        handleCloseCreateBookModal={handleCloseCreateBookModal}
      />
    </CenteredContainer>
  );
};

export default HomePage;
