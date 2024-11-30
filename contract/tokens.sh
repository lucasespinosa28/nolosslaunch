#!/bin/bash
source .env

# Function to create a launchpad
create_launchpad() {
    local id=$1
    local tokenName="MyToken${id}"
    local tokenSymbol="MTK${id}"
    local imageUrl="/images/placeholder${id}.png"
    local countdownDays=1  # Random number between 1 and 30
    local rate=$((RANDOM % 100 + 1))  # Random number between 1 and 100
    local maxSupply=1000000
    local salt="0x$(openssl rand -hex 32)"  # Generate a random salt for each call

    echo "Creating Launchpad ${id}..."
    echo "Token Name: $tokenName"
    echo "Token Symbol: $tokenSymbol"
    echo "Image URL: $imageUrl"
    echo "Countdown Days: $countdownDays"
    echo "Rate: $rate"
    echo "Max Supply: $maxSupply"
    cast send 0xbF6446dDE4c1b0DA1Cb6F7073f1a55630D072082 "function createToken(string,string,string,uint256,uint16,uint256,bytes32)" "$tokenName" "$tokenSymbol" "$imageUrl" "$countdownDays" "$rate" "$maxSupply" "$salt" --rpc-url $LOCAL_HOST --private-key $PRIVATE_KEY
    echo "Launchpad ${id} created."
    echo "-----------------------------"
}

# Call create_launchpad function 30 times
for i in {1..30}
do
    create_launchpad $i
    sleep 2  # Add a 2-second delay between calls to avoid rate limiting
done

echo "All 30 launchpads have been created."