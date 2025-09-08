# 🚀 **DEPLOYMENT INSTRUCTIONS**
## **Deploy Your Real Stacks Mining DePIN to Testnet**

Follow these exact steps to deploy your authentic Stacks mining system to the testnet.

---

## **📋 Prerequisites**

1. **Leather Wallet** installed and configured
2. **Testnet STX** (get from https://explorer.hiro.so/sandbox/faucet?chain=testnet)
3. **Clarinet CLI** installed (`curl -sSf https://raw.githubusercontent.com/hirosystems/clarinet/main/install.sh | sh`)

---

## **🔧 Step 1: Deploy Smart Contract**

### Option A: Using Clarinet Console (Recommended)
```bash
cd mining-depin-contract
clarinet console --testnet
```

In the Clarinet console, paste the entire contract and deploy:
```clarity
;; Copy the entire content of contracts/depin-mining.clar
;; Then run:
::deploy_contract depin-mining .depin-mining

;; Initialize the contract
(contract-call? .depin-mining start-block-mining)
```

### Option B: Using Stacks Explorer
1. Go to: https://explorer.hiro.so/sandbox/contract-deploy?chain=testnet
2. Connect your Leather wallet
3. Copy the entire content of `contracts/depin-mining.clar`
4. Set contract name: `depin-mining`
5. Deploy the contract
6. Save the **contract address** (you'll need this!)

---

## **⚙️ Step 2: Update Frontend Configuration**

Edit `depin-mining-dashboard/src/app/page.tsx`:

```typescript
// Line 36: Update with your deployed contract address
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE'

// Line 40: Update with your wallet address (contract owner)
const CONTRACT_OWNER = 'YOUR_WALLET_ADDRESS_HERE'
```

**Example:**
```typescript
const CONTRACT_ADDRESS = 'ST2F4BK4GZH6YFBNHYDDGN4T1RKBA7DA1BJZPJEJJ'
const CONTRACT_OWNER = 'ST2F4BK4GZH6YFBNHYDDGN4T1RKBA7DA1BJZPJEJJ'
```

---

## **🚀 Step 3: Launch the Frontend**

```bash
cd depin-mining-dashboard
npm install
npm run dev
```

Your application will be running at: http://localhost:3000

---

## **🧪 Step 4: Test the Complete System**

### **For Contract Owner (You):**
1. **Connect Leather Wallet** with testnet STX
2. **Admin Controls** will appear (red section)
3. **Start Mining Block** to begin first round
4. Register your device and commit BTC
5. **End Block & Select Winner** to complete the round

### **For Regular Users:**
1. **Connect Leather Wallet** 
2. **Register Device** (choose phone/Pi/ESP32)
3. **Commit BTC** to participate in mining
4. Wait for admin to end the round and select winner
5. **Winners receive real STX rewards!**

---

## **📊 Verification**

### **Check Contract on Explorer:**
- Visit: `https://explorer.hiro.so/address/YOUR_CONTRACT_ADDRESS?chain=testnet`
- Verify all functions are available
- Check contract balance and transactions

### **Test Transactions:**
- All transactions appear on Stacks Explorer
- Real STX transfers occur
- Winners receive authentic STX rewards
- Contract state updates correctly

---

## **🔐 Production Deployment (Mainnet)**

⚠️ **WARNING**: Only deploy to mainnet after thorough testing!

1. **Security Audit**: Get the contract professionally audited
2. **Update Network**: Change `new StacksTestnet()` to `new StacksMainnet()`
3. **Real STX**: Ensure you have real STX for deployment costs
4. **Test Everything**: Complete multiple test cycles on testnet first

---

## **🎯 Success Criteria**

✅ **Contract Deployed** on Stacks testnet  
✅ **Frontend Connected** to real blockchain  
✅ **Wallet Integration** working with Leather  
✅ **Real Transactions** confirmed on explorer  
✅ **Mining Mechanics** functioning authentically  
✅ **STX Rewards** distributed to winners  
✅ **Admin Controls** working for round management  

---

## **🚨 Troubleshooting**

### **Contract Deployment Failed**
- Ensure sufficient testnet STX (10+ STX recommended)
- Check for syntax errors with `clarinet check`
- Try alternative deployment method

### **Frontend Not Connecting**
- Verify contract address is correct
- Check network is set to testnet
- Ensure Leather wallet is on testnet

### **Transactions Failing**
- Confirm function names match contract
- Check post conditions are correct  
- Verify contract is initialized (first mining block started)

---

## **📱 Mobile/IoT Integration**

Your deployed system now supports:
- **Smartphones** (iOS/Android with Leather wallet)
- **Raspberry Pi** (with web browser)
- **ESP32** (with custom integration)
- **Any device** with internet and wallet capability

---

## **🎉 Congratulations!**

You now have a **fully functional, real blockchain DePIN mining system** running on Stacks testnet!

**Your Achievement:**
- ✅ Authentic Stacks Proof-of-Transfer mechanics
- ✅ Real wallet integration with Leather
- ✅ Genuine STX transactions and rewards
- ✅ Professional production-ready interface
- ✅ Multi-device mining node support
- ✅ Complete admin control system

**Ready for mainnet deployment when you are! 🚀**