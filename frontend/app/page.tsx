"use client"
import { useState } from 'react';
import Container from '@/components/ui/Container';
import { useTokens } from '@/hooks/graphql/useTokens';
import { useNewTokens } from '@/hooks/graphql/useNewTokens';
import HeroSection from '@/components/ui/home/HeroSection';
import TokenGrid from '@/components/ui/home/TokenGrid';
import Pagination from '@/components/ui/home/Pagination';

export type TokenSepolia = {
  id: string;
  tokenAddress: string;
  timestamp_: string;
}

const TOKENS_PER_PAGE = 8;
export default function Home() {
  const { data: tokensSepolia, isLoading, error: TokenError } = useTokens(1000, 0);
  const { data: newtokensSepolia, isLoading: newTokensLoading, error: newTokenError } = useNewTokens();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastToken = currentPage * TOKENS_PER_PAGE;
  const indexOfFirstToken = indexOfLastToken - TOKENS_PER_PAGE;
  const currentTokens = tokensSepolia ? tokensSepolia.slice(indexOfFirstToken, indexOfLastToken) : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <HeroSection />
      <TokenGrid
        title="Newly created"
        tokens={newtokensSepolia}
        isLoading={newTokensLoading}
        error={newTokenError}
      />
      <TokenGrid
        title="Trending Mock demo"
        tokens={currentTokens}
        isLoading={isLoading}
        error={TokenError}
      />
      {tokensSepolia && tokensSepolia.length > TOKENS_PER_PAGE && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(tokensSepolia.length / TOKENS_PER_PAGE)}
          paginate={paginate}
        />
      )}
    </Container>
  );
}