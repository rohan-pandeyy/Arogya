'use client';
import React from 'react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';

export default function MissionSection() {
  return (
    <section>
      <div className='bg-gradient-to-b from-green-100 to-white h-auto'>
        <img
          src='/assets/layered-waves.svg'
          alt=''
          className='w-full'
          style={{ display: 'block' }}
          aria-hidden='true'
        />
        <div className='m-10'>
          <h2 className='text-black text-4xl md:text-6xl p-6 font-plusjakarta font-bold text-start'>
            Revolutionizing{' '}
            <span className='bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 inline-block text-transparent bg-clip-text'>
              Healthcare
            </span>{' '}
            for a Better Tomorrow
          </h2>
          <div className='flex flex-col md:flex-row w-full'>
            {/* Left */}
            <div className='md:w-1/2 w-full flex items-center justify-center p-8'>
              <p className='font-plusjakarta max-md:text-md text-xl text-gray-800'>
                Arogya is a cause dedicated to breaking down the barriers that
                keep quality healthcare out of reach for people in need. We aim
                to transform how the general public accesses and experiences
                medical care by bringing health services directly to their homes
                through smart tech & seamless connectivity.
              </p>
            </div>
            {/* Right */}
            <div className='md:w-1/2 w-full flex items-center justify-center'>
              <CardContainer className='inter-var'>
                <CardBody className='bg-gradient-to-r from-green-800 via-green-400 to-green-600 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  '>
                  {/* <CardItem
                                    translateZ="50"
                                    className="text-xl font-bold font-plusjakarta text-neutral-600 dark:text-white"
                                    >
                                    Make things float in air
                                    </CardItem>
                                    <CardItem
                                    as="p"
                                    translateZ="60"
                                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                                    >
                                    Hover over this card to unleash the power of CSS perspective
                                    </CardItem> */}
                  <CardItem translateZ='100' className='w-full mt-4'>
                    <img
                      src='/assets/mission&vision.avif'
                      height='1000'
                      width='1000'
                      className='h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl'
                      alt='thumbnail'
                    />
                  </CardItem>
                  {/* <div className="flex justify-between items-center mt-20">
                                        <CardItem
                                            translateZ={20}
                                            as="a"
                                            href="https://twitter.com/mannupaaji"
                                            target="__blank"
                                            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                                        >
                                            Try now →
                                        </CardItem>
                                        <CardItem
                                            translateZ={20}
                                            as="button"
                                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                        >
                                            Sign up
                                        </CardItem>
                                    </div> */}
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
