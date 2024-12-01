import { useTokenOwner } from '@/hooks/graphql/useTokenOwner';
import TokenGrid from '@/components/ui/home/TokenGrid';
import Pagination from '@/components/ui/home/Pagination';
import { useState } from 'react';

const TOKENS_PER_PAGE = 4;

interface UserCreatedTokensProps {
    address: `0x${string}`
}

export default function UserCreatedTokens({ address }: UserCreatedTokensProps) {
    const { data: newtokensSepolia, isLoading: newTokensLoading, error: newTokenError } = useTokenOwner(
        address, 1000, 0);

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastToken = currentPage * TOKENS_PER_PAGE;
    const indexOfFirstToken = indexOfLastToken - TOKENS_PER_PAGE;
    const currentTokens = newtokensSepolia ? newtokensSepolia.slice(indexOfFirstToken, indexOfLastToken) : [];

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <TokenGrid
                title="Tokens that you created"
                tokens={currentTokens}
                isLoading={newTokensLoading}
                error={newTokenError}
            />
            {newtokensSepolia && newtokensSepolia.length > TOKENS_PER_PAGE && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(newtokensSepolia.length / TOKENS_PER_PAGE)}
                    paginate={paginate}
                />
            )}
        </>
    );
}