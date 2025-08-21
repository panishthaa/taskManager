'use client';

import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AppProvider>
  );
}
