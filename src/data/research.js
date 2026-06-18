export const pocData = [
  // ── REAL AUDITS (anonymized) ────────────────────────────────────────────────
  {
    id: 1,
    title: "Unbounded Repayment Loop → Liquidation Callback DoS",
    target: "Private Loan Router Protocol — Arbitrum (May 2026)",
    severity: "high",
    status: "Confirmed",
    badge: "REAL AUDIT",
    description:
      "validateLoanTerms() accepted any duration/repaymentInterval ratio without capping the number of intervals. A valid loan with duration=20,000,000 and interval=1 produced ~20M iterations. During liquidation, both interest rate models looped over all pending intervals, exhausting the Arbitrum gas budget inside onCollateralLiquidated(). The loan became permanently stuck in Liquidated state with no admin recovery path.",
    tags: ["DoS", "Gas Exhaustion", "Liquidation", "Foundry", "Arbitrum"],
    terminal: [
      { type: "prompt", text: "$ " },
      { type: "cmd",    text: "forge test --match-path test/loanRouter/LiquidationIntervalDoS.poc.t.sol -vvv" },
      { type: "comment",text: "// duration=20_000_000  repaymentInterval=1  → ~20M loop iters" },
      { type: "output", text: "Ran 2 tests for LiquidationIntervalDoSPoC" },
      { type: "output", text: "[PASS] test_PoC_SimpleModel_LiquidationCallbackOOG()     (gas: 30907388)" },
      { type: "output", text: "[PASS] test_PoC_AmortizedModel_LiquidationCallbackOOG()  (gas: 30326838)" },
      { type: "warn",   text: "Suite result: ok. 2 passed; 0 failed; 0 skipped" },
      { type: "error",  text: "[HIGH] Loan stuck in Liquidated — balance non-zero — no recovery path" },
    ],
  },
  {
    id: 2,
    title: "Bad Debt Socialized Before Repayment — Lenders Over-Slashed & Funds Orphaned",
    target: "Private Lending Market Protocol — EVM (June 2026)",
    severity: "high",
    status: "Confirmed",
    badge: "REAL AUDIT",
    description:
      "liquidate() froze gross debt at entry and socialized the full badDebt onto totalUnits before the liquidator's repaidUnits were applied. This caused lenders to absorb a fictitious loss equal to the repayment amount. The liquidator's tokens entered the vault (withdrawable += repaidUnits) but no credit units remained to claim them — capital permanently orphaned. withdraw() reverted with arithmetic underflow when lenders attempted to recover their reduced credit.",
    tags: ["Accounting Bug", "Bad Debt", "Permanent Lock", "Invariant Violation", "Foundry"],
    terminal: [
      { type: "prompt", text: "$ " },
      { type: "cmd",    text: "forge test --match-test test_PoCBadDebtOverestimation_LendersOvercharged -vvv" },
      { type: "comment",text: "// DEBT=1_000_000e18  badDebt_gross=387_987e18  repaid=273_188e18" },
      { type: "output", text: "[POST] totalUnits after  (with bug)        : 612_013" },
      { type: "output", text: "[POST] totalUnits after  (correct, no bug)  : 885_201" },
      { type: "error",  text: "[BUG]  Lenders overcharged by               : 273_188 units" },
      { type: "warn",   text: "[POST] Lender credit locked (withdraw reverts): 273_188 tokens orphaned" },
      { type: "output", text: "[PASS] test_PoCBadDebtOverestimation_LendersOvercharged() — BUG CONFIRMED" },
    ],
  },
  {
    id: 3,
    title: "Transient Storage Flaw in take() Bypasses isHealthy() via wasLocked",
    target: "Private Lending Market Protocol — EVM (June 2026)",
    severity: "medium",
    status: "Confirmed",
    badge: "REAL AUDIT",
    description:
      "take() sets LIQUIDATION_LOCK_SLOT = true before invoking seller callbacks. A nested take() triggered from onSell() observes wasLocked=true, skips the lock reset at L.475, then passes L.476 via liquidationLocked()==true — entirely bypassing the isHealthy() solvency check. An insolvent seller accumulates additional debt inside the nested frame without reverting. The outer call's atomic revert prevents fund loss, but the internal solvency bypass is confirmed and reproducible.",
    tags: ["Transient Storage", "EIP-1153", "Re-entrancy", "Solvency Bypass", "Foundry"],
    terminal: [
      { type: "prompt", text: "$ " },
      { type: "cmd",    text: "forge test --match-test test_PoC_WasLockedBypassesIsHealthy -vvv" },
      { type: "comment",text: "// AttackerSeller.onSell() re-enters take() → wasLocked=true → isHealthy() skipped" },
      { type: "output", text: "vm.expectEmit: Take event emitted inside nested frame on insolvent seller ✓" },
      { type: "warn",   text: "CONTROL: direct take on same insolvent seller → SellerIsLiquidatable() revert ✓" },
      { type: "output", text: "[PASS] test_PoC_WasLockedBypassesIsHealthy()" },
      { type: "error",  text: "[MEDIUM] isHealthy() bypassed inside nested call — solvency check non-existent" },
    ],
  },
  // ── ADDITIONAL RESEARCH ────────────────────────────────────────────────────
  {
    id: 4,
    title: "Flash Loan Oracle Price Manipulation",
    target: "DeFi Lending Protocol — AMM Fork",
    severity: "critical",
    status: "PoC Confirmed",
    badge: null,
    description:
      "Spot price oracle relied on single-block reserve snapshot. Flash loan inflated reserves mid-block, skewed the oracle reading by 947x, and triggered an under-collateralized borrow worth 3x the pool's actual value.",
    tags: ["Flash Loan", "Oracle", "AMM", "Price Manipulation"],
    terminal: [
      { type: "prompt", text: "$ " },
      { type: "cmd",    text: "forge test --match-test testOracleManipulation --fork-url $RPC -vvv" },
      { type: "output", text: "Reserve snapshot (pre-flash):  1000 ETH" },
      { type: "warn",   text: "Reserve snapshot (mid-block):  0.001 ETH  [manipulated]" },
      { type: "output", text: "Oracle skew factor:  x947" },
      { type: "error",  text: "[CRITICAL] Under-collateralized borrow — PoC passes" },
    ],
  },
  {
    id: 5,
    title: "Delegatecall to Unverified Implementation Address",
    target: "Upgradeable Proxy Pattern — EVM",
    severity: "critical",
    status: "PoC Confirmed",
    badge: null,
    description:
      "Proxy accepted arbitrary implementation address from msg.sender without whitelist check. Malicious contract passed via delegatecall context overwrote storage slot[0] (owner), granting full admin access and draining treasury.",
    tags: ["Proxy", "Delegatecall", "Storage Collision", "Access Control"],
    terminal: [
      { type: "prompt", text: "$ " },
      { type: "cmd",    text: "forge script AttackProxy.s.sol --fork-url $RPC --broadcast" },
      { type: "comment",text: "// Injecting malicious implementation via unvalidated address..." },
      { type: "output", text: "Slot[0] before: 0xOwner" },
      { type: "error",  text: "Slot[0] after:  0xAttacker  [overwritten via delegatecall]" },
      { type: "error",  text: "[CRITICAL] Treasury drained — full admin hijack confirmed" },
    ],
  },
  {
    id: 6,
    title: "Signature Replay Across Chains via Unsoped Nonce",
    target: "ERC-20 EIP-2612 Permit Implementation",
    severity: "medium",
    status: "PoC Confirmed",
    badge: null,
    description:
      "permit() nonce was not scoped to chainId. A valid testnet signature was replayed on mainnet, setting MAX_UINT allowance from victim wallet to attacker without the victim's knowledge.",
    tags: ["EIP-2612", "Replay Attack", "Signature", "Cross-chain"],
    terminal: [
      { type: "prompt", text: "$ " },
      { type: "cmd",    text: "python3 replay_permit.py --sig $TESTNET_SIG --chain mainnet" },
      { type: "output", text: "Replaying on chainId: 1" },
      { type: "output", text: "permit() accepted — nonce not chain-scoped" },
      { type: "warn",   text: "Allowance set:  victim → attacker  (MAX_UINT)" },
      { type: "error",  text: "[MEDIUM] Cross-chain replay confirmed" },
    ],
  },
]

export const skillsData = [
  {
    icon: "🔍",
    name: "Smart Contract Audit",
    skills: [
      { name: "Solidity / EVM", pct: 88 },
      { name: "Foundry / Hardhat", pct: 85 },
      { name: "Slither / Mythril", pct: 80 },
    ],
  },
  {
    icon: "⚡",
    name: "DeFi Attack Vectors",
    skills: [
      { name: "Flash Loans", pct: 90 },
      { name: "Oracle Manipulation", pct: 85 },
      { name: "Reentrancy Patterns", pct: 92 },
    ],
  },
  {
    icon: "🌐",
    name: "Web3 Infrastructure",
    skills: [
      { name: "Rust / Substrate", pct: 70 },
      { name: "Cross-chain / Bridges", pct: 75 },
      { name: "ZK Circuits (basic)", pct: 55 },
    ],
  },
  {
    icon: "🛠️",
    name: "Tooling & Research",
    skills: [
      { name: "Echidna / Fuzzing", pct: 78 },
      { name: "Forge (PoC Writing)", pct: 90 },
      { name: "Cast / Etherscan", pct: 88 },
    ],
  },
]
