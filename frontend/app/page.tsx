"use client"
import { useState } from 'react';
import Container from '@/components/Container';
import { useTokens } from '@/hooks/graphql/useTokens';
import TokenInfoCard from '@/components/tokenInfoCard';
import { useNewTokens } from '@/hooks/graphql/useNewTokens';
import Link from 'next/link';

type TokenSepolia = {
  id: string;
  tokenAddress: string;
  timestamp_: string;
}

/**
 * Home component for the NoLossLaunch application.
 * 
 * This component renders the main page of the application, including:
 * - A hero section with an introduction to NoLossLaunch
 * - A section displaying newly created tokens
 * - A section showing trending tokens with pagination
 * 
 * It uses custom hooks to fetch token data and manages pagination state.
 * 
 * @returns {JSX.Element} The rendered Home component
 */
export default function Home() {
  const { data: tokensSepolia, isLoading, error: TokenError } = useTokens(1000, 0);
  const { data: newtokensSepolia, isLoading: newTokens, error: newTokenError } = useNewTokens();
  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 8;
  // Calculate the indexes for the current page
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = tokensSepolia ? tokensSepolia.slice(indexOfFirstToken, indexOfLastToken) : [];

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <Container>
      <section className="text-center py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">NoLossLaunch</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Revolutionizing token launches with risk-free investments and passive income for creators.
            <span className="font-bold text-yellow-300"> Our tokens are fully refundable,</span> ensuring
            a safe and innovative approach to crypto investments.
          </p>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start">
                <div className="bg-yellow-400 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Safe Investments</h3>
                  <p className="text-gray-300">Get refunds if projects don't meet expectations</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-400 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Passive Income</h3>
                  <p className="text-gray-300">Creators earn yield from USDe investments</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-yellow-400 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Transparent Process</h3>
                  <p className="text-gray-300">Benefit from a safer launch ecosystem</p>
                </div>
              </div>
            </div>
          </div>
          <Link href="/create" className="inline-block bg-yellow-400 text-indigo-900 font-bold text-lg py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300 transform hover:scale-105">
            Create Your Token
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>
      <section className="py-8">
        <h3 className="text-2xl font-bold text-center mb-6">Newly created</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {newtokensSepolia && newtokensSepolia.map((token: TokenSepolia) => (
            <TokenInfoCard key={token.id} contractAddress={token.tokenAddress as `0x${string}`} />
          ))}
        </div>
      </section>
      <section className="py-8">
        <h3 className="text-2xl font-bold text-center mb-6">Trending Mock demo</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {currentTokens.map((token: TokenSepolia) =>
            <TokenInfoCard key={token.id} contractAddress={token.tokenAddress as `0x${string}`} />
          )}
        </div>
        {tokensSepolia && tokensSepolia.length > tokensPerPage && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: Math.ceil(tokensSepolia.length / tokensPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}