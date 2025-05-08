import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
};

export default App;
