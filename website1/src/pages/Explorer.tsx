import React, { useState, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import tokensData from '../data/tokens.json';

type Token = {
  id: string;
  name: string;
  symbol: string;
  totalSupply: number;
  maxSupply: number;
  refundDate: string;
  address: string;
  price: number;
};

const columnHelper = createColumnHelper<Token>();

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: () => 'Name',
  }),
  columnHelper.accessor('symbol', {
    cell: info => info.getValue(),
    header: () => 'Symbol',
  }),
  columnHelper.accessor('address', {
    cell: info => info.getValue(),
    header: () => 'Address',
  }),
  columnHelper.accessor('price', {
    cell: info => `$${info.getValue().toFixed(2)}`,
    header: () => 'Price',
    sortingFn: 'basic',
  }),
  columnHelper.accessor('totalSupply', {
    cell: info => info.getValue().toLocaleString(),
    header: () => 'Total Supply',
    sortingFn: 'basic',
  }),
  columnHelper.accessor(
    row => (row.price * row.totalSupply),
    {
      id: 'marketCap',
      cell: info => `$${info.getValue().toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      header: () => 'Market Cap',
      sortingFn: 'basic',
    }
  ),
  columnHelper.accessor('refundDate', {
    cell: info => new Date(info.getValue()).toLocaleDateString(),
    header: () => 'Refund Date',
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId));
      const dateB = new Date(rowB.getValue(columnId));
      return dateA.getTime() - dateB.getTime();
    },
  }),
];

const Explorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ // Add pagination state
    pageIndex: 0,
    pageSize: 10,
  });

  const filteredData = useMemo(() => {
    return tokensData.filter((token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Add this line
    onSortingChange: setSorting,
    onPaginationChange: setPagination, // Add this line
    state: {
      sorting,
      pagination, // Add this line
    },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Token Explorer</h1>
      <p className="mb-4">Discover and explore various NoLossTokens here.</p>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 pr-10 border border-gray-300 rounded-md w-full"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="py-2 px-4 border-b border-gray-300 font-semibold text-left cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : (
                        <div className="flex items-center">
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          <span className="w-4 inline-block text-center">
                            {{
                              asc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                              </svg>
                              ,
                              desc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                              </svg>
                              ,
                            }[header.column.getIsSorted() as string] ?? ''}
                          </span>
                        </div>
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-2 px-4 border-b border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="mr-2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <span>
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="w-16 ml-2 px-2 py-1 border rounded"
            />
          </span>
        </div>
        <div>
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explorer;