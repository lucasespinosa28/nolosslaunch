import { faker } from '@faker-js/faker';
import fs from 'fs';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

type Metadata = {
    contractAddress: string;
    tokenName: string;
    tokenSymbol: string;
    maxSupply: number;
    totalSupply: number;
    rate: number;
    refundDate: number;
    imageUrl: string;
};


function generateTokenMetadata(id: number): Metadata {
    const name = faker.word.words(3);
    const generateSymbol = () => (name.split(' ').map(word => word[0]).join('').toUpperCase());
    const account = privateKeyToAccount(generatePrivateKey());
    const pastDate = faker.date.past();
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const launchTimestamp = Math.floor(lastWeek.getTime() / 1000);

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const refundTimestamp = Math.floor(nextWeek.getTime() / 1000);
    return {
        contractAddress: account.address,  // Generate a random Ethereum address
        tokenName: "Mock " + name,
        tokenSymbol: generateSymbol(),
        maxSupply: Math.floor(Math.random() * 1000000) + 100000,
        totalSupply: Math.floor(Math.random() * 100000),
        rate: faker.number.int({ min: 1, max: 100 }),
        refundDate: faker.number.int({ min: 0, max: 1 }) == 1? refundTimestamp:launchTimestamp,
        imageUrl: `placeholder${id + 1}.png`,
    };
}

function generateAndWriteTokens(count: number, outputPath: string): void {
    const tokens: Metadata[] = Array.from({ length: count }, (_, index) => generateTokenMetadata(index));

    const jsonContent = JSON.stringify(tokens, null, 2);

    fs.writeFileSync(outputPath, jsonContent);
    console.log(`Generated ${count} tokens and wrote to ${outputPath}`);
}

// Usage example:
generateAndWriteTokens(30, './tokens.json');