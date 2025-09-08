import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

describe("DePIN Mining Contract Tests", () => {
  const accounts = simnet.getAccounts();
  const deployer = accounts.get("deployer")!;
  const wallet1 = accounts.get("wallet_1")!;
  const wallet2 = accounts.get("wallet_2")!;
  const wallet3 = accounts.get("wallet_3")!;

  it("Contract deployment and initialization", () => {
    // Check initial state
    const { result } = simnet.callReadOnlyFn("depin-mining", "get-mining-stats", [], deployer);
    
    // Function returns tuple directly
    expect(result).toBeTuple();
    const stats = result.expectTuple();
    expect(stats['total-miners']).toBeUint(0);
    expect(stats['mining-active']).toBeBool(false);
  });

  it("Device registration works correctly", () => {
    // Register a mobile device
    const { result } = simnet.callPublicFn("depin-mining", "register-device", [
      Cl.stringAscii("mobile"),
      Cl.stringAscii("iphone-15-pro"),
      Cl.stringAscii("bc1fake123456")
    ], wallet1);
    
    expect(result).toBeOk();
    expect(result.expectOk()).toBeBool(true);
    
    // Check registration fee was charged (STX transfer event should occur)
    const events = result.events;
    expect(events.length).toBeGreaterThan(0);
    expect(events.some((e: any) => e.event === "stx_transfer_event")).toBe(true);
    
    // Verify miner info
    const minerInfoResult = simnet.callReadOnlyFn("depin-mining", "get-miner-info", [
      Cl.principal(wallet1)
    ], deployer);
    
    const minerInfo = minerInfoResult.result.expectOk().expectSome().expectTuple();
    expect(minerInfo['device-type']).toBeAscii("mobile");
    expect(minerInfo['device-id']).toBeAscii("iphone-15-pro");
    expect(minerInfo['total-btc-committed']).toBeUint(0);
    expect(minerInfo['stx-earned']).toBeUint(0);
  });

  it("Mining round lifecycle works correctly", () => {
    // Register two miners
    simnet.callPublicFn("depin-mining", "register-device", [
      Cl.stringAscii("mobile"),
      Cl.stringAscii("iphone-15"),
      Cl.stringAscii("bc1fake123")
    ], wallet1);
    
    simnet.callPublicFn("depin-mining", "register-device", [
      Cl.stringAscii("raspberry-pi"),
      Cl.stringAscii("pi-model-4b"),
      Cl.stringAscii("bc1fake456")
    ], wallet2);
    
    // Start mining round (admin only)
    const startResult = simnet.callPublicFn("depin-mining", "start-block-mining", [], deployer);
    expect(startResult.result).toBeOk();
    
    // Users commit BTC
    const commit1 = simnet.callPublicFn("depin-mining", "commit-btc", [
      Cl.uint(5000000) // 0.05 BTC
    ], wallet1);
    expect(commit1.result).toBeOk();
    
    const commit2 = simnet.callPublicFn("depin-mining", "commit-btc", [
      Cl.uint(10000000) // 0.1 BTC
    ], wallet2);
    expect(commit2.result).toBeOk();
    
    // Mine some blocks to meet minimum finalization time
    simnet.mineEmptyBlocks(5);
    
    // Finalize round (admin only)
    const finalizeResult = simnet.callPublicFn("depin-mining", "finalize-block-winner", [], deployer);
    expect(finalizeResult.result).toBeOk();
    
    // Check that STX reward was distributed (should have transfer event)
    expect(finalizeResult.result.events.some((e: any) => e.event === "stx_transfer_event")).toBe(true);
    
    // Verify mining stats updated
    const statsResult = simnet.callReadOnlyFn("depin-mining", "get-mining-stats", [], deployer);
    const stats = statsResult.result.expectTuple();
    expect(stats['total-miners']).toBeUint(2);
    expect(stats['mining-active']).toBeBool(false); // Round ended
    expect(stats['total-mining-rounds']).toBeUint(1);
  });

  it("Anti-spam protection works", () => {
    // Register device
    simnet.callPublicFn("depin-mining", "register-device", [
      Cl.stringAscii("mobile"),
      Cl.stringAscii("test-device"),
      Cl.stringAscii("bc1fake123")
    ], wallet1);
    
    // Try to register again - should fail
    const { result } = simnet.callPublicFn("depin-mining", "register-device", [
      Cl.stringAscii("esp32"),
      Cl.stringAscii("different-device"),
      Cl.stringAscii("bc1fake456")
    ], wallet1);
    
    expect(result).toBeErr();
    expect(result.expectErr()).toBeUint(101); // ERR-ALREADY-REGISTERED
  });

  it("BTC commitment validation works", () => {
    // Register device and start mining
    simnet.callPublicFn("depin-mining", "register-device", [
      Cl.stringAscii("mobile"),
      Cl.stringAscii("test-device"),
      Cl.stringAscii("bc1fake123")
    ], wallet1);
    
    simnet.callPublicFn("depin-mining", "start-block-mining", [], deployer);
    
    // Try commitment too low
    const lowCommit = simnet.callPublicFn("depin-mining", "commit-btc", [
      Cl.uint(500000) // 0.005 BTC - below minimum
    ], wallet1);
    
    expect(lowCommit.result).toBeErr();
    expect(lowCommit.result.expectErr()).toBeUint(106); // ERR-COMMITMENT-TOO-LOW
    
    // Try commitment too high
    const highCommit = simnet.callPublicFn("depin-mining", "commit-btc", [
      Cl.uint(200000000) // 2 BTC - above maximum
    ], wallet1);
    
    expect(highCommit.result).toBeErr();
    expect(highCommit.result.expectErr()).toBeUint(107); // ERR-COMMITMENT-TOO-HIGH
    
    // Valid commitment should work
    const validCommit = simnet.callPublicFn("depin-mining", "commit-btc", [
      Cl.uint(1000000) // 0.01 BTC - valid
    ], wallet1);
    
    expect(validCommit.result).toBeOk();
  });

  it("Admin-only functions are protected", () => {
    // Non-admin tries to start mining
    const startResult = simnet.callPublicFn("depin-mining", "start-block-mining", [], wallet1);
    expect(startResult.result).toBeErr();
    expect(startResult.result.expectErr()).toBeUint(100); // ERR-NOT-AUTHORIZED
    
    // Non-admin tries to finalize
    const finalizeResult = simnet.callPublicFn("depin-mining", "finalize-block-winner", [], wallet1);
    expect(finalizeResult.result).toBeErr();
    expect(finalizeResult.result.expectErr()).toBeUint(100); // ERR-NOT-AUTHORIZED
  });

  it("Device type validation works", () => {
    // Try invalid device type
    const invalidResult = simnet.callPublicFn("depin-mining", "register-device", [
      Cl.stringAscii("invalid-device"),
      Cl.stringAscii("test-device"),
      Cl.stringAscii("bc1fake123")
    ], wallet1);
    
    expect(invalidResult.result).toBeErr();
    expect(invalidResult.result.expectErr()).toBeUint(110); // ERR-INVALID-DEVICE-TYPE
    
    // Valid device types should work
    const validTypes = ["mobile", "raspberry-pi", "esp32"];
    const wallets = [wallet1, wallet2, wallet3];
    
    for (let i = 0; i < validTypes.length; i++) {
      const result = simnet.callPublicFn("depin-mining", "register-device", [
        Cl.stringAscii(validTypes[i]),
        Cl.stringAscii(`test-device-${i}`),
        Cl.stringAscii(`bc1fake${i}`)
      ], wallets[i]);
      
      expect(result.result).toBeOk();
      expect(result.result.expectOk()).toBeBool(true);
    }
  });
});