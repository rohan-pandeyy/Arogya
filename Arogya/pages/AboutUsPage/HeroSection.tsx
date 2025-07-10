import React from 'react';
import { Vortex } from '@/components/ui/vortex';

export default function HeroSection() {
  return (
    <div className='w-full h-[30rem] overflow-hidden mt-16 bg-black'>
      <Vortex
        backgroundColor='black'
        className='flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full'
      >
        <h2 className='text-white text-5xl md:text-6xl font-bold text-center'>
          What is <span className='font-specialGothic font-light'>Arogya</span>?
        </h2>
        <p className='text-white text-md md:text-2xl max-w-xl mt-6 text-center font-plusjakarta'>
          Quality Healthcare Accessible at Your Doorstep
        </p>
      </Vortex>
    </div>
  );
}
