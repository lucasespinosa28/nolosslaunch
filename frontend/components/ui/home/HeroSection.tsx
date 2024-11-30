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
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
              title="Safe Investments"
              description="Get refunds if projects don't meet expectations"
            />
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
              title="Passive Income"
              description="Creators earn yield from USDe investments"
            />
            <FeatureItem
              icon={<svg className="w-6 h-6 text-indigo-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
              title="Transparent Process"
              description="Benefit from a safer launch ecosystem"
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