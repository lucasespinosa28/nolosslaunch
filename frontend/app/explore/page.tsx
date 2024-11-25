"use client"
import React from 'react';
import Image from 'next/image';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import tokens from "../../data/tokens.json";
import Link from 'next/link';

type Token = {
  image: string;
  name: string;
  symbol: string;
  price: number;
  maxSupply: number;
  totalSupply: number;
  marketCap: number;
  address: string;
};

const data: Token[] = tokens.map(token => ({
  image: token.image,
  name: token.name,
  symbol: token.symbol,
  price: token.price,
  maxSupply: token.maxSupply,
  totalSupply: token.totalSupply,
  marketCap: token.totalSupply * token.price,
  address: token.address,

}));

const columnHelper = createColumnHelper<Token>();

const columns = [
  columnHelper.accessor('image', {
    cell: info => (
      <Image
        src={info.getValue()}
        alt={`${info.row.original.name} logo`}
        width={64}
        height={64}
        className="rounded-full"
      />
    ),
    header: '',
  }),
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: 'Name',
    filterFn: 'includesString',
  }),
  columnHelper.accessor('symbol', {
    cell: info => info.getValue(),
    header: 'Symbol',
    filterFn: 'includesString',
  }),
  columnHelper.accessor('price', {
    cell: info => `$${info.getValue().toFixed(2)}`,
    header: 'Price',
    sortingFn: 'basic',
  }),
  columnHelper.accessor('maxSupply', {
    cell: info => info.getValue().toLocaleString(),
    header: 'Max Supply',
    sortingFn: 'basic',
  }),
  columnHelper.accessor('marketCap', {
    cell: info => `$${info.getValue().toLocaleString()}`,
    header: 'Market Cap',
    sortingFn: 'basic',
  }),

];

export default function Explore() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });
  // Add this function to handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Explore Tokens</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={globalFilter ?? ''}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                          </svg>
                          ,
                          desc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                          </svg>
                          ,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4">
                    <Link href={`/token/${row.original.address}`} className="block">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
        </div>
        <div>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-l hover:bg-blue-600 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-r hover:bg-blue-600 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}