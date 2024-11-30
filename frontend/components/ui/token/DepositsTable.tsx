import React from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { formatEther } from 'viem';

interface Transfer {
  from: string;
  value: string;
  timestamp_: string;
  transactionHash_: string;
}

interface DepositsTableProps {
  transfers: Transfer[];
  symbol: string;
}

const columnHelper = createColumnHelper<Transfer>();

const columns = [
  columnHelper.accessor('from', {
    cell: info => info.getValue(),
    header: 'From',
  }),
  columnHelper.accessor('value', {
    cell: info => formatEther(BigInt(info.getValue())),
    header: 'Amount',
  }),
  columnHelper.accessor('timestamp_', {
    cell: info => new Date(parseInt(info.getValue()) * 1000).toLocaleString(),
    header: 'Date',
  }),
  columnHelper.accessor('transactionHash_', {
    cell: info => (
      <a href={`https://sepolia.etherscan.io/tx/${info.getValue()}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        View Transaction
      </a>
    ),
    header: 'Transaction',
  }),
];

export default function DepositsTable({ transfers, symbol }: DepositsTableProps) {
  const table = useReactTable({
    data: transfers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: { symbol },
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-6 py-3 border-b text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
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
            <tr key={row.id} className={row.index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-indigo-100">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}