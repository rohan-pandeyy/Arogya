// app/layout.tsx
import '@/styles/globals.css';
import NavBar from '@/components/NavBar';
import { ModalProvider } from "@/context/ModalContext";
import { UserProvider } from "@/context/UserContext";
import { ReactNode } from 'react';

export const metadata = {
  title: 'Arogya App',
  description: 'Health management system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <UserProvider> 
          <ModalProvider>
            <NavBar />
            {children}
          </ModalProvider>
        </UserProvider>
      </body>
    </html>
  );
}
