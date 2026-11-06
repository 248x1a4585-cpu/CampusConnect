import React from 'react';
import { CampusProvider } from './context/CampusContext';
import { MainNavigationShell } from './components/MainNavigationShell';

export default function App() {
  return (
    <CampusProvider>
      <MainNavigationShell />
    </CampusProvider>
  );
}
