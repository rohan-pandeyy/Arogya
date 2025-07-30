'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { getBaseUrl } from '@/lib/getBaseUrl';

// ✅ DEFINE THE TYPE FOR THE NESTED PATIENT OBJECT
type PatientProfile = {
  id: string;
  address: string | null;
  bloodGroup: string | null;
  diagonosis: string | null;
  allergies: string | null;
};

// ✅ UPDATE THE MAIN USER TYPE
type User = {
  id: string; // Changed to string to match UUID
  name: string;
  email: string;
  age: number | null; // Added age
  phone: string | null; // Added phone
  Patient?: PatientProfile; // Added the optional, nested Patient object
  // The user object might also contain Roles, Doctor, Staff, etc.
  // We can add them here if needed on other pages.
};

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    // This effect is useful for client-side navigation where
    // the initialUser might not be available.
    if (user) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${getBaseUrl()}/api/users/me`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch user on client');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        // It's normal for this to fail if the user is not logged in.
        setUser(null);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};