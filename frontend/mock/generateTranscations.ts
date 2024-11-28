import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import tokens from './tokens.json';
import { faker } from '@faker-js/faker';
import fs from 'fs';

type Transfer = {

    from: string;
    to: string;
    value: string;
    timestamp_: string;
};

type Data = {
    transfers: Transfer[];
};

function generateTokenMetadataDeposit(): Transfer {
    const account = privateKeyToAccount(generatePrivateKey());
    const pastDate = faker.date.past();
    const unixTimestamp = Math.floor(pastDate.getTime() / 1000);
    return {
        from: account.address,
        to: tokens[faker.number.int({ min: 0, max: tokens.length - 1 })].contractAddress,
        value: faker.number.bigInt({ min: 1e18, max: 10000e18 }).toString(),
        timestamp_: unixTimestamp.toString(),
    };
}

function generateAndWriteTokensDeposit(count: number, outputPath: string): void {
    const tokens: Transfer[] = Array.from({ length: count }, () => generateTokenMetadataDeposit());
    const data: Data = {
        transfers: tokens
    };
    const jsonContent = JSON.stringify({ data }, null, 2);

    fs.writeFileSync(outputPath, jsonContent);
    console.log(`Generated ${count} transfers and wrote to ${outputPath}`);
}

// Usage example:
generateAndWriteTokensDeposit(1e3, './transfersDeposit.json');

function generateTokenMetadataWithdraw(): Transfer {
    const account = privateKeyToAccount(generatePrivateKey());
    const pastDate = faker.date.past();
    const unixTimestamp = Math.floor(pastDate.getTime() / 1000);
    return {
        from: tokens[faker.number.int({ min: 0, max: tokens.length - 1 })].contractAddress,
        to: account.address,
        value: faker.number.bigInt({ min: 1e18, max: 10000e18 }).toString(),
        timestamp_: unixTimestamp.toString(),
    };
}

function generateAndWriteTokensWithdraw(count: number, outputPath: string): void {
    const tokens: Transfer[] = Array.from({ length: count }, () => generateTokenMetadataWithdraw());
    const data: Data = {
        transfers: tokens
    };
    const jsonContent = JSON.stringify({ data }, null, 2);

    fs.writeFileSync(outputPath, jsonContent);
    console.log(`Generated ${count} transfers and wrote to ${outputPath}`);
}

// Usage example:
generateAndWriteTokensWithdraw(1e3, './transfersWithdraw.json');