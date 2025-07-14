'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import bgImage from '@/public/assets/BookAppointmentPage/AppointmentBookingBG.jpg';
import googleplaybtn from '@/public/assets/BookAppointmentPage/DownloadOnGooglePlayBadge.png';
import appstorebtn from '@/public/assets/BookAppointmentPage/DownloadOnAppStoreBadge.png';
import {
  UserIcon,
  HeartIcon,
  AcademicCapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const categories = [
  { label: 'General', icon: UserIcon },
  { label: 'Dentist', icon: SparklesIcon },
  { label: 'Heart', icon: HeartIcon },
  { label: 'Pediatric', icon: AcademicCapIcon },
];

const hospitals = ['- Select Hospital -', 'Apollo', 'Fortis', 'AIIMS'];
const times = ['10:00 AM', '12:00 PM', '2:00 PM'];
const today = new Date();
const dates = [
  {
    label: `Today (${today.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })})`,
    value: today.toISOString().slice(0, 10),
  },
];

export default function HeroSection() {
  const [activeCategory, setActiveCategory] = useState('General');
  const [selectedHospital, setSelectedHospital] = useState(hospitals[0]);
  const [selectedTime, setSelectedTime] = useState(times[0]);
  const [selectedDate, setSelectedDate] = useState(dates[0].value);

  return (
    <div className='relative w-full h-screen mt-16'>
      <Image
        src={bgImage}
        alt='Hero Section Background'
        fill
        className='object-cover object-center -z-10'
        placeholder='blur'
        quality={100}
      />
      <div className='absolute inset-0 bg-black bg-opacity-20 z-0' />
      <div className='relative z-10 flex flex-col md:flex-row items-center w-full h-full'>
        {/* Left Section */}
        <div className='flex flex-col justify-center items-start w-full md:w-1/2 p-8 md:p-16 text-white'>
          <h1 className='text-4xl md:text-5xl font-bold font-plusjakarta mb-6'>
            The future of appointment booking.
          </h1>
          <p className='text-gray-200 text-lg md:text-xl font-plusjakarta mb-8'>
            Find the best hospitals, check availability, and book your
            appointment in just a few clicks. Fast, secure, and convenient.
          </p>
          <div className='flex space-x-4'>
            <a
              href='https://play.google.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src={googleplaybtn}
                alt='Download on Play Store'
                height={48}
              />
            </a>
            <a
              href='https://www.apple.com/app-store/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src={appstorebtn}
                alt='Download on App Store'
                height={48}
              />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex w-full md:w-1/2 justify-center items-center mt-8 md:mt-0'>
          <div className='backdrop-blur-lg bg-white/70 rounded-[35px] shadow-lg p-8 min-w-[320px] max-w-auto mx-auto'>
            <h2 className='text-2xl font-bold font-plusjakarta mb-2'>
              Book an Appointment
            </h2>
            <p className='text-gray-500 font-plusjakarta text-sm mb-6'>
              Choose your category and schedule an appointment easily.
            </p>
            <div className='flex space-x-2 mb-6'>
              {categories.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => setActiveCategory(label)}
                  className={`flex items-center px-3 py-2 rounded-lg transition ${activeCategory === label ? 'bg-green-600/70 text-white shadow' : 'bg-white/80 text-gray-700 hover:bg-green-100'}`}
                >
                  <Icon className='h-5 w-5 mr-2' />
                  <span className='text-sm font-plusjakarta'>{label}</span>
                </button>
              ))}
            </div>
            <div className='space-y-4'>
              {/* hospital dropdown */}
              <select
                className='w-full p-2 font-plusjakarta rounded-lg border border-gray-300 focus:border-blue-500'
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
              >
                {hospitals.map((hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                ))}
              </select>
              {/* Time Dropdown */}
              <select
                className='w-full p-2 font-plusjakarta rounded-lg border border-gray-300 focus:border-blue-500'
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {/* Date Dropdown */}
              <select
                className='w-full p-2 font-plusjakarta rounded-lg border border-gray-300 focus:border-blue-500'
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {dates.map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
