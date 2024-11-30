import React from 'react';
import Link from 'next/link';

const ExploreMoreCard: React.FC = () => {
  return (
    <Link href="/explore" className="block">
      <div className="border border-indigo-700 rounded-lg overflow-hidden hover:border-indigo-400 transition-colors aspect-square flex items-center justify-center">
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-2">Explore More</h4>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ExploreMoreCard;