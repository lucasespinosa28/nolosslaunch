import { useQuery } from '@tanstack/react-query';

// Define the LaunchpadCreated type
type LaunchpadCreated = {
  id: string;
  launchpadAddress: string;
  refundDate: string;
  timestamp_: string;
};

// GraphQL query
const TOKENS_QUERY = `
query newTokens($first: Int!, $skip: Int!,$address:String!) {
  tokenCreateds(
    first: $first
    skip: $skip
    orderDirection: desc
    orderBy: timestamp_
    where: {owner_contains: $address}
  ) {
    id
    timestamp_
    tokenAddress
    owner
  }
}
  `;

// Function to fetch tokens
const fetchTokens = async (address: `0x${string}`, first: number, skip: number): Promise<any[]> => {
  address = address.toLowerCase() as `0x${string}`;
  console.log(JSON.stringify({
    query: TOKENS_QUERY,
    variables: { address, first, skip },
  }))
  const response = await fetch('https://api.goldsky.com/api/public/project_cm40m9frcp0uf01sa8as570rr/subgraphs/StakedUSDeMinterFactory-sepolia/1.0.0/gn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: TOKENS_QUERY,
      variables: { address, first, skip },
    }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: any = await response.json();
  console.log({data})
  const tokens = data.data.tokenCreateds
  console.log('fixAddress:', address);
  return tokens;
};


// Hook to get tokens
export const useTokenOwner = (address: `0x${string}`, first: number = 4, skip: number = 0) => {
  return useQuery<any[], Error>({
    queryKey: ['newTokensOwner', first, skip],
    queryFn: () => fetchTokens(address, first, skip),
  });
};

