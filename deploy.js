const { 
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  createStacksPrivateKey,
  getAddressFromPrivateKey,
  TransactionVersion
} = require('@stacks/transactions');
const { StacksTestnet } = require('@stacks/network');
const fs = require('fs');

// Configuration
const network = new StacksTestnet();
const privateKey = "71b1ea78b6108da374cdc8a8b5ff60766e2918c1727e9b26ecb99067b22e662e01";
const stacksPrivateKey = createStacksPrivateKey(privateKey);
const senderAddress = getAddressFromPrivateKey(stacksPrivateKey.data, TransactionVersion.Testnet);

console.log(`Deploying from address: ${senderAddress}`);

async function deployContract() {
  try {
    // Read contract source
    const contractSource = fs.readFileSync('./mining-depin-contract/contracts/depin-mining.clar', 'utf8');
    
    // Create deployment transaction
    const txOptions = {
      contractName: 'depin-mining',
      codeBody: contractSource,
      senderKey: privateKey,
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractDeploy(txOptions);
    
    // Broadcast transaction
    const broadcastResponse = await broadcastTransaction(transaction, network);
    
    console.log('Deployment transaction:', broadcastResponse);
    console.log(`Contract will be deployed at: ${senderAddress}.depin-mining`);
    console.log(`View on explorer: https://explorer.hiro.so/txid/${broadcastResponse.txid}?chain=testnet`);
    
  } catch (error) {
    console.error('Deployment failed:', error);
  }
}

deployContract();