import React from 'react';
import { useParams } from 'react-router';

const TokenPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Token Details</h1>
      <p>Viewing details for token with ID: {id}</p>
      {/* Add more token details here */}
    </div>
  );
};

export default TokenPage;