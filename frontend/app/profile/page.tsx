"use client"
import Card from "@/components/Card";
import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

const ethereumAddress = "0xf12a535ecdeb2f065f92e076cb5572e2e96644da";
const createdTokens = [
  { id: "1", imageSrc: "/images/placeholder.png", title: "NoLoss Alpha", description: "15.2 ETH | 76% Filled" },
  { id: "2", imageSrc: "/images/placeholder.png", title: "DeFi Dynamo", description: "8.5 ETH | 42% Filled" },
  { id: "3", imageSrc: "/images/placeholder.png", title: "Yield Yeti", description: "12.7 ETH | 63% Filled" },
  { id: "4", imageSrc: "/images/placeholder.png", title: "Crypto Cub", description: "3.9 ETH | 19% Filled" },
  { id: "5", imageSrc: "/images/placeholder.png", title: "BlockBoost", description: "7.1 ETH | 35% Filled" },
  { id: "6", imageSrc: "/images/placeholder.png", title: "TokenTiger", description: "10.3 ETH | 51% Filled" },
  { id: "7", imageSrc: "/images/placeholder.png", title: "ChainChamp", description: "6.8 ETH | 34% Filled" },
  { id: "8", imageSrc: "/images/placeholder.png", title: "EtherEagle", description: "14.5 ETH | 72% Filled" },
  { id: "9", imageSrc: "/images/placeholder.png", title: "ByteBull", description: "9.2 ETH | 46% Filled" },
  { id: "10", imageSrc: "/images/placeholder.png", title: "HashHero", description: "5.6 ETH | 28% Filled" },
  { id: "11", imageSrc: "/images/placeholder.png", title: "NoLoss Nova", description: "11.8 ETH | 59% Filled" },
  { id: "12", imageSrc: "/images/placeholder.png", title: "CryptoComet", description: "4.3 ETH | 21% Filled" },
  { id: "13", imageSrc: "/images/placeholder.png", title: "TokenTornado", description: "13.9 ETH | 69% Filled" },
  { id: "14", imageSrc: "/images/placeholder.png", title: "BlockBlitz", description: "8.7 ETH | 43% Filled" },
  { id: "15", imageSrc: "/images/placeholder.png", title: "EtherExpress", description: "6.4 ETH | 32% Filled" },
];
const tokenBalances = [
  { name: "Ethereum", balance: "2.5 ETH" },
  { name: "Bitcoin", balance: "0.15 BTC" },
  { name: "Cardano", balance: "500 ADA" },
  { name: "Polkadot", balance: "200 DOT" },
  { name: "Chainlink", balance: "75 LINK" },
  { name: "Uniswap", balance: "50 UNI" },
  { name: "Aave", balance: "10 AAVE" },
  { name: "Solana", balance: "100 SOL" },
  { name: "Avalanche", balance: "30 AVAX" },
  { name: "Polygon", balance: "1000 MATIC" },
  { name: "Cosmos", balance: "40 ATOM" },
  { name: "Algorand", balance: "500 ALGO" },
  { name: "Tezos", balance: "200 XTZ" },
  { name: "Stellar", balance: "1000 XLM" },
  { name: "VeChain", balance: "5000 VET" },
  { name: "NoLoss Alpha", balance: "1000 NLA" },
  { name: "DeFi Dynamo", balance: "250 DFD" },
  { name: "Yield Yeti", balance: "100 YETI" },
  { name: "Crypto Cub", balance: "500 CUB" },
  { name: "BlockBoost", balance: "750 BOOST" },
  { name: "TokenTiger", balance: "300 TIGER" },
  { name: "ChainChamp", balance: "150 CHAMP" },
  { name: "EtherEagle", balance: "80 EAGLE" },
  { name: "ByteBull", balance: "400 BULL" },
  { name: "HashHero", balance: "200 HERO" },
  { name: "NoLoss Nova", balance: "600 NOVA" },
  { name: "CryptoComet", balance: "350 COMET" },
  { name: "TokenTornado", balance: "120 TORN" },
  { name: "BlockBlitz", balance: "900 BLITZ" },
  { name: "EtherExpress", balance: "450 EXPRESS" }
];

type TokenBalance = {
  name: string
  balance: string
}

const columnHelper = createColumnHelper<TokenBalance>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => <div className="text-left">{info.getValue()}</div>,
    header: () => <></>,
  }),
  columnHelper.accessor('balance', {
    cell: info => <div className="text-right">{info.getValue()}</div>,
    header: () => <></>,
  }),
]
export default function Profile() {
  const [currentPage, setCurrentPage] = useState(1);
  const tokensPerPage = 3;
  const totalPages = Math.ceil(createdTokens.length / tokensPerPage);

  const [currentBalancePage, setCurrentBalancePage] = useState(0);
  const balancesPerPage = 10;

  const table = useReactTable({
    data: tokenBalances,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: balancesPerPage,
      },
    },
  })

  const totalBalancePages = table.getPageCount();

  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = createdTokens.slice(indexOfFirstToken, indexOfLastToken);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="flex items-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mr-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          <div>
            <h1 className="text-3xl font-bold mb-2">{ethereumAddress}</h1>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl font-bold mb-4 bg-gray-800 p-6 rounded-lg shadow-lg">Created Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentTokens.map((token) => (
            <Card
              key={token.id}
              imageSrc={token.imageSrc}
              title={token.title}
              description={token.description}
              tokenId={token.id}
            />
          ))}
        </div>
        {createdTokens.length > tokensPerPage && (
          <div className="flex justify-between items-center mt-4  mb-4 bg-gray-800 p-6 rounded-lg shadow-lg">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Token Balances</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
      <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-4 py-2 text-gray-300">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-gray-700 last:border-b-0">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalBalancePages > 1 && (
        <div className="flex justify-between items-center mt-4 mb-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {totalBalancePages}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
      <div className="mt-8 flex justify-end">
        <button className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-300">
          Disconnect
        </button>
      </div>
    </main>
  );
}
