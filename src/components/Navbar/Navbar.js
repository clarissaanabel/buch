import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import { Button } from '@mui/material';
import ImageComponent from '../ImageComponent/ImageComponent';

const NavbarContainer = tw.div`
  text-white
  py-4
  px-8
  bg-white
  shadow-xl
  h-20
  mb-10
`;

const StyledButton = tw(Button)`
  bg-gray-600
  hover:bg-gray-700
  text-white
`;

const HoverImageContainer = tw.div`
  cursor-pointer
  transition-transform
  duration-300
  transform
  hover:scale-110
`;

const Navbar = () => {
  const router = useRouter();

  const handleSignOut = () => {
    router.push('/login');
  };

  return (
    <NavbarContainer>
      <div className="flex items-center justify-between -mt-6">
        <HoverImageContainer onClick={() => router.push('/')}>
          <ImageComponent
            src='/navbarLogo.png'
            alt='Navbar Logo'
            width={100}
            height={20}
          />
        </HoverImageContainer>
        <StyledButton onClick={handleSignOut} variant="contained">
          Logout
        </StyledButton>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
