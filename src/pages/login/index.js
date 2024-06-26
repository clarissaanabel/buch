import React from 'react';
import HomeBannerLogo from '@/components/HomeBannerLogo/HomeBannerLogo';
import LoginForm from '@/components/Login/LoginForm';

const index = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen mt-10 md:mt-0'>
      <div className='flex flex-col md:flex-row items-center justify-center mx-auto'>
        <div className='md:w-auto mb-4 md:mb-0 md:mr-10 rounded-lg  p-4'>
          <HomeBannerLogo />
        </div>
        <div className='w-full md:w-auto'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default index;