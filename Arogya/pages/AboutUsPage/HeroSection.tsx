import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="pt-12 pb-4 md:pt-20 md:pb-4 bg-gradient-to-b from-white to-green-100">
      <div className="container mx-auto py-12 md:py-12 px-6">
        <div className="flex flex-col md:flex-row items-center -mx-4">
          {/* Left Side */}
          <div className="md:w-1/2 px-4 text-center">
            <Image
              src="/arogya_wordmark.svg"
              alt="Arogya Wordmark"
              width={400}
              height={150}
              className="mx-auto"
            />
            <h2 className="font-plusjakarta text-3xl text-black font-bold leading-relaxed max-w-lg mx-auto mt-4">
              Revolutionizing{' '}
              <span className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 inline-block text-transparent bg-clip-text">
                Healthcare
              </span>{' '}
              for a Better Tomorrow
            </h2>
            <p className="font-plusjakarta text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto mt-6">
              We are a cause dedicated to breaking down the barriers that keep quality healthcare out of reach for people in need.
              {/* We aim to transform how the general public accesses and experiences medical care by bringing health services directly to their homes through smart tech & seamless connectivity. */}
            </p>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 px-4 mt-10 md:mt-0 flex justify-center">
            <Image
              src="/assets/AboutUsPage/HeroSection.svg"
              alt="Healthcare professionals collaborating"
              width={620}
              height={750}
              className="shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
