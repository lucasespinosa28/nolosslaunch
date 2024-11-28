import React from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { formatEther } from 'viem'

type Transfer = {
    from: string;
    to: string;
    value: string;
    timestamp_: string;
    type: 'deposit' | 'withdraw';
};

const columnHelper = createColumnHelper<Transfer>()

const columns = [
    columnHelper.accessor('type', {
        cell: info => (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${info.getValue() === 'deposit' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {info.getValue()}
            </span>
        ),
        header: () => <span>Type</span>,
    }),
    columnHelper.accessor('from', {
        cell: info => info.getValue(),
        header: () => <span>From</span>,
    }),
    columnHelper.accessor('to', {
        cell: info => info.getValue(),
        header: () => <span>To</span>,
    }),
    columnHelper.accessor('value', {
        cell: info => formatEther(BigInt(info.getValue())),
        header: () => <span>Amount</span>,
    }),
    columnHelper.accessor('timestamp_', {
        cell: info => new Date(parseInt(info.getValue()) * 1000).toLocaleString(),
        header: () => <span>Timestamp</span>,
    }),
]

interface TableTransfersProps {
    transfersDeposit: {
        data: {
            transfers: Transfer[];
        };
    };
    transfersWithdraw: {
        data: {
            transfers: Transfer[];
        };
    };
    contractAddress: string;
}

export default function TableTransfers({ transfersDeposit, transfersWithdraw, contractAddress }: TableTransfersProps) {
    const allTransfers = transfersDeposit.data.transfers.reduce((acc, transfer) => {
        if (transfer.to === contractAddress) {
            acc.push({ ...transfer, type: 'deposit' as const });
        }
        return acc;
    }, [] as Transfer[])
    .concat(
        transfersWithdraw.data.transfers.reduce((acc, transfer) => {
            if (transfer.from === contractAddress) {
                acc.push({ ...transfer, type: 'withdraw' as const });
            }
            return acc;
        }, [] as Transfer[])
    )
    .sort((a, b) => parseInt(b.timestamp_) - parseInt(a.timestamp_));
    const table = useReactTable({
        data: allTransfers.slice(0, 10),
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="shadow-lg rounded-lg overflow-hidden">
            <h3 className="text-xl font-bold p-4">Recent Transfers</h3>
            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="p-2 text-left">
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="p-2 border-t">
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