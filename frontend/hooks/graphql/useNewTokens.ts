import { useQuery } from '@tanstack/react-query';

// Define the LaunchpadCreated type
type LaunchpadCreated = {
  id: string;
  launchpadAddress: string;
  refundDate: string;
  timestamp_: string;
};

// Define the response type
type TokensResponse = {
  data: {
    launchpadCreateds: LaunchpadCreated[];
  };
};

// GraphQL query
const TOKENS_QUERY = `
   query newTokens($first: Int!, $skip: Int!) {
  tokenCreateds(
    first: $first
    skip: $skip
    orderDirection: desc
    orderBy: timestamp_
  ) {
    id
    timestamp_
    tokenAddress
  }
}
  `;

const GRAPHQL_ENDPOINT = 'https://api.goldsky.com/api/public/project_cm40m9frcp0uf01sa8as570rr/subgraphs/RefundableTokenFactory-sepolia/1.0.0/gn';

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
export const useNewTokens = (first: number = 4, skip: number = 0) => {
  return useQuery<any[], Error>({
    queryKey: ['newTokens', first, skip],
    queryFn: () => fetchTokens(first, skip),
  });
};