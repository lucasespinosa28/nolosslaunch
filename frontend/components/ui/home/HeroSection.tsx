import Link from 'next/link';
import { FeatureItem } from './FeatureItem';

export default function HeroSection() {
  return (
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
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>}
              title="Token Creation"
              description="Creators launch new tokens through our platform"
            />
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
              title="Token Purchase"
              description="Users buy tokens using USDe stablecoin"
            />
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>}
              title="USDe Deposit"
              description="USDe is deposited into a smart contract"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left mt-6">
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
              title="Yield Generation"
              description="Deposited USDe generates yield over time"
            />
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>}
              title="Creator Rewards"
              description="Creators claim rewards from generated yield"
            />
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path></svg>}
              title="User Refunds"
              description="Users can refund tokens for original USDe"
            />
          </div>
        </div>
        <Link href="/create" className="inline-block bg-yellow-400 text-indigo-900 font-bold text-lg py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300 transform hover:scale-105">
          Create Your Token
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  );
}