import { useQuery } from '@tanstack/react-query';

type Transfer = {
  timestamp_: string;
  value: string;
  from: string;
  transactionHash_: string;
};

type DepositsResponse = {
  data: {
    transfers: Transfer[];
  };
};

const GRAPHQL_ENDPOINT = 'https://api.goldsky.com/api/public/project_cm40m9frcp0uf01sa8as570rr/subgraphs/usedtrack-sepolia/1.0.0/gn';

const fetchDeposits = async (contractAddress: string): Promise<DepositsResponse> => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          transfers(where: {to: "${contractAddress}"}) {
            timestamp_
            value
            from
            transactionHash_
          }
        }
      `,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useDeposits(contractAddress: string) {
  return useQuery<DepositsResponse, Error>({
    queryKey: ['deposits', contractAddress],
    queryFn: () => fetchDeposits(contractAddress),
  });
}