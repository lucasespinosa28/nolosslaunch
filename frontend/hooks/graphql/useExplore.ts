import { useQuery } from '@tanstack/react-query';

// GraphQL query
const TOKENS_QUERY = `
   query Explore($first: Int!, $skip: Int!) {
    tokenCreateds(first: $first, skip: $skip) {
    tokenAddress
    imageUrl
    timestamp_
    owner
    cuntdownEnd
  }
}
  `;

  const GRAPHQL_ENDPOINT = 'https://api.goldsky.com/api/public/project_cm40m9frcp0uf01sa8as570rr/subgraphs/RefundableTokenFactory-sepolia/1.0.0/gn';
// Function to fetch tokens
const fetchTokens = async (first: number, skip: number): Promise<any[]> => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: TOKENS_QUERY,
      variables: { first, skip },
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: any = await response.json();
  const tokens = data.data.tokenCreateds
  return tokens;
};


// Hook to get tokens
export const useExplore = (first: number = 10, skip: number = 0) => {
  return useQuery<any[], Error>({
    queryKey: ['Tokens', first, skip],
    queryFn: () => fetchTokens(first, skip),
  });
};