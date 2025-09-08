import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Contract deployment and initialization",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        
        // Check initial state
        let block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'get-mining-stats', [], deployer.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.receipts[0].result.expectOk(), true);
        
        const stats = block.receipts[0].result.expectOk().expectTuple();
        assertEquals(stats['total-miners'], types.uint(0));
        assertEquals(stats['mining-active'], types.bool(false));
    },
});

Clarinet.test({
    name: "Device registration works correctly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const user1 = accounts.get('wallet_1')!;
        
        // Register a mobile device
        let block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'register-device', [
                types.ascii("mobile"),
                types.ascii("iphone-15-pro"),
                types.ascii("bc1fake123456")
            ], user1.address)
        ]);
        
        assertEquals(block.receipts.length, 1);
        assertEquals(block.receipts[0].result.expectOk(), types.bool(true));
        
        // Check registration fee was charged
        assertEquals(block.receipts[0].events.length, 1);
        assertEquals(block.receipts[0].events[0].type, "stx_transfer_event");
        
        // Verify miner info
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'get-miner-info', [
                types.principal(user1.address)
            ], deployer.address)
        ]);
        
        const minerInfo = block.receipts[0].result.expectOk().expectSome().expectTuple();
        assertEquals(minerInfo['device-type'], types.ascii("mobile"));
        assertEquals(minerInfo['device-id'], types.ascii("iphone-15-pro"));
        assertEquals(minerInfo['total-btc-committed'], types.uint(0));
        assertEquals(minerInfo['stx-earned'], types.uint(0));
    },
});

Clarinet.test({
    name: "Mining round lifecycle works correctly",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const user1 = accounts.get('wallet_1')!;
        const user2 = accounts.get('wallet_2')!;
        
        // Register two miners
        let block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'register-device', [
                types.ascii("mobile"),
                types.ascii("iphone-15"),
                types.ascii("bc1fake123")
            ], user1.address),
            Tx.contractCall('depin-mining', 'register-device', [
                types.ascii("raspberry-pi"), 
                types.ascii("pi-model-4b"),
                types.ascii("bc1fake456")
            ], user2.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), types.bool(true));
        assertEquals(block.receipts[1].result.expectOk(), types.bool(true));
        
        // Start mining round (admin only)
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'start-block-mining', [], deployer.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), true);
        
        // Users commit BTC
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'commit-btc', [
                types.uint(5000000) // 0.05 BTC
            ], user1.address),
            Tx.contractCall('depin-mining', 'commit-btc', [
                types.uint(10000000) // 0.1 BTC  
            ], user2.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), types.bool(true));
        assertEquals(block.receipts[1].result.expectOk(), types.bool(true));
        
        // Mine 5 more blocks to meet minimum finalization time
        chain.mineEmptyBlockUntil(block.height + 5);
        
        // Finalize round (admin only)
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'finalize-block-winner', [], deployer.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), true);
        
        // Check that STX reward was distributed
        assertEquals(block.receipts[0].events.length, 1);
        assertEquals(block.receipts[0].events[0].type, "stx_transfer_event");
        
        // Verify mining stats updated
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'get-mining-stats', [], deployer.address)
        ]);
        
        const stats = block.receipts[0].result.expectOk().expectTuple();
        assertEquals(stats['total-miners'], types.uint(2));
        assertEquals(stats['mining-active'], types.bool(false)); // Round ended
        assertEquals(stats['total-mining-rounds'], types.uint(1));
    },
});

Clarinet.test({
    name: "Anti-spam protection works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const user1 = accounts.get('wallet_1')!;
        
        // Register device
        let block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'register-device', [
                types.ascii("mobile"),
                types.ascii("test-device"),
                types.ascii("bc1fake123")
            ], user1.address)
        ]);
        
        // Try to register again - should fail
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'register-device', [
                types.ascii("esp32"),
                types.ascii("different-device"),
                types.ascii("bc1fake456")
            ], user1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(101)); // ERR-ALREADY-REGISTERED
    },
});

Clarinet.test({
    name: "BTC commitment validation works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const user1 = accounts.get('wallet_1')!;
        
        // Register device and start mining
        let block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'register-device', [
                types.ascii("mobile"),
                types.ascii("test-device"),
                types.ascii("bc1fake123")
            ], user1.address),
            Tx.contractCall('depin-mining', 'start-block-mining', [], deployer.address)
        ]);
        
        // Try commitment too low
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'commit-btc', [
                types.uint(500000) // 0.005 BTC - below minimum
            ], user1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(106)); // ERR-COMMITMENT-TOO-LOW
        
        // Try commitment too high
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'commit-btc', [
                types.uint(200000000) // 2 BTC - above maximum
            ], user1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(107)); // ERR-COMMITMENT-TOO-HIGH
        
        // Valid commitment should work
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'commit-btc', [
                types.uint(1000000) // 0.01 BTC - valid
            ], user1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectOk(), types.bool(true));
    },
});

Clarinet.test({
    name: "Admin-only functions are protected",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const user1 = accounts.get('wallet_1')!;
        
        // Non-admin tries to start mining
        let block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'start-block-mining', [], user1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(100)); // ERR-NOT-AUTHORIZED
        
        // Non-admin tries to finalize
        block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'finalize-block-winner', [], user1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(100)); // ERR-NOT-AUTHORIZED
    },
});

Clarinet.test({
    name: "Device type validation works",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const user1 = accounts.get('wallet_1')!;
        
        // Try invalid device type
        let block = chain.mineBlock([
            Tx.contractCall('depin-mining', 'register-device', [
                types.ascii("invalid-device"),
                types.ascii("test-device"),
                types.ascii("bc1fake123")
            ], user1.address)
        ]);
        
        assertEquals(block.receipts[0].result.expectErr(), types.uint(110)); // ERR-INVALID-DEVICE-TYPE
        
        // Valid device types should work
        const validTypes = ["mobile", "raspberry-pi", "esp32"];
        
        for (let i = 0; i < validTypes.length; i++) {
            const user = accounts.get(`wallet_${i + 1}`)!;
            block = chain.mineBlock([
                Tx.contractCall('depin-mining', 'register-device', [
                    types.ascii(validTypes[i]),
                    types.ascii(`test-device-${i}`),
                    types.ascii(`bc1fake${i}`)
                ], user.address)
            ]);
            
            assertEquals(block.receipts[0].result.expectOk(), types.bool(true));
        }
    },
});