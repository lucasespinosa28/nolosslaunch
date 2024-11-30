import React from 'react';
import { useAccount } from 'wagmi';
import { useTokensByOwner } from '../hooks/useTokensByOwner';

const TokenList = () => {
  const { address } = useAccount();
  const { tokens, isError, isLoading } = useTokensByOwner(address);

  if (!address) return <div>Please connect your wallet</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tokens</div>;

  return (
    <div>
      <h2>Tokens owned by {address}</h2>
      {tokens.length === 0 ? (
        <p>No tokens found for this address</p>
      ) : (
        <ul>
          {tokens.map((token, index) => (
            <li key={index}>
              Token ID: {token.id}, Name: {token.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TokenList;