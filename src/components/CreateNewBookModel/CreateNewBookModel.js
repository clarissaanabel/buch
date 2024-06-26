import { Box, Button, Modal, TextField, Typography, IconButton, Grid, FormControlLabel, Checkbox } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import tw from 'tailwind-styled-components';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK } from '@/graphql/mutation/mutation';

const StyledModal = tw(Modal)`
  flex 
  items-center 
  justify-center
`;
const ModalContent = tw(Box)`
  bg-white 
  p-5 
  rounded-lg 
  shadow-xl 
  w-full 
  max-w-3xl
  mx-4
  overflow-y-auto
  max-h-screen
`;
const StyledButton = tw(Button)`
  bg-gray-600
  hover:bg-gray-700
  text-white
  mb-3
`;

const CreateNewBookModal = ({ createBookModalOpen, handleCloseCreateBookModal }) => {
  const [formData, setFormData] = useState({
    titel: '',
    untertitel: '',
    isbn: '',
    rating: '',
    art: '',
    preis: '',
    rabatt: '',
    lieferbar: false,
    datum: '',
    homepage: '',
    schlagwoerter: '',
    abbildungen: [{ beschriftung: '', contentType: '' }]
  });

  const [createBook] = useMutation(CREATE_BOOK);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createBook({
        variables: {
          input: {
            isbn: formData.isbn,
            rating: parseFloat(formData.rating),
            art: formData.art,
            preis: parseFloat(formData.preis),
            rabatt: parseFloat(formData.rabatt),
            lieferbar: formData.lieferbar,
            datum: formData.datum,
            homepage: formData.homepage,
            schlagwoerter: formData.schlagwoerter.split(',').map(word => word.trim()),
            titel: { titel: formData.titel, untertitel: formData.untertitel },
            abbildungen: formData.abbildungen.map(ab => ({ beschriftung: ab.beschriftung, contentType: ab.contentType }))
          },
        },
      });
      handleCloseCreateBookModal();
    } catch (error) {
      console.error('Fehler beim Erstellen des Buches:', error);
    }
  };

  return (
    <StyledModal
      open={createBookModalOpen}
      onClose={handleCloseCreateBookModal}
      aria-labelledby="create-book-modal-title"
      aria-describedby="create-book-modal-description"
    >
      <ModalContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography className="text-2xl text-gray-600 font-bold" id="create-book-modal-title" variant="h6" component="h2">
            CreateBook Modal
          </Typography>
          <IconButton onClick={handleCloseCreateBookModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Titel"
              name="titel"
              value={formData.titel}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Untertitel"
              name="untertitel"
              value={formData.untertitel}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="ISBN"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bewertung"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Art"
              name="art"
              value={formData.art}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Preis"
              name="preis"
              value={formData.preis}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Rabatt"
              name="rabatt"
              value={formData.rabatt}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.lieferbar}
                  onChange={handleInputChange}
                  name="lieferbar"
                />
              }
              label="Lieferbar"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Datum"
              name="datum"
              type="date"
              value={formData.datum}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Homepage"
              name="homepage"
              value={formData.homepage}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Schlagwörter (durch Kommas getrennt)"
              name="schlagwoerter"
              value={formData.schlagwoerter}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          {formData.abbildungen.map((abbildung, index) => (
            <Grid container item spacing={2} key={index}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Beschriftung"
                  name="beschriftung"
                  value={abbildung.beschriftung}
                  onChange={(e) => {
                    const newAbbildungen = [...formData.abbildungen];
                    newAbbildungen[index].beschriftung = e.target.value;
                    setFormData({ ...formData, abbildungen: newAbbildungen });
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Content Type"
                  name="contentType"
                  value={abbildung.contentType}
                  onChange={(e) => {
                    const newAbbildungen = [...formData.abbildungen];
                    newAbbildungen[index].contentType = e.target.value;
                    setFormData({ ...formData, abbildungen: newAbbildungen });
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <StyledButton onClick={handleSubmit}>Submit</StyledButton>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default CreateNewBookModal;
