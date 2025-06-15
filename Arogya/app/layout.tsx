// app/layout.tsx
import '@/styles/globals.css';
import NavBar from '@/components/NavBar'
import { ModalProvider } from "@/context/ModalContext";
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
        <ModalProvider>
          <NavBar />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
