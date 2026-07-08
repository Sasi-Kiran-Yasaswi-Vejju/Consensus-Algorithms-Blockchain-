// ============================================================
// DATA.JS — All application data for Consensus Explorer
// ============================================================

export const ALGORITHMS = {
  pow: {
    id: 'pow',
    name: 'Proof of Work',
    acronym: 'PoW',
    icon: '⛏️',
    color: '#f7931a',
    gradient: 'linear-gradient(135deg, #f7931a, #e8650a)',
    overview: 'Proof of Work is the original blockchain consensus mechanism, pioneered by Bitcoin in 2009. Nodes (called miners) compete to solve computationally intensive cryptographic puzzles. The first to solve the puzzle earns the right to add the next block and receives a cryptocurrency reward.',
    mechanism: 'Miners repeatedly compute SHA-256 hash functions on candidate block headers, varying the nonce value each attempt, until they find a hash output below a target difficulty threshold set by the network protocol.',
    whyExists: 'PoW was designed to prevent Sybil attacks and double-spending by requiring real-world resource expenditure (electricity and hardware), making it economically irrational to attack the network. Introduced by Satoshi Nakamoto in the 2008 Bitcoin whitepaper.',
    steps: [
      'Transactions are broadcast to the P2P network and collected into a mempool.',
      'Miners select unconfirmed transactions and construct a candidate block with a Merkle tree root.',
      'Miners include a coinbase transaction (block reward) for themselves.',
      'The miner sets a nonce value (starts at 0) and hashes the entire block header using SHA-256 twice.',
      'If the resulting hash is below the target difficulty (starts with N leading zeros), the puzzle is solved.',
      'If not, the miner increments the nonce and repeats. This can take trillions of attempts.',
      'The winning miner broadcasts the solved block to the network.',
      'Other nodes verify the proof by hashing the block themselves — this is trivially fast.',
      'The block is appended to the chain; the miner receives block reward + transaction fees.',
      'Difficulty adjusts every 2016 blocks (~2 weeks) to target 10-minute block times.'
    ],
    advantages: [
      'Proven security with 15+ years of Bitcoin\'s unbroken track record',
      'Fully permissionless — anyone with hardware can participate',
      'Transparent and auditable by anyone',
      'Attack resistance scales with total network hash rate',
      'Enables trustless finality via accumulated work (Nakamoto Consensus)',
      'Simple, elegant design with minimal protocol complexity'
    ],
    disadvantages: [
      'Extremely high energy consumption (Bitcoin uses ~150 TWh/year)',
      'Slow transaction finality (~60 minutes for 6 confirmations)',
      'Low throughput (~7 TPS for Bitcoin)',
      'ASIC hardware centralization risk',
      'Not suitable for enterprise or high-frequency applications',
      '51% attack risk for smaller PoW networks'
    ],
    metrics: {
      energy: 'Very High',
      security: 9.5,
      scalability: 2,
      decentralization: 8,
      tps: '3–7',
      blockTime: '~10 min',
      finality: '60 min (6 blocks)',
      participation: 'Miners'
    },
    apps: ['Bitcoin (BTC)', 'Litecoin (LTC)', 'Dogecoin (DOGE)', 'Monero (XMR)', 'Bitcoin Cash (BCH)']
  },

  pos: {
    id: 'pos',
    name: 'Proof of Stake',
    acronym: 'PoS',
    icon: '🪙',
    color: '#627eea',
    gradient: 'linear-gradient(135deg, #627eea, #4a5fd4)',
    overview: 'Proof of Stake replaces computational work with economic stake as the Sybil resistance mechanism. Validators lock up (stake) cryptocurrency as collateral and are pseudo-randomly selected to propose and attest to blocks, proportional to their stake.',
    mechanism: 'Validators deposit 32 ETH (for Ethereum) into a staking contract. An algorithm using RANDAO (randomness beacon) selects block proposers and committees from the validator set. Slashing conditions punish dishonest validators by destroying their stake.',
    whyExists: 'Created as an energy-efficient alternative to PoW while maintaining strong security guarantees. PoS provides economic finality through slashing — making double-spend attacks not just unprofitable but destructive to the attacker\'s capital.',
    steps: [
      'Validators stake a minimum amount of cryptocurrency (e.g., 32 ETH) into a deposit contract.',
      'The network groups validators into committees for each epoch (6.4 minutes for Ethereum).',
      'A RANDAO-based beacon chain randomly selects one validator per slot to propose a block.',
      'The proposer bundles transactions and broadcasts the proposed block.',
      'An attestation committee of ~128 validators votes (attests) on the proposed block.',
      'Attestations are aggregated using BLS signature schemes for efficiency.',
      'After sufficient attestations, the block is included in the canonical chain.',
      'Casper FFG (finality gadget) finalizes checkpoints every two epochs (~12.8 minutes).',
      'Proposers and attesters earn rewards proportional to their timely participation.',
      'Validators who equivocate (double vote) are slashed — losing up to their entire stake.'
    ],
    advantages: [
      '99.95% lower energy consumption compared to PoW (post-Merge Ethereum)',
      'Higher throughput potential (~100,000 TPS with sharding)',
      'Economic finality via slashing deters attacks more strongly than PoW',
      'Validators can participate from consumer hardware (no ASICs)',
      'Aligns incentives: validators with large stakes have most to lose',
      'Supports sharding and Layer 2 scalability solutions'
    ],
    disadvantages: [
      '"Nothing at Stake" problem requires careful slashing design',
      'Wealth concentration may lead to plutocracy',
      'Long staking lockup periods reduce capital efficiency',
      'Newer and less battle-tested than PoW at scale',
      'Bootstrapping problem: requires initial stake distribution',
      'Complex validator management and key security requirements'
    ],
    metrics: {
      energy: 'Very Low',
      security: 9,
      scalability: 8,
      decentralization: 7,
      tps: '15–100,000',
      blockTime: '12 sec',
      finality: '~15 min',
      participation: 'Validators'
    },
    apps: ['Ethereum (ETH)', 'Cardano (ADA)', 'Avalanche (AVAX)', 'Polkadot (DOT)', 'Cosmos (ATOM)']
  },

  dpos: {
    id: 'dpos',
    name: 'Delegated Proof of Stake',
    acronym: 'DPoS',
    icon: '🗳️',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    overview: 'DPoS introduces a representative democracy model to blockchain. Token holders vote to elect a fixed set of block producers (delegates/witnesses) who take turns producing blocks in a round-robin schedule, enabling high throughput.',
    mechanism: 'Token holders vote for block producers proportional to their token holdings. A fixed number (e.g., 21 for EOS, 27 for TRON) of top-voted delegates form the active producer set. Producers are scheduled to sign blocks in a deterministic rotation.',
    whyExists: 'Designed by Daniel Larimer in 2013 to dramatically increase transaction throughput beyond PoW and basic PoS limitations, while maintaining a form of democratic legitimacy through voter delegation.',
    steps: [
      'Token holders register as voters and stake their tokens.',
      'Candidates register as block producer candidates.',
      'Voters allocate their votes to preferred candidates (vote weight = token balance).',
      'Top N candidates (e.g., 21 for EOS) by vote weight become active block producers.',
      'A schedule rotates through all active producers in a deterministic order.',
      'Each producer gets a time slot to produce their block.',
      'If a producer misses their slot, the next producer takes over.',
      'Blocks are broadcast and validated by other producers.',
      'After a supermajority of producers sign, the block achieves irreversibility.',
      'Underperforming producers can be voted out by token holders in real time.'
    ],
    advantages: [
      'Extremely high throughput (thousands of TPS)',
      'Fast block times (0.5–3 seconds)',
      'Democratic representation through voting',
      'Energy efficient compared to PoW',
      'Clear accountability: poor producers can be voted out',
      'Deterministic finality within seconds'
    ],
    disadvantages: [
      'High centralization risk: only 21–100 active validators',
      'Plutocratic voting: wealthy token holders control elections',
      'Cartel formation among block producers',
      'Voter apathy leads to concentrated power',
      'Permissioned feel despite token-voting',
      'Vote buying and collusion vulnerabilities'
    ],
    metrics: {
      energy: 'Low',
      security: 6.5,
      scalability: 9,
      decentralization: 4,
      tps: '1,000–10,000',
      blockTime: '0.5–3 sec',
      finality: '~1–3 sec',
      participation: 'Elected Delegates'
    },
    apps: ['EOS (EOS)', 'TRON (TRX)', 'BitShares (BTS)', 'Steem (STEEM)', 'Lisk (LSK)']
  },

  pbft: {
    id: 'pbft',
    name: 'Practical Byzantine Fault Tolerance',
    acronym: 'PBFT',
    icon: '🛡️',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    overview: 'PBFT is a consensus algorithm designed to tolerate Byzantine failures in distributed systems. It achieves consensus as long as fewer than 1/3 of nodes are faulty or malicious, making it ideal for permissioned enterprise blockchains.',
    mechanism: 'PBFT operates in three phases: Pre-prepare (leader broadcasts proposal), Prepare (all nodes broadcast prepare messages), Commit (nodes broadcast commit messages). Consensus is reached when 2f+1 matching messages are collected (where f = max faulty nodes).',
    whyExists: 'PBFT was developed by Castro and Liskov in 1999 to make Byzantine fault-tolerant systems practical for real networks. It was adapted for blockchain to provide strong finality guarantees in enterprise settings without mining.',
    steps: [
      'A designated leader (primary) receives a client request.',
      'Leader broadcasts a PRE-PREPARE message containing the request and sequence number.',
      'Each node validates the message and sends a PREPARE message to all other nodes.',
      'Once a node collects 2f+1 PREPARE messages, it sends a COMMIT message to all nodes.',
      'Once 2f+1 COMMIT messages are received, the node executes the request.',
      'The node sends a REPLY to the client with the result.',
      'The client accepts the result after receiving f+1 matching replies.',
      'If the leader fails, a view-change protocol elects a new leader.',
      'Checkpointing periodically stabilizes the state.',
      'All honest nodes reach the same final state (Byzantine Agreement).'
    ],
    advantages: [
      'Immediate transaction finality — no forks',
      'Strong security against up to 1/3 Byzantine nodes',
      'Highly energy efficient (no mining)',
      'Suitable for permissioned enterprise networks',
      'Proven academic foundation from distributed systems research',
      'Deterministic consensus, no probabilistic finality'
    ],
    disadvantages: [
      'Communication complexity O(n²) — does not scale beyond ~100 nodes',
      'Requires known, permissioned validator set',
      'Leader failures cause temporary halts',
      'Not suitable for fully decentralized public networks',
      'High message overhead in large networks',
      'Leader centralization creates a single point of concern'
    ],
    metrics: {
      energy: 'Very Low',
      security: 8.5,
      scalability: 4,
      decentralization: 3,
      tps: '100–20,000',
      blockTime: '<1 sec',
      finality: 'Immediate',
      participation: 'Permissioned Validators'
    },
    apps: ['Hyperledger Fabric', 'Tendermint/Cosmos', 'Quorum', 'Zilliqa (partially)', 'Diem (Libra)']
  },

  poa: {
    id: 'poa',
    name: 'Proof of Authority',
    acronym: 'PoA',
    icon: '🏛️',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    overview: 'Proof of Authority relies on the real-world identity and reputation of validators, who are vetted and approved by the network authority. Block validators stake their identity rather than cryptocurrency, creating accountability through reputation.',
    mechanism: 'A set of pre-approved, identity-verified validators take turns producing blocks. Their real-world identities are publicly known, creating strong social accountability. Misbehaving validators lose their status and reputation.',
    whyExists: 'Designed for enterprise and consortium blockchains where participant identity is known, and where high performance, low cost, and predictable behavior are prioritized over full decentralization.',
    steps: [
      'Network authority vets and approves validator identities (KYC/AML process).',
      'Approved validators are added to the authorized validator set.',
      'Validators take turns proposing blocks in a round-robin or randomized order.',
      'The designated validator for the current slot collects pending transactions.',
      'The validator creates, signs, and broadcasts a block with their identity.',
      'Other validators verify the block against the known validator set.',
      'Valid blocks are immediately accepted — no competitive solving required.',
      'Validators monitor each other for misbehavior.',
      'Misbehaving validators are voted out by other validators or the authority.',
      'New validators can be added by governance vote of existing validators.'
    ],
    advantages: [
      'Extremely fast and high-throughput (thousands of TPS)',
      'Near-zero energy consumption',
      'Strong accountability through real identity staking',
      'Ideal for enterprise, supply chain, and consortium use cases',
      'Resistant to Sybil attacks (identity verification prevents fake nodes)',
      'Predictable block production and performance'
    ],
    disadvantages: [
      'Highly centralized — antithetical to blockchain\'s decentralized philosophy',
      'Requires trust in the approving authority',
      'Validators could collude or be coerced',
      'Not suitable for public, permissionless networks',
      'Identity exposure creates privacy concerns for validators',
      'Failure of vetting process undermines security'
    ],
    metrics: {
      energy: 'Minimal',
      security: 7,
      scalability: 9.5,
      decentralization: 2,
      tps: '300–2,000',
      blockTime: '1–5 sec',
      finality: 'Immediate',
      participation: 'Approved Authorities'
    },
    apps: ['VeChain (VET)', 'Binance Smart Chain (BNB)', 'POA Network', 'xDai Chain', 'Azure Blockchain']
  },

  poh: {
    id: 'poh',
    name: 'Proof of History',
    acronym: 'PoH',
    icon: '⏰',
    color: '#14f195',
    gradient: 'linear-gradient(135deg, #14f195, #05c476)',
    overview: 'Proof of History is not a consensus mechanism itself but a cryptographic clock that creates a historical record proving that an event occurred at a specific moment in time. Solana uses PoH as a pre-consensus ordering mechanism in combination with Tower BFT (a PoS variant).',
    mechanism: 'PoH uses a Verifiable Delay Function (VDF) — a SHA-256 hash function applied recursively. Each output becomes the input of the next hash, creating an ordered, time-stamped ledger. This allows nodes to verify the order of events without communicating.',
    whyExists: 'Invented by Anatoly Yakovenko to solve the coordination overhead that limits blockchain throughput. Traditional blockchains waste time agreeing on timestamps; PoH embeds time directly into the data structure.',
    steps: [
      'A designated leader node runs a continuous SHA-256 hash loop (VDF).',
      'Each hash output becomes the input to the next computation — creating a chain.',
      'The hash chain creates a cryptographic, verifiable sequence of "ticks."',
      'Transactions are inserted at specific points in this hash sequence.',
      'The position in the sequence proves when (in terms of PoH ticks) the transaction occurred.',
      'Other validators can verify the sequence extremely fast using parallel verification.',
      'The leader bundles transactions and PoH ticks into a block every ~400ms.',
      'Tower BFT validators vote on the block based on their PoS stake.',
      'With 2/3 supermajority, the block is confirmed.',
      'The PoH sequence continues, providing the next leader with a cryptographic timestamp.'
    ],
    advantages: [
      'Enables extremely high throughput (~65,000 TPS in practice)',
      'Sub-second block times (~400ms slots)',
      'Cryptographic ordering eliminates the need for timestamp negotiation',
      'Parallel transaction processing via Sealevel runtime',
      'Highly scalable architecture',
      'Low transaction costs'
    ],
    disadvantages: [
      'Complex architecture — harder to understand and implement',
      'Leader centralization during each slot (single point of failure)',
      'Historical network outages due to implementation complexity',
      'Validator hardware requirements are very high (fast CPUs, NVMe SSDs)',
      'Full decentralization is still an ongoing challenge',
      'Smart contract bugs and runtime issues have occurred'
    ],
    metrics: {
      energy: 'Low',
      security: 7.5,
      scalability: 10,
      decentralization: 5,
      tps: '50,000–65,000',
      blockTime: '400 ms',
      finality: '~1.5 sec',
      participation: 'Validators (PoS + PoH)'
    },
    apps: ['Solana (SOL)']
  },

  pob: {
    id: 'pob',
    name: 'Proof of Burn',
    acronym: 'PoB',
    icon: '🔥',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    overview: 'Proof of Burn requires participants to "burn" (permanently destroy) a quantity of cryptocurrency by sending it to an unspendable address. This irreversible sacrifice grants mining rights proportional to the amount burned, creating virtual mining power without physical hardware.',
    mechanism: 'Miners send coins to a provably unspendable address (e.g., a null address with no known private key). The protocol tracks burnt coins and grants mining power proportional to burnt amount, which may decay over time to encourage continued participation.',
    whyExists: 'Proposed by Iain Stewart in 2012 as a way to achieve PoW-like scarcity without energy waste. Burning coins is economically equivalent to buying mining hardware but without the environmental cost.',
    steps: [
      'A participant acquires cryptocurrency (often a more established coin like BTC).',
      'The participant sends coins to a verifiably unspendable burn address (all-zeros address).',
      'The burn transaction is recorded permanently on the blockchain.',
      'The protocol assigns virtual mining rights proportional to coins burned.',
      'These mining rights allow participation in block production for the PoB chain.',
      'Mining power may decay exponentially over time to prevent hoarding.',
      'Block producers are chosen based on accumulated (decayed) burn power.',
      'The winner signs and broadcasts the block, earning block rewards.',
      'Block rewards in the native PoB coin compensate for burned coins over time.',
      'The cycle repeats, with miners burning more to maintain or grow their power.'
    ],
    advantages: [
      'No hardware required — accessible to anyone with cryptocurrency',
      'Energy efficient compared to PoW',
      'Creates a deflationary pressure on burned cryptocurrency',
      'Long-term commitment mechanism through burn decay',
      'Bootstrap mechanism for new blockchains using existing crypto',
      'Proven economic commitment without physical resource expenditure'
    ],
    disadvantages: [
      'Burning real money is a high barrier for new participants',
      'Early adopters gain permanent advantages',
      'Verifying burns across chains adds complexity',
      'Relatively untested at scale',
      'Deflationary pressure on burned coin may harm its ecosystem',
      'Not environmentally superior if burned coins were mined via PoW'
    ],
    metrics: {
      energy: 'Low',
      security: 6,
      scalability: 6,
      decentralization: 6,
      tps: '100–500',
      blockTime: '~1 min',
      finality: '~10 min',
      participation: 'Coin Burners'
    },
    apps: ['Slimcoin (SLM)', 'Counterparty (XCP)', 'Factom (FCT)', 'Binance Token Burns (mechanism)']
  },

  poc: {
    id: 'poc',
    name: 'Proof of Capacity',
    acronym: 'PoC',
    icon: '💾',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
    overview: 'Proof of Capacity (also called Proof of Space) uses available hard disk storage instead of computing power or financial stake to earn the right to validate blocks. Miners pre-compute and store large datasets called "plots" on their hard drives.',
    mechanism: 'Miners pre-compute a large table of cryptographic hash outputs (called plotting) and store them on hard drives. When a block challenge is issued, miners scan their stored plots to find the best matching hash value. The miner with the closest match wins.',
    whyExists: 'Proposed as a greener alternative to PoW that uses existing consumer hardware (hard drives) instead of specialized ASICs. Storage is cheap, ubiquitous, and consumes far less electricity than GPU/ASIC mining.',
    steps: [
      'Miners "plot" their hard drives — pre-computing SHA256 hashes of nonce-pubkey pairs.',
      'Plots are organized into lookup tables called "plots" (typically 100GB–4TB per file).',
      'When a new block is needed, the network broadcasts a challenge (cryptographic seed).',
      'Miners scan their plot files to find nonces that produce hashes close to the challenge.',
      'The "deadline" value is computed: lower deadline = faster block creation right.',
      'The miner with the lowest deadline broadcasts their solution.',
      'Other nodes verify the plot-nonce pairing quickly.',
      'The winning miner creates and broadcasts the block.',
      'Block reward is paid to the winning miner.',
      'Larger drives = more plots = better chance of low deadlines.'
    ],
    advantages: [
      'Uses energy-efficient hard drives vs power-hungry GPUs',
      'Leverages existing consumer storage hardware',
      'Pre-computing plots amortizes cost over time',
      'Eco-friendly alternative to PoW with lower carbon footprint',
      'Permissionless — any large-storage device can participate',
      'Resistant to ASIC specialization'
    ],
    disadvantages: [
      'Created hard drive shortages during Chia launch in 2021',
      'Plot generation still requires significant CPU/RAM upfront',
      'Centralization risk for those with massive storage farms',
      'Mining effectiveness scales directly with storage capacity',
      'Relatively low adoption and ecosystem development',
      'Plot storage degradation over time'
    ],
    metrics: {
      energy: 'Low',
      security: 6.5,
      scalability: 6,
      decentralization: 6.5,
      tps: '20–100',
      blockTime: '~18 sec',
      finality: '~3–5 min',
      participation: 'Storage Farmers'
    },
    apps: ['Chia (XCH)', 'Burstcoin (BURST)', 'Spacemesh (SMH)', 'Signum (SIGNA)']
  },

  poet: {
    id: 'poet',
    name: 'Proof of Elapsed Time',
    acronym: 'PoET',
    icon: '⌛',
    color: '#84cc16',
    gradient: 'linear-gradient(135deg, #84cc16, #65a30d)',
    overview: 'Proof of Elapsed Time uses Intel\'s Software Guard Extensions (SGX) secure enclaves to fairly distribute block leadership. Each node requests a random wait time from a trusted SGX enclave; the node with the shortest wait time wins the right to create the next block.',
    mechanism: 'Each network node runs SGX-verified code that generates a cryptographically random sleep timer. The node that wakes up first (smallest wait time) gets to create the next block. SGX guarantees the timer ran in a secure, tamper-proof environment.',
    whyExists: 'Developed by Intel for the Hyperledger Sawtooth project as a fair, energy-efficient alternative to PoW for permissioned enterprise blockchains that still want lottery-based leader election without computational waste.',
    steps: [
      'Each node requests a random wait time from a local Intel SGX secure enclave.',
      'The SGX enclave generates a provably random wait duration and a signed certificate.',
      'Each node sleeps for their assigned duration.',
      'The first node to wake up broadcasts a "claim leader" message with the SGX certificate.',
      'Other nodes verify the certificate using Intel\'s attestation service.',
      'Verification confirms: the wait time was generated by genuine SGX hardware, the timer ran correctly, and the node didn\'t cheat.',
      'The winner creates the next block and broadcasts it.',
      'The block includes the SGX certificate as proof of fair election.',
      'Other nodes validate and append the block.',
      'The process repeats for the next block.'
    ],
    advantages: [
      'Fair leader election without computational competition',
      'Very low energy consumption',
      'Scalable — wait times don\'t grow with network size',
      'Suitable for enterprise permissioned blockchains',
      'Auditable via Intel\'s remote attestation service',
      'Simple implementation using existing hardware'
    ],
    disadvantages: [
      'Depends entirely on Intel SGX hardware (vendor lock-in)',
      'Intel can theoretically compromise SGX attestation',
      'Hardware failures or vulnerabilities (e.g., SGX exploits) undermine security',
      'Requires physical Intel processors — not software-only',
      'Centralized trust in Intel as hardware manufacturer',
      'Limited to permissioned settings — not suitable for public blockchains'
    ],
    metrics: {
      energy: 'Very Low',
      security: 7,
      scalability: 7,
      decentralization: 3.5,
      tps: '100–1,000',
      blockTime: '~10 sec',
      finality: '~30 sec',
      participation: 'SGX Nodes'
    },
    apps: ['Hyperledger Sawtooth', 'Intel Enterprise Blockchain']
  },

  poact: {
    id: 'poact',
    name: 'Proof of Activity',
    acronym: 'PoAct',
    icon: '⚡',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    overview: 'Proof of Activity is a hybrid consensus mechanism combining PoW and PoS. Mining creates empty block templates (PoW), and randomly selected online validators (via PoS) must sign the block to complete it. This requires both computational work and active validator participation.',
    mechanism: 'Miners produce block headers following PoW rules. The header\'s hash determines which N validators must sign it (derived deterministically from the hash). The block is only complete when all required validators have signed — combining work and stake.',
    whyExists: 'Proposed by Charles Lee, Gary Andresen, and others to combine the security of PoW with PoS incentives. It addresses the "nothing at stake" problem by requiring online validator participation.',
    steps: [
      'Miners compete using standard PoW to find a valid block header hash.',
      'The winning miner creates an empty block template (header only, no transactions).',
      'The block header hash is used as a seed to deterministically select N follow-on validators.',
      'Selected validators must be online and check the network for pending templates.',
      'Selected validators sign the block template with their private keys.',
      'Once all required validators have signed, full transactions are added.',
      'The completed block (with all validator signatures) is broadcast to the network.',
      'Block reward is split: portion to PoW miner, portion to signing validators.',
      'The signed block is verified and appended to the chain.',
      'Transaction fees and block rewards incentivize both miner and validator participation.'
    ],
    advantages: [
      'Combines PoW security with PoS stake participation',
      'Addresses "nothing at stake" — validators must be online and sign',
      'Reduces 51% attack risk: requires both hash power AND validator collusion',
      'Flexible reward sharing incentivizes diverse participation',
      'Stronger security model than pure PoW or pure PoS alone',
      'No empty block spam — validators must actively complete blocks'
    ],
    disadvantages: [
      'Requires validators to be online — liveness concern',
      'Complex dual-layer mechanism increases implementation risk',
      'If validators go offline, blocks cannot be completed',
      'Still inherits PoW energy inefficiency for initial header mining',
      'Limited real-world adoption and testing at scale',
      'Reward splitting may reduce miner and validator incentives individually'
    ],
    metrics: {
      energy: 'Medium',
      security: 7.5,
      scalability: 5,
      decentralization: 7,
      tps: '10–100',
      blockTime: '~10 min',
      finality: '~60 min',
      participation: 'Miners + Validators'
    },
    apps: ['Decred (DCR)', 'Espers (ESP)']
  },

  pospace: {
    id: 'pospace',
    name: 'Proof of Space',
    acronym: 'PoSpace',
    icon: '🌌',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    overview: 'Proof of Space (distinct from Proof of Capacity) proves that a prover has allocated a certain amount of disk storage space. It uses cryptographic proofs to verify storage allocation without requiring the storage to hold pre-computed data, enabling dynamic space commitment.',
    mechanism: 'A farmer (prover) allocates disk space and generates a proof showing they genuinely have access to that space. The protocol uses polynomial commitments and Merkle trees to generate succinct proofs of space allocation verifiable by validators.',
    whyExists: 'Developed as part of Chia Network\'s design to use idle disk space as an environmentally friendly alternative to PoW mining, while creating a more verifiable and dynamically adjustable proof than simple PoC.',
    steps: [
      'Farmers allocate hard drive space and generate cryptographic plots.',
      'Plotting phase: The farmer fills their drive with random data organized as a lookup table.',
      'When a challenge is broadcast, the farmer scans their plots for matching proof data.',
      'The farmer generates a proof-of-space proof from matching data.',
      'A Proof of Time (VDF — Verifiable Delay Function) is computed on the proof.',
      'This combines PoSpace with PoTime for added security against replotting attacks.',
      'The combined proof is verified by the network.',
      'The block with the best quality proof is selected.',
      'The winning farmer receives block rewards.',
      'Difficulty adjusts to target consistent block intervals.'
    ],
    advantages: [
      'Highly energy efficient — hard drives use minimal power when idle',
      'Leverages existing consumer and enterprise storage hardware',
      'No specialized mining hardware required',
      'Fairer distribution since storage is a universal resource',
      'Strong cryptographic foundations',
      'Eco-friendly alternative to PoW'
    ],
    disadvantages: [
      'Initial plot generation is CPU and RAM intensive',
      'Large storage farms can dominate if not carefully designed',
      'Plot generation can still use significant energy upfront',
      'Growing ecosystem but limited compared to major platforms',
      'Technical complexity of PoSpace + PoTime hybrid',
      'SSD lifespan concerns during intensive plotting'
    ],
    metrics: {
      energy: 'Very Low',
      security: 6.5,
      scalability: 6,
      decentralization: 6,
      tps: '20–50',
      blockTime: '~18 sec',
      finality: '~5 min',
      participation: 'Storage Farmers'
    },
    apps: ['Chia (XCH)', 'Filecoin (FIL)', 'Spacemesh (SMH)']
  },

  poimp: {
    id: 'poimp',
    name: 'Proof of Importance',
    acronym: 'PoI',
    icon: '⭐',
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    overview: 'Proof of Importance scores participants based on their overall network contribution including staked balance, transaction frequency, and transaction partners — rewarding active network participants rather than merely wealthy stakeholders.',
    mechanism: 'NEM calculates an importance score for each account using: minimum vested balance (10,000 XEM), transaction volume (last 30 days), and network graph centrality (who you transact with). Harvesting power is proportional to this multifactor score.',
    whyExists: 'Developed by NEM (New Economy Movement) in 2015 to address the plutocratic "rich get richer" criticism of PoS. By factoring in activity, PoI rewards users who actively participate in the economy.',
    steps: [
      'Account must hold and vest a minimum of 10,000 XEM (vesting takes time).',
      'Account participates in transactions — sending and receiving XEM.',
      'The network tracks: vested balance, transaction activity in past 30 days, and unique counterparties.',
      'A PageRank-style algorithm computes the account\'s network centrality score.',
      'The overall importance score combines all three factors with weighted coefficients.',
      'High-importance accounts activate "harvesting" mode.',
      'When chosen (randomly weighted by importance), the harvester creates a block.',
      'The harvester receives transaction fee rewards (no new XEM created — fixed supply).',
      'Importance scores update dynamically as transaction patterns change.',
      'Delegated harvesting allows importance to be shared with a trusted node.'
    ],
    advantages: [
      'Rewards active network participants, not just wealthy holders',
      'Anti-hoarding mechanism: unused stakes decay in importance',
      'Energy efficient compared to PoW',
      'Multi-factor scoring is harder to game than simple stake-based systems',
      'Encourages economic activity and liquidity',
      'Fixed supply with fee-only rewards controls inflation'
    ],
    disadvantages: [
      'Complex scoring algorithm is hard to understand and audit',
      'Minimum balance requirement still favors wealthy participants',
      'Limited to NEM ecosystem — not widely adopted',
      'Gaming attempts through transaction manipulation',
      'Privacy concerns: transaction graph analysis exposes relationships',
      'Vesting period creates illiquidity for new participants'
    ],
    metrics: {
      energy: 'Low',
      security: 6.5,
      scalability: 6,
      decentralization: 6,
      tps: '100–4,000',
      blockTime: '~1 min',
      finality: '~3 min',
      participation: 'Active Holders'
    },
    apps: ['NEM (XEM)', 'Symbol (XYM)']
  }
};

export const BLOCKCHAINS = [
  {
    id: 'bitcoin', name: 'Bitcoin', ticker: 'BTC', logo: '₿', color: '#f7931a',
    consensus: 'pow', consensusLabel: 'Proof of Work',
    founder: 'Satoshi Nakamoto', year: 2009,
    blockTime: '~10 min', tps: '3–7',
    layer: 1, language: 'Script (limited)',
    useCase: 'Digital gold, store of value, peer-to-peer payments',
    suitability: 'PoW ensures maximum decentralization and security for Bitcoin\'s role as a censorship-resistant store of value. The energy expenditure is intentional — it creates real-world cost that makes attacks economically prohibitive.'
  },
  {
    id: 'litecoin', name: 'Litecoin', ticker: 'LTC', logo: 'Ł', color: '#bfbbbb',
    consensus: 'pow', consensusLabel: 'Proof of Work (Scrypt)',
    founder: 'Charlie Lee', year: 2011,
    blockTime: '~2.5 min', tps: '28–56',
    layer: 1, language: 'Script',
    useCase: 'Faster payments, "silver to Bitcoin\'s gold"',
    suitability: 'Scrypt-based PoW was chosen to be ASIC-resistant initially, targeting CPU/GPU miners for fairer distribution. Faster block times than Bitcoin suit retail payment use cases.'
  },
  {
    id: 'dogecoin', name: 'Dogecoin', ticker: 'DOGE', logo: 'Ð', color: '#c2a633',
    consensus: 'pow', consensusLabel: 'Proof of Work (Scrypt)',
    founder: 'Billy Markus & Jackson Palmer', year: 2013,
    blockTime: '~1 min', tps: '33–100',
    layer: 1, language: 'Script',
    useCase: 'Microtransactions, tipping, community payments',
    suitability: 'Scrypt PoW provides fast 1-minute blocks suitable for micropayments. Merge-mining with Litecoin provides additional hash power security.'
  },
  {
    id: 'ethereum', name: 'Ethereum', ticker: 'ETH', logo: 'Ξ', color: '#627eea',
    consensus: 'pos', consensusLabel: 'Proof of Stake (Casper)',
    founder: 'Vitalik Buterin', year: 2015,
    blockTime: '12 sec', tps: '15–100,000',
    layer: 1, language: 'Solidity, Vyper',
    useCase: 'Smart contracts, DeFi, NFTs, dApps, Layer 2 infrastructure',
    suitability: 'Post-Merge PoS reduces energy usage by 99.95% while maintaining decentralization. Staking requirements distribute validation across 500,000+ validators. Supports sharding for scalability.'
  },
  {
    id: 'cardano', name: 'Cardano', ticker: 'ADA', logo: '₳', color: '#0033ad',
    consensus: 'pos', consensusLabel: 'Proof of Stake (Ouroboros)',
    founder: 'Charles Hoskinson', year: 2017,
    blockTime: '20 sec', tps: '250–1,000',
    layer: 1, language: 'Plutus (Haskell)',
    useCase: 'Smart contracts, identity, financial inclusion in developing nations',
    suitability: 'Ouroboros is the first formally peer-reviewed and mathematically proven secure PoS protocol. Cardano\'s academic rigor and energy efficiency align with its focus on sustainable global financial infrastructure.'
  },
  {
    id: 'solana', name: 'Solana', ticker: 'SOL', logo: '◎', color: '#14f195',
    consensus: 'poh', consensusLabel: 'Proof of History + Tower BFT',
    founder: 'Anatoly Yakovenko', year: 2020,
    blockTime: '400 ms', tps: '50,000–65,000',
    layer: 1, language: 'Rust, C, C++',
    useCase: 'High-frequency DeFi, NFT trading, Web3 applications requiring high TPS',
    suitability: 'PoH creates a cryptographic clock enabling parallel transaction processing. Combined with Tower BFT and Sealevel VM, Solana achieves unprecedented throughput for consumer blockchain applications.'
  },
  {
    id: 'eos', name: 'EOS', ticker: 'EOS', logo: 'Ε', color: '#22c55e',
    consensus: 'dpos', consensusLabel: 'Delegated Proof of Stake',
    founder: 'Daniel Larimer / Block.one', year: 2018,
    blockTime: '0.5 sec', tps: '4,000–10,000',
    layer: 1, language: 'C++, WebAssembly',
    useCase: 'Enterprise dApps, gaming, decentralized finance at high throughput',
    suitability: 'DPoS with 21 block producers enables EOS\'s high-performance design. Voted-in producers are accountable to token holders, creating a semi-democratic governance model for enterprise applications.'
  },
  {
    id: 'tron', name: 'TRON', ticker: 'TRX', logo: '⟁', color: '#ff0013',
    consensus: 'dpos', consensusLabel: 'Delegated Proof of Stake',
    founder: 'Justin Sun', year: 2017,
    blockTime: '3 sec', tps: '2,000–10,000',
    layer: 1, language: 'Solidity (TVM)',
    useCase: 'Digital content distribution, entertainment, stablecoin payments',
    suitability: 'DPoS provides TRON with the high-throughput and low-latency required for content streaming and USDT payment use cases, while EVM compatibility enables Solidity developer adoption.'
  },
  {
    id: 'hyperledger', name: 'Hyperledger Fabric', ticker: 'N/A', logo: '⬡', color: '#a855f7',
    consensus: 'pbft', consensusLabel: 'PBFT / Raft',
    founder: 'Linux Foundation / IBM', year: 2016,
    blockTime: '<1 sec', tps: '3,500–20,000',
    layer: 1, language: 'Go, Java, JavaScript (Chaincode)',
    useCase: 'Enterprise supply chain, healthcare records, financial services, permissioned consortiums',
    suitability: 'PBFT provides immediate finality critical for enterprise applications where transaction reversibility is unacceptable. The permissioned model with identity-verified participants suits regulatory compliance requirements.'
  },
  {
    id: 'vechain', name: 'VeChain', ticker: 'VET', logo: 'V', color: '#06b6d4',
    consensus: 'poa', consensusLabel: 'Proof of Authority (PoA 2.0)',
    founder: 'Sunny Lu', year: 2015,
    blockTime: '10 sec', tps: '10,000+',
    layer: 1, language: 'Solidity (EVM compatible)',
    useCase: 'Supply chain traceability, product authentication, sustainability tracking',
    suitability: 'PoA suits VeChain\'s enterprise focus: 101 known Authority Masternodes are verified businesses accountable to VeChain Foundation. This enables regulatory compliance and high TPS for supply chain IoT data.'
  }
];

export const SMART_CONTRACTS = [
  {
    blockchain: 'Bitcoin', consensus: 'PoW', languages: ['Miniscript', 'Script'],
    compiler: 'Bitcoin Script Interpreter', vm: 'Bitcoin Script Engine',
    examples: ['Multi-signature Vaults', 'HTLC (Lightning Network)', 'Timelocks']
  },
  {
    blockchain: 'Ethereum', consensus: 'PoS', languages: ['Solidity', 'Vyper'],
    compiler: 'solc / Vyper Compiler', vm: 'EVM (Ethereum Virtual Machine)',
    examples: ['ERC-20 Token', 'Uniswap DEX', 'Aave Lending', 'OpenSea NFT']
  },
  {
    blockchain: 'Solana', consensus: 'PoH + PoS', languages: ['Rust', 'C', 'C++'],
    compiler: 'rustc + BPF Compiler', vm: 'Solana Runtime (Sealevel)',
    examples: ['SPL Token', 'Serum DEX', 'Magic Eden NFT', 'Marinade Finance']
  },
  {
    blockchain: 'Cardano', consensus: 'PoS (Ouroboros)', languages: ['Plutus (Haskell)', 'Marlowe'],
    compiler: 'GHC (Glasgow Haskell Compiler)', vm: 'Cardano Runtime (EUTXO)',
    examples: ['Minswap DEX', 'JPG Store NFT', 'World Mobile', 'SundaeSwap']
  },
  {
    blockchain: 'Hyperledger Fabric', consensus: 'PBFT / Raft', languages: ['Go', 'Java', 'JavaScript'],
    compiler: 'Go compiler / JVM / Node.js', vm: 'Docker Container / Chaincode',
    examples: ['TradeLens (Maersk)', 'Food Trust (Walmart)', 'We.trade', 'Marco Polo']
  },
  {
    blockchain: 'EOS', consensus: 'DPoS', languages: ['C++', 'WebAssembly'],
    compiler: 'eosio-cpp (LLVM)', vm: 'WASM Runtime (EOSIO)',
    examples: ['Defibox DEX', 'Upland NFT', 'EOSIO System Contracts', 'Pomelo']
  },
  {
    blockchain: 'TRON', consensus: 'DPoS', languages: ['Solidity'],
    compiler: 'Solidity Compiler (TVM-compatible)', vm: 'TVM (TRON Virtual Machine)',
    examples: ['JustSwap DEX', 'Sun.io DeFi', 'APENFT', 'TrueUSD on TRON']
  },
  {
    blockchain: 'VeChain', consensus: 'PoA 2.0', languages: ['Solidity', 'Vyper'],
    compiler: 'Solidity Compiler (EVM-compatible)', vm: 'EVM (VeChainThor)',
    examples: ['DNV GL Verification', 'ASI Group Supply Chain', 'WineChain', 'eBuyNow']
  },
  {
    blockchain: 'Avalanche', consensus: 'PoS (Snowman)', languages: ['Solidity', 'Rust'],
    compiler: 'solc / rustc', vm: 'AvalancheEVM / Custom VM',
    examples: ['Trader Joe DEX', 'Benqi Lending', 'Pangolin Exchange', 'Crabada NFT Game']
  },
  {
    blockchain: 'Polkadot', consensus: 'NPoS (Nominated PoS)', languages: ['Rust', 'ink!'],
    compiler: 'rustc + cargo-contract', vm: 'WASM Runtime (Substrate)',
    examples: ['Acala DeFi', 'Moonbeam EVM', 'Astar Network', 'Phala Privacy Computing']
  }
];

export const LAYERS = {
  0: {
    label: 'Layer 0',
    color: '#ec4899',
    description: 'The foundational network infrastructure layer. Layer 0 protocols enable cross-chain communication, interoperability, and provide the underlying network for Layer 1 blockchains to run on. They are the "internet of blockchains."',
    purpose: 'Cross-chain interoperability, shared security, relay networks',
    examples: [
      { name: 'Polkadot', icon: '⬟', desc: 'Relay chain connecting parachains with shared security' },
      { name: 'Cosmos', icon: '⚛️', desc: 'IBC protocol enabling sovereign blockchain interoperability' },
      { name: 'Avalanche Warp', icon: '🌐', desc: 'Cross-subnet communication protocol' },
      { name: 'Celestia', icon: '✨', desc: 'Modular data availability layer' }
    ]
  },
  1: {
    label: 'Layer 1',
    color: '#6c63ff',
    description: 'The base blockchain layer where consensus is achieved and transaction finality occurs. Layer 1 is the root of trust for the entire ecosystem. Security and decentralization decisions are made at this layer.',
    purpose: 'Base consensus, transaction settlement, security, smart contract execution',
    examples: [
      { name: 'Bitcoin', icon: '₿', desc: 'Original PoW blockchain, digital gold' },
      { name: 'Ethereum', icon: 'Ξ', desc: 'Smart contract platform, post-Merge PoS' },
      { name: 'Solana', icon: '◎', desc: 'High-throughput PoH + PoS blockchain' },
      { name: 'Cardano', icon: '₳', desc: 'Formally verified Ouroboros PoS' },
      { name: 'Avalanche', icon: '🔺', desc: 'Subnets with Snowman PoS consensus' },
      { name: 'BNB Chain', icon: 'B', desc: 'EVM-compatible PoSA consensus' }
    ]
  },
  2: {
    label: 'Layer 2',
    color: '#00d4ff',
    description: 'Scaling solutions built on top of Layer 1 blockchains to increase throughput and reduce transaction costs while inheriting the security of the underlying Layer 1. Transactions are processed off-chain and settled periodically on Layer 1.',
    purpose: 'Scalability, cost reduction, higher TPS, while inheriting L1 security',
    examples: [
      { name: 'Polygon', icon: '⬠', desc: 'Ethereum sidechain + rollup ecosystem' },
      { name: 'Optimism', icon: '🔴', desc: 'Optimistic rollup for EVM compatibility' },
      { name: 'Arbitrum', icon: '🔵', desc: 'Leading optimistic rollup by TVL' },
      { name: 'zkSync', icon: '⚡', desc: 'ZK-rollup for fast, cheap Ethereum transactions' },
      { name: 'Lightning Network', icon: '⚡', desc: 'Bitcoin payment channels for instant micropayments' },
      { name: 'StarkNet', icon: '⭐', desc: 'ZK-STARK powered validity rollup' }
    ]
  },
  3: {
    label: 'Layer 3',
    color: '#14f195',
    description: 'The application layer where end-user products and protocols are built. Layer 3 encompasses all decentralized applications (dApps), protocols, and experiences that leverage the infrastructure provided by Layers 0–2.',
    purpose: 'End-user applications, dApps, DeFi, NFTs, GameFi, social networks',
    examples: [
      { name: 'DeFi Protocols', icon: '💱', desc: 'Uniswap, Aave, Compound, Curve' },
      { name: 'NFT Marketplaces', icon: '🎨', desc: 'OpenSea, Blur, Magic Eden' },
      { name: 'DAOs', icon: '🗳️', desc: 'MakerDAO, Uniswap DAO, ENS DAO' },
      { name: 'Web3 Games', icon: '🎮', desc: 'Axie Infinity, Gods Unchained, Illuvium' },
      { name: 'Social dApps', icon: '📱', desc: 'Lens Protocol, Farcaster, CyberConnect' },
      { name: 'Identity', icon: '🆔', desc: 'ENS, Unstoppable Domains, Ceramic Network' }
    ]
  }
};

export const TIMELINE_EVENTS = [
  { year: 2008, title: 'Bitcoin Whitepaper', desc: 'Satoshi Nakamoto publishes "Bitcoin: A Peer-to-Peer Electronic Cash System," introducing Proof of Work consensus.', icon: '📄', algo: 'pow' },
  { year: 2009, title: 'Bitcoin Genesis Block', desc: 'The first Bitcoin block is mined on January 3rd, 2009. PoW consensus goes live. Block reward: 50 BTC.', icon: '⛏️', algo: 'pow' },
  { year: 2011, title: 'Litecoin Launches', desc: 'Charlie Lee creates Litecoin with Scrypt PoW for faster 2.5-minute blocks and initial ASIC resistance.', icon: '💡', algo: 'pow' },
  { year: 2012, title: 'Proof of Stake Proposed', desc: 'Sunny King and Scott Nadal propose Proof of Stake in the Peercoin whitepaper as an energy-efficient alternative.', icon: '🪙', algo: 'pos' },
  { year: 2012, title: 'Proof of Burn Proposed', desc: 'Iain Stewart proposes Proof of Burn — destroying coins to earn mining rights without physical hardware.', icon: '🔥', algo: 'pob' },
  { year: 2013, title: 'DPoS Invented', desc: 'Daniel Larimer invents Delegated Proof of Stake for BitShares, introducing democratic validator elections.', icon: '🗳️', algo: 'dpos' },
  { year: 2013, title: 'Ethereum Whitepaper', desc: 'Vitalik Buterin publishes the Ethereum whitepaper, envisioning a programmable blockchain with smart contracts.', icon: '📝', algo: 'pos' },
  { year: 2014, title: 'PBFT for Blockchain', desc: 'Research groups begin adapting Castro & Liskov\'s 1999 PBFT algorithm for enterprise blockchain consensus.', icon: '🛡️', algo: 'pbft' },
  { year: 2014, title: 'Proof of Capacity Paper', desc: 'Dziembowski et al. publish foundational research on Proof of Space, establishing cryptographic theory for storage-based consensus.', icon: '💾', algo: 'poc' },
  { year: 2015, title: 'Ethereum Mainnet', desc: 'Ethereum launches with Proof of Work (Ethash). Smart contracts go live. First ERC-20 tokens emerge.', icon: 'Ξ', algo: 'pow' },
  { year: 2015, title: 'NEM Launches with PoI', desc: 'NEM blockchain launches Proof of Importance, rewarding active network participants rather than just wealth.', icon: '⭐', algo: 'poimp' },
  { year: 2016, title: 'Hyperledger Fabric', desc: 'Linux Foundation launches Hyperledger Fabric with PBFT consensus for enterprise blockchain solutions.', icon: '🏢', algo: 'pbft' },
  { year: 2016, title: 'PoET by Intel', desc: 'Intel introduces Proof of Elapsed Time using SGX secure enclaves for Hyperledger Sawtooth.', icon: '⌛', algo: 'poet' },
  { year: 2017, title: 'EOS Whitepaper', desc: 'Block.one publishes the EOS.IO whitepaper with DPoS for massive throughput (millions of TPS claimed).', icon: 'Ε', algo: 'dpos' },
  { year: 2017, title: 'Cardano Launches', desc: 'Cardano (ADA) launches with Ouroboros, the first academically peer-reviewed Proof of Stake protocol.', icon: '₳', algo: 'pos' },
  { year: 2018, title: 'EOS Mainnet', desc: 'EOS.IO mainnet launches with 21 elected block producers. DPoS achieves thousands of TPS.', icon: '⚡', algo: 'dpos' },
  { year: 2018, title: 'Solana Whitepaper', desc: 'Anatoly Yakovenko publishes the Proof of History whitepaper, introducing the VDF-based cryptographic clock.', icon: '⏰', algo: 'poh' },
  { year: 2020, title: 'Ethereum 2.0 Beacon Chain', desc: 'The Ethereum Beacon Chain goes live, beginning the transition to Proof of Stake with 500,000+ validators.', icon: '🔮', algo: 'pos' },
  { year: 2020, title: 'Solana Mainnet Beta', desc: 'Solana launches mainnet with PoH + Tower BFT, demonstrating 50,000+ TPS potential.', icon: '◎', algo: 'poh' },
  { year: 2021, title: 'Chia Network Launches', desc: 'Chia Network goes live with Proof of Space and Time. Massive demand causes global hard drive shortages.', icon: '🌱', algo: 'pospace' },
  { year: 2022, title: 'The Ethereum Merge', desc: 'Ethereum successfully transitions from PoW to PoS on September 15, 2022. Energy usage drops 99.95%.', icon: '🔀', algo: 'pos' },
  { year: 2023, title: 'Ethereum Shapella Upgrade', desc: 'Staked ETH withdrawals are enabled. Over 1 million validators actively secure the Ethereum network.', icon: '🔓', algo: 'pos' },
  { year: 2024, title: 'Bitcoin Halving', desc: 'Bitcoin\'s fourth halving reduces block rewards from 6.25 to 3.125 BTC. Mining economics shift significantly.', icon: '⚡', algo: 'pow' },
  { year: 2024, title: 'Bitcoin ETF Approval', desc: 'SEC approves spot Bitcoin ETFs, bringing institutional PoW security awareness to mainstream finance.', icon: '📈', algo: 'pow' }
];

export const QUIZ_QUESTIONS = [
  {
    q: 'Which consensus algorithm was introduced in the Bitcoin whitepaper by Satoshi Nakamoto in 2008?',
    options: ['Proof of Stake', 'Proof of Work', 'Delegated Proof of Stake', 'Proof of Authority'],
    answer: 1,
    explanation: 'Satoshi Nakamoto\'s 2008 Bitcoin whitepaper introduced Proof of Work, where miners compete by solving SHA-256 hash puzzles to add blocks to the blockchain.'
  },
  {
    q: 'What is the "Byzantine Generals Problem" in the context of blockchain consensus?',
    options: [
      'A problem with encrypting Byzantine-era historical data',
      'The challenge of achieving agreement in a distributed system where some participants may act maliciously',
      'A scaling problem specific to the Byzantine Empire\'s ancient record-keeping',
      'A hardware vulnerability in Byzantine fault-tolerant servers'
    ],
    answer: 1,
    explanation: 'The Byzantine Generals Problem (Lamport, Shostak, Pease, 1982) describes the challenge of reaching distributed consensus when some nodes may send contradictory, malicious, or faulty messages.'
  },
  {
    q: 'In Proof of Stake, what mechanism prevents validators from voting for multiple conflicting blocks ("Nothing at Stake" problem)?',
    options: ['Mining difficulty adjustment', 'Slashing conditions', 'Block reward halving', 'ASIC resistance'],
    answer: 1,
    explanation: 'Slashing destroys a portion (or all) of a misbehaving validator\'s staked collateral if they sign two conflicting blocks for the same slot, making the attack economically destructive.'
  },
  {
    q: 'What is the maximum fraction of Byzantine (malicious) nodes that PBFT can tolerate while maintaining correct consensus?',
    options: ['Less than 1/4', 'Less than 1/3', 'Less than 1/2', 'Less than 2/3'],
    answer: 1,
    explanation: 'PBFT can tolerate at most f Byzantine nodes in a network of n ≥ 3f + 1 total nodes — meaning fewer than 1/3 of participants can be malicious while consensus is maintained.'
  },
  {
    q: 'Which consensus algorithm uses Intel SGX secure hardware to generate cryptographically random wait timers for fair leader election?',
    options: ['Proof of Authority', 'Proof of Elapsed Time', 'Proof of History', 'Proof of Burn'],
    answer: 1,
    explanation: 'Proof of Elapsed Time (PoET), developed by Intel for Hyperledger Sawtooth, uses SGX secure enclaves to generate provably random sleep timers. The node that sleeps least earns block creation rights.'
  },
  {
    q: 'In Delegated Proof of Stake (DPoS), how many active block producers does EOS have?',
    options: ['7', '21', '100', '500'],
    answer: 1,
    explanation: 'EOS uses 21 active block producers elected by token holders via DPoS. These 21 producers rotate through a schedule to produce blocks every 0.5 seconds.'
  },
  {
    q: 'What significant event happened to Ethereum on September 15, 2022?',
    options: [
      'Ethereum launched its mainnet for the first time',
      'Ethereum launched sharding with 64 shard chains',
      'Ethereum merged its PoW execution layer with the PoS Beacon Chain, eliminating mining',
      'Ethereum was hacked and lost 3 million ETH'
    ],
    answer: 2,
    explanation: 'The Merge was Ethereum\'s transition from Proof of Work to Proof of Stake, combining the original PoW mainnet with the Beacon Chain. Energy usage dropped by approximately 99.95%.'
  },
  {
    q: 'What is Proof of History\'s core innovation in Solana\'s consensus design?',
    options: [
      'A new cryptographic hash function faster than SHA-256',
      'A Verifiable Delay Function creating a cryptographic clock to prove event ordering without coordination',
      'A new type of staking mechanism requiring history of past transactions',
      'A proof that validators have been online for a minimum history period'
    ],
    answer: 1,
    explanation: 'PoH uses a recursive SHA-256 VDF to create a cryptographic timeline. Each hash output feeds into the next, creating an ordered, verifiable sequence that proves when transactions occurred without requiring network-wide time synchronization.'
  },
  {
    q: 'Which blockchain uses Proof of Authority with 101 verified Authority Masternodes for supply chain management?',
    options: ['Hyperledger Fabric', 'VeChain', 'Binance Smart Chain', 'Avalanche'],
    answer: 1,
    explanation: 'VeChain uses PoA 2.0 with 101 Authority Masternodes whose real-world identities are verified by the VeChain Foundation. This enables accountability and high TPS for enterprise supply chain applications.'
  },
  {
    q: 'What is the "Blockchain Trilemma" as described by Vitalik Buterin?',
    options: [
      'The three main cryptocurrencies: Bitcoin, Ethereum, and Litecoin',
      'The impossibility of simultaneously achieving Security, Scalability, and Decentralization',
      'The three consensus algorithms: PoW, PoS, and DPoS',
      'Three types of blockchain networks: public, private, and consortium'
    ],
    answer: 1,
    explanation: 'Vitalik Buterin coined the Blockchain Trilemma: no blockchain can simultaneously optimize for Security, Scalability, AND Decentralization. Achieving two typically comes at the cost of the third.'
  },
  {
    q: 'In Proof of Work, what does "nonce" refer to?',
    options: [
      'The number of coins rewarded per block',
      'A number miners increment when trying to find a valid block hash',
      'The network\'s official confirmation number',
      'A cryptographic key used to sign blocks'
    ],
    answer: 1,
    explanation: 'The nonce (number used once) is a 32-bit field in the block header that miners systematically increment in billions of attempts to find a hash output below the network\'s difficulty target.'
  },
  {
    q: 'Which consensus mechanism in Proof of Burn requires sending cryptocurrency to an unspendable address?',
    options: [
      'Sending coins to a known exchange address',
      'Sending coins to an address with no known private key (e.g., null address)',
      'Locking coins in a time-locked smart contract',
      'Converting coins to another cryptocurrency permanently'
    ],
    answer: 1,
    explanation: 'In PoB, coins are sent to provably unspendable addresses — typically a null address or hash of "eater" strings — ensuring the coins can never be recovered, creating a permanent economic sacrifice.'
  },
  {
    q: 'What is the primary smart contract language used on Ethereum?',
    options: ['Rust', 'Go', 'Solidity', 'Python'],
    answer: 2,
    explanation: 'Solidity is Ethereum\'s primary smart contract language — a statically-typed, JavaScript-influenced language designed specifically for the EVM (Ethereum Virtual Machine). Vyper is a secondary option.'
  },
  {
    q: 'Which blockchain platform primarily uses Rust as its smart contract language?',
    options: ['Ethereum', 'Cardano', 'Solana', 'EOS'],
    answer: 2,
    explanation: 'Solana programs (smart contracts) are primarily written in Rust, compiled to BPF (Berkeley Packet Filter) bytecode. The Anchor framework simplifies Solana development in Rust.'
  },
  {
    q: 'What Layer classification is the Lightning Network?',
    options: ['Layer 0', 'Layer 1', 'Layer 2', 'Layer 3'],
    answer: 2,
    explanation: 'Lightning Network is a Layer 2 solution built on Bitcoin. It creates off-chain payment channels between parties, enabling instant micropayments with fees settled on Bitcoin\'s Layer 1 when channels close.'
  },
  {
    q: 'In Proof of Importance (PoI) by NEM, which of these factors contributes to an account\'s importance score?',
    options: [
      'Amount of electricity consumed by the node',
      'Number of blocks mined in the past year',
      'Vested balance, transaction volume, and network graph centrality',
      'Geographic diversity of connected peers'
    ],
    answer: 2,
    explanation: 'NEM\'s PoI calculates importance from: (1) minimum vested balance of 10,000 XEM, (2) transaction volume over 30 days, and (3) PageRank-style network centrality measuring who you transact with.'
  },
  {
    q: 'Which consensus algorithm requires a minimum of 2/3 + 1 validator agreement to finalize a block?',
    options: ['Proof of Work', 'Proof of Capacity', 'Practical Byzantine Fault Tolerance (PBFT)', 'Proof of Authority'],
    answer: 2,
    explanation: 'PBFT requires 2f+1 matching messages (where n ≥ 3f+1 nodes), ensuring more than 2/3 of all nodes agree. This threshold guarantees Byzantine fault tolerance against up to 1/3 malicious nodes.'
  },
  {
    q: 'What is a "Merkle Tree" in blockchain context?',
    options: [
      'A tree data structure for storing validator identities',
      'A binary hash tree where each leaf is a transaction hash and each parent is a hash of its children, enabling efficient verification',
      'A type of consensus tree showing validator hierarchies',
      'A network topology diagram showing node connections'
    ],
    answer: 1,
    explanation: 'A Merkle tree (hash tree) allows efficient, tamper-evident verification of large transaction sets. The root hash (Merkle Root) in a block header represents all transactions, allowing SPV (Simplified Payment Verification) without downloading full blocks.'
  },
  {
    q: 'What problem did Proof of Capacity (PoC) face at the launch of Chia Network in 2021?',
    options: [
      'Smart contract vulnerabilities leading to fund losses',
      'Massive global hard drive shortages as farmers bought storage for plotting',
      'Network outages due to too many validators',
      '51% attack attempts by mining pools'
    ],
    answer: 1,
    explanation: 'Chia\'s mainnet launch in April 2021 caused global hard drive and SSD shortages as investors bought up storage for "farming" plots. Prices for HDDs and SSDs increased 2-3x in major markets.'
  },
  {
    q: 'Which Layer 0 protocol connects multiple sovereign blockchains using the Inter-Blockchain Communication (IBC) protocol?',
    options: ['Lightning Network', 'Polkadot', 'Cosmos', 'Ethereum'],
    answer: 2,
    explanation: 'Cosmos uses the Inter-Blockchain Communication (IBC) protocol to connect independent blockchains (called "zones") through a Hub, enabling trustless asset and data transfer across sovereign chains.'
  }
];

export const ALGO_ORDER = ['pow', 'pos', 'dpos', 'pbft', 'poa', 'poh', 'pob', 'poc', 'poet', 'poact', 'pospace', 'poimp'];
