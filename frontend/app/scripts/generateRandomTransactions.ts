import { writeFile } from "fs";

interface Transaction {
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    date: string;
    address: string; // Add this line to include the address field
  }

  function generateRandomTransactions(count: number): Transaction[] {
    const transactions: Transaction[] = [];
    const startDate = new Date('2023-01-01');
    const endDate = new Date();
    const price = +(Math.random() * 0.2 + 0.05).toFixed(4); // Generate a single price for all transactions

    function generateRandomEthereumAddress(): string {
        return '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    for (let i = 0; i < count; i++) {
        const type = Math.random() < 0.5 ? 'buy' : 'sell';
        const amount = Math.floor(Math.random() * 1000) + 1;
        const date = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        const address = generateRandomEthereumAddress();

        transactions.push({
            type,
            amount,
            price, // Use the same price for all transactions
            date: date.toISOString().split('T')[0],
            address,
        });
    }

    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function writeToFile(transactions: Transaction[], filename: string): Promise<void> {
    try {
        const data = JSON.stringify(transactions, null, 2);
        await new Promise<void>((resolve, reject) => {
            writeFile(filename, data, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        console.log(`Successfully wrote ${transactions.length} transactions to ${filename}`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

// Example usage
const transactionCount = 1000; // or any number you prefer
const transactions = generateRandomTransactions(transactionCount);
writeToFile(transactions, 'Transactions.json')
    .then(() => console.log('File writing process completed.'))
    .catch((error) => console.error('Error in file writing process:', error));