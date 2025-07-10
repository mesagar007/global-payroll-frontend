import React from 'react';
import { Router } from '@/router';
import '@/styles/globals.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router />
    </div>
  );
};

export default App;