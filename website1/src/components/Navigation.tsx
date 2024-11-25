import React from 'react';
import { Link } from 'react-router';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-indigo-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link to="/" className="hover:text-gray-300">NoLossToken</Link>
        </div>

        <ul className="flex space-x-6">
          <li><Link to="/profile" className="hover:text-gray-300">Profile</Link></li>
          <li><Link to="/explorer" className="hover:text-gray-300">Explorer</Link></li>
          <li><Link to="/create-token" className="hover:text-gray-300">Create Token</Link></li>
        </ul>

        <div>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;