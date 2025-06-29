'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Task Board App</title>
      </head>
      <body className="bg-blue-600 min-h-screen">
        <Provider store={store}>
          <div className="w-full max-w-[1440px] min-w-0 lg:min-w-[1024px] mx-auto">{children}</div>
        </Provider>
      </body>
    </html>
  );
}