// app/layout.tsx
import '../styles/globals.css';

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
        {children}
      </body>
    </html>
  );
}
