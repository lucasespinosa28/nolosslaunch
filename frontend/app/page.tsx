"use client"
import Card from "@/components/Card";
import tokens from "../data/tokens.json"
import Link from 'next/link';
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 3;
  const maxPages = 3;

  // Create a new array called trending, sorted by price * totalSupply
  const trending = [...tokens].sort((a, b) => {
    const marketCapA = a.price * a.totalSupply;
    const marketCapB = b.price * b.totalSupply;
    return marketCapB - marketCapA; // Sort in descending order
  });

  const reversedTokens = [...tokens].reverse().slice(0, tokensPerPage * maxPages);
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = reversedTokens.slice(indexOfFirstToken, indexOfLastToken);

  const totalPages = Math.min(maxPages, Math.ceil(reversedTokens.length / tokensPerPage));

  const topTrending = trending.slice(0, 8);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <main>
      <section className="text-center py-8 bg-gray-800">
        <h2 className="text-3xl font-bold mb-4">Make Token Great Again</h2>
        <p className="mb-4">Launch and mint to efundable Token and earn through NoLossToken native yield and points.</p>
        <div className="space-x-4">
          <Link href="/create" className="inline-block border border-indigo-400 text-indigo-400 px-4 py-2 rounded hover:bg-indigo-400 hover:text-black transition-colors">
            Create my token
          </Link>
        </div>
      </section>
      <section className="py-8">
        <h3 className="text-2xl font-bold text-center mb-6">Latest Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {currentTokens.map((token, index) => (
            <Card
              key={index}
              imageSrc={token.image || "/images/placeholder.png"}
              title={token.name}
              description={`${token.price.toFixed(2)} ETH | ${(token.totalSupply / token.maxSupply * 100).toFixed(1)}% Filled`}
              tokenId={token.address.toString()}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6 px-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-indigo-400 text-black px-4 py-2 rounded hover:bg-indigo-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-indigo-400 text-black px-4 py-2 rounded hover:bg-indigo-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="text-center mt-6">
          <Link href="/explore" className="inline-block border border-indigo-400 text-indigo-400 px-4 py-2 rounded hover:bg-indigo-400 hover:text-black transition-colors">
            Explore More Latest Tokens
          </Link>
        </div>
      </section>
      <section className="py-8">
        <h3 className="text-2xl font-bold text-center mb-6">Trending</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {topTrending.map((token, index) => (
            <Card
              key={index}
              imageSrc={token.image || "/images/placeholder.png"}
              title={token.name}
              description={`${token.price.toFixed(2)} ETH | ${(token.totalSupply / token.maxSupply * 100).toFixed(1)}% Filled`}
              tokenId={token.address.toString()}
            />
          ))}
        </div>
      </section>
    </main>
  );
}