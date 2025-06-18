// app/layout.tsx
import '@/styles/globals.css';
import NavBar from '@/components/NavBar';
import { ModalProvider } from "@/context/ModalContext";
import { getUserFromCookies } from '@/lib/getUser';
import { UserProvider } from "@/context/UserContext";
import { ReactNode } from 'react';

export const metadata = {
  title: 'Arogya App',
  description: 'Health management system',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getUserFromCookies();
  return (
    <html lang="en">
      <head />
      <body>
        <UserProvider initialUser={user}> 
          <ModalProvider>
            <NavBar />
            {children}
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
