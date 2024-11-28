"use client"
import Link from 'next/link';
import Card from '@/components/Card';
import tokens from '@/mock/tokens.json';
import { useState } from 'react';

export default function Home() {
  const [newlyCreated] = useState(tokens.slice(0, 4));
  //totalSupply / maxSupply
  const [trending] = useState(tokens.slice(0, 7).sort((a, b) => b.totalSupply / b.maxSupply - a.totalSupply / a.maxSupply));
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
        <h3 className="text-2xl font-bold text-center mb-6">Newly created</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {newlyCreated.reverse().map((token) => (
            <Card
              key={token.contractAddress}
              address={token.contractAddress}
              name={token.tokenName}
              symbol={token.tokenSymbol}
              image={"/images/"+token.imageUrl}
              price={token.rate}
              totalSupply={token.totalSupply}
              maxSupply={token.maxSupply}
            />
          ))}
        </div>
      </section>
      <section className="py-8">
        <h3 className="text-2xl font-bold text-center mb-6">Trending</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {trending.map((token) => (
            <Card
              key={token.contractAddress}
              address={token.contractAddress}
              name={token.tokenName}
              symbol={token.tokenSymbol}
              image={"/images/"+token.imageUrl}
              price={token.rate}
              totalSupply={token.totalSupply}
              maxSupply={token.maxSupply}
            />
          ))}
          <Link href="/explore" className="block">
            <div className="border border-indigo-700 rounded-lg overflow-hidden hover:border-indigo-400 transition-colors aspect-square flex items-center justify-center">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Explore More</h4>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}