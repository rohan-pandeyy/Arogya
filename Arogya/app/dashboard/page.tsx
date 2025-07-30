'use client';
import React, { useState, useEffect } from 'react';
import { Input, Button, Avatar } from '@heroui/react';
import { useUser } from '@/context/UserContext';
import { getBaseUrl } from '@/lib/getBaseUrl';

export default function Profile() {
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    // Fields from User model
    name: '',
    age: '',
    phone: '',
    // Fields from Patient model
    address: '',
    bloodGroup: '',
    diagonosis: '',
    allergies: '',
  });

  // This effect runs when the user object is available
  useEffect(() => {
    // The user object from context already contains all the profile data
    if (user) {
      setFormData({
        // Populate form with data from the User model
        name: user.name || '',
        age: user.age !== undefined && user.age !== null ? String(user.age) : '',
        phone: user.phone !== undefined && user.phone !== null ? String(user.phone) : '',
        // Populate form with data from the nested Patient model
        address: user.Patient?.address || '',
        bloodGroup: user.Patient?.bloodGroup || '',
        diagonosis: user.Patient?.diagonosis || '',
        allergies: user.Patient?.allergies || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Separate form data for each API endpoint
    const userPayload = {
      name: formData.name,
      age: formData.age,
      phone: formData.phone,
    };

    const patientPayload = {
      address: formData.address,
      bloodGroup: formData.bloodGroup,
      diagonosis: formData.diagonosis,
      allergies: formData.allergies,
    };

    try {
      // Use Promise.all to send both requests concurrently
      const [userRes, patientRes] = await Promise.all([
        // Update the base User profile
        fetch(`${getBaseUrl()}/api/users/me`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(userPayload),
        }),
        // Update the Patient-specific profile
        fetch(`${getBaseUrl()}/api/patients/me`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(patientPayload),
        }),
      ]);

      // Check if both requests were successful
      if (userRes.ok && patientRes.ok) {
        alert('Profile saved successfully!');
        // Optionally, refetch the user data to update the context
        const updatedUserRes = await fetch(`${getBaseUrl()}/api/users/me`, { credentials: 'include' });
        if (updatedUserRes.ok) {
            const updatedUserData = await updatedUserRes.json();
            setUser(updatedUserData);
        }
      } else {
        // Handle potential errors from either request
        const userError = !userRes.ok ? await userRes.text() : '';
        const patientError = !patientRes.ok ? await patientRes.text() : '';
        alert(`Failed to save profile: ${userError} ${patientError}`);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An unexpected error occurred.');
    }
  };

  const firstName = user?.name?.split(' ')[0] || '';
  const initial = firstName ? firstName.charAt(0).toUpperCase() : '';

  return (
    <div className='min-h-screen p-6'>
      <div className='flex items-center justify-center mb-6'>
        <h1 className='text-2xl font-specialGothic text-foreground'>
          Patient Profile
        </h1>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-6'>
        {/* Avatar Panel */}
        <div className='bg-green-100/10 backdrop-blur-md shadow-xl rounded-lg flex flex-col items-center justify-center w-full aspect-square'>
          <Avatar
            isBordered
            className='bg-success font-opensans text-white border-black text-3xl w-20 h-20'
            name={initial}
          />
          <h2 className='text-lg font-opensans font-semibold text-foreground mt-2'>
            {formData.name || 'Patient Name'}
          </h2>
          <p className='text-sm text-gray-500'>
            {formData.phone || 'Phone not set'}
          </p>
        </div>

        {/* Main Info Grid */}
        <div className='grid xl:grid-cols-3 gap-4'>
          {/* General Info */}
          <div className='bg-green-100/10 backdrop-blur-md p-4 rounded-lg shadow-xl space-y-3 xl:col-span-1'>
            <h3 className='font-specialGothic font-medium text-sm mb-1'>
              General Information
            </h3>
            
            <div>
              <label className='text-xs font-opensans'>Full Name</label>
              <Input
                name='name'
                value={formData.name}
                onChange={handleChange}
                size='sm'
              />
            </div>

            <div>
              <label className='text-xs font-opensans'>Age</label>
              <Input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleChange}
                size='sm'
              />
            </div>

            <div>
              <label className='text-xs font-opensans text-foreground'>
                Phone
              </label>
              <Input
                type='text' // Changed to text to allow for formatting
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className='font-opensans'
                size='sm'
              />
            </div>
            
             <div>
              <label className='text-xs font-opensans'>Address</label>
              <Input
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='font-opensans'
                size='sm'
              />
            </div>
          </div>

          {/* Medical Info */}
          <div className='bg-green-100/10 shadow-xl p-4 rounded-lg space-y-3 xl:col-span-1'>
            <h3 className='font-specialGothic font-medium text-sm mb-1'>
              Medical Info
            </h3>

            <div>
              <label className='text-xs font-opensans text-foreground'>
                Blood Group
              </label>
              <Input
                name='bloodGroup'
                value={formData.bloodGroup}
                onChange={handleChange}
                className='font-opensans'
                size='sm'
                placeholder='e.g. B+ / O-'
              />
            </div>

            <div>
              <label className='text-xs font-opensans text-foreground'>
                Diagnosis
              </label>
              <Input
                name='diagonosis' // Match backend model spelling
                value={formData.diagonosis}
                onChange={handleChange}
                className='font-opensans'
                size='sm'
              />
            </div>

            <div>
              <label className='text-xs font-opensans text-foreground'>
                Allergies
              </label>
              <Input
                name='allergies'
                value={formData.allergies}
                onChange={handleChange}
                className='font-opensans'
                size='sm'
              />
            </div>
          </div>

          {/* Files & Notes */}
          <div className='space-y-4 xl:col-span-1'>
            <div className='bg-green-100/10 shadow-xl p-4 rounded-lg'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='font-opensans text-foreground font-semibold'>
                  Files
                </h3>
                <Button
                  variant='light'
                  size='sm'
                  className='font-opensans font-semibold'
                >
                  Download
                </Button>
              </div>
              <p className='text-center font-opensans font-semibold text-sm text-gray-400'>
                No files uploaded
              </p>
            </div>

            <div className='bg-green-100/10 shadow-xl p-4 rounded-lg'>
              <div className='flex justify-between items-center mb-2'>
                <h3 className='font-opensans text-foreground font-semibold'>
                  Notes
                </h3>
                <Button
                  variant='light'
                  size='sm'
                  className='font-opensans text-foreground font-semibold'
                >
                  Download
                </Button>
              </div>
              <p className='text-center text-sm font-opensans font-semibold text-gray-400'>
                No notes available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className='mt-8 text-center'>
        <Button
          color='default'
          className='px-8 py-2 font-specialGothic text-base w-48'
          onClick={handleSave}
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
}
