import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

interface Transaction {
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    date: string;
    address: string; // Add this line to include the address field
  }

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const columnHelper = createColumnHelper<Transaction>();

const columns = [
    columnHelper.accessor('type', {
      header: 'Type',
      cell: (info) => {
        const type = info.getValue();
        const badgeColor = type === 'buy' ? 'bg-green-500' : 'bg-red-500';
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColor} text-white`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        );
      },
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.price * row.amount, {
      id: 'totalValue',
      header: 'Total Value (USDe)',
      cell: (info) => `$${info.getValue().toFixed(4)}`,
    }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: (info) => {
        const address = info.getValue();
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
      },
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => info.getValue(),
    }),
  ];

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left mb-4">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-800">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2">
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
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="mr-2">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <span>
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-16 ml-2 p-1 bg-gray-800 text-white rounded"
            />
          </span>
        </div>
        <div>
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;