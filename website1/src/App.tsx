import React from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explorer from './pages/Explorer';
import CreateToken from './pages/CreateToken';
import { Routes, Route } from 'react-router';
import TokenPage from './pages/TokenPage';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <div>
     <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/create-token" element={<CreateToken />} />
        <Route path="/token/:id" element={<TokenPage />} />
      </Routes>
    </div>
  );
};

export default App;
