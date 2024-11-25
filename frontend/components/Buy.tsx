import React, { useState } from 'react';

interface BuyProps {
    price: number;
    id: string;
    symbol: string;
}

const Buy: React.FC<BuyProps> = ({ price, id,symbol }) => {
    const [amount, setAmount] = useState<string>('');
    const [totalCost, setTotalCost] = useState<number>(0);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        setTotalCost(Number(newAmount) * price);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Implement buy logic here
        console.log(`Buying ${amount} tokens of id ${id} for a total of ${totalCost.toFixed(2)} USDe`);
        // Reset form after submission
        setAmount('');
        setTotalCost(0);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-white">Buy Tokens</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                    <label htmlFor="amount" className="text-sm font-medium text-gray-300 whitespace-nowrap">
                        Amount of tokens
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="flex-grow mt-1 block rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter amount"
                        min="1"
                        step="1"
                        required
                    />
                    <span className="text-sm font-medium text-gray-300">{symbol}</span>
                </div>
                <div className="text-white">
                    <p>Price per token: {price.toFixed(2)} USDe</p>
                    <p>Total cost: {totalCost.toFixed(2)} USDe</p>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Buy Now
                </button>
            </form>
        </div>
    );
};

export default Buy;