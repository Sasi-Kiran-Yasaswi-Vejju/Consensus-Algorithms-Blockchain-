# Consensus Algorithms in Blockchain — Interactive Comparative Explorer

<div align="center">

![Project Banner](docs/screenshots/banner.png)

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://pages.github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6_Modules-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?logo=chartdotjs&logoColor=white)](https://chartjs.org)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com)

**A professional, fully responsive, single-page educational web application exploring blockchain consensus mechanisms through interactive visualizations, simulations, and gamified learning.**

[🚀 Live Demo](https://yourusername.github.io/consensus-algorithms-blockchain-explorer) · [📖 Documentation](docs/) · [🐛 Report Bug](issues) · [💡 Request Feature](issues)

</div>

---

## 📸 Screenshots

| Hero Section | Algorithm Explorer | Consensus Simulator |
|:---:|:---:|:---:|
| ![Hero](docs/screenshots/hero.png) | ![Explorer](docs/screenshots/explorer.png) | ![Simulator](docs/screenshots/simulator.png) |

| Blockchain Trilemma | Compatibility Matrix | Quiz |
|:---:|:---:|:---:|
| ![Trilemma](docs/screenshots/trilemma.png) | ![Matrix](docs/screenshots/matrix.png) | ![Quiz](docs/screenshots/quiz.png) |

---

## ✨ Features

### 🎓 Educational Content
- **12 Consensus Algorithms** with full technical deep-dives:
  - Proof of Work (PoW), Proof of Stake (PoS), Delegated Proof of Stake (DPoS)
  - Practical Byzantine Fault Tolerance (PBFT), Proof of Authority (PoA)
  - Proof of History (PoH), Proof of Burn (PoB), Proof of Capacity (PoC)
  - Proof of Elapsed Time (PoET), Proof of Activity, Proof of Space, Proof of Importance
- **Blockchain Fundamentals** — 12 core concepts with animated workflows
- **Byzantine Generals Problem** explanation with visual mapping
- **Blockchain Layer Classification** — L0/L1/L2/L3 interactive diagram

### 📊 Interactive Visualizations
- **Blockchain Trilemma Dashboard** — Radar charts with per-algorithm scoring
- **Algorithm Comparison Dashboard** — Side-by-side radar + bar charts
- **Compatibility Matrix** — Heatmap with clickable cells and comparison modals
- **All-Algorithm Bar Chart** — Security, scalability, decentralization scores
- **Interactive Timeline** — 24 events from 2008 to 2024 with modals

### 🎮 Interactive Tools
- **Consensus Simulator** — Step-by-step animated workflows for PoW, PoS, DPoS, PBFT, PoA
  - Start / Pause / Step / Reset controls
  - Real-time simulation log terminal
- **Knowledge Quiz** — 20 MCQs with:
  - 30-second per-question countdown timer
  - Progress bar, live scoring, answer explanations
  - Grade letter, missed question review, restart
- **Search & Filters** — Real-time filtering by consensus, layer, blockchain name
- **Global Algorithm Selector** — Updates all sections simultaneously

### 💎 UI/UX Excellence
- **Glassmorphism Design** — backdrop-filter blur with translucent cards
- **Animated Hero Background** — Canvas-based blockchain network particle animation
- **Dark / Light Mode** — Persistent theme toggle with smooth transitions
- **Scroll Progress Bar** — Top gradient progress indicator
- **Scroll Animations** — IntersectionObserver-powered fade-in effects
- **Fully Responsive** — Mobile, tablet, and desktop layouts
- **Accessibility** — ARIA labels, semantic HTML5, keyboard navigation

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|:---|:---:|:---|
| HTML5 | — | Structure and semantic markup |
| CSS3 | — | Glassmorphism, animations, custom properties |
| JavaScript | ES6+ | ES6 Modules, Canvas API, IntersectionObserver |
| Chart.js | 4.4.1 | Radar, bar, and comparison charts |
| Bootstrap | 5.3.2 | Grid system, responsive utilities |
| Font Awesome | 6.5.0 | Icon library |
| Google Fonts | — | Inter + JetBrains Mono typefaces |

**Zero build tools required** — runs directly in any modern browser.

---

## 📁 Project Structure

```
consensus-algorithms-blockchain-explorer/
│
├── index.html                    # Main SPA entry point
├── README.md                     # Project documentation
├── LICENSE                       # MIT License
├── .gitignore                    # Git ignore rules
│
├── css/
│   ├── variables.css             # Design tokens (colors, gradients, spacing)
│   ├── style.css                 # Main styles + glassmorphism + components
│   └── responsive.css            # Breakpoints, mobile, print, a11y
│
├── js/
│   ├── app.js                    # Main controller (hero, explorer, cards, layers)
│   ├── data.js                   # All application data (algorithms, blockchains)
│   ├── charts.js                 # Chart.js visualizations module
│   ├── filters.js                # Search & filter functionality
│   ├── compatibility.js          # Heatmap matrix + modals
│   ├── simulator.js              # Consensus process animation engine
│   ├── quiz.js                   # 20-MCQ quiz engine with timer
│   └── timeline.js               # Interactive blockchain history timeline
│
├── assets/
│   ├── images/                   # Project images
│   ├── icons/                    # Custom icons
│   └── logos/                    # Blockchain logos
│
└── docs/
    ├── screenshots/              # Application screenshots
    ├── diagrams/                 # Architecture diagrams
    └── architecture.png          # System architecture overview
```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- No Node.js, npm, or build tools required

### Installation

**Option 1: Clone & Open**
```bash
git clone https://github.com/<username>/consensus-algorithms-blockchain-explorer.git
cd consensus-algorithms-blockchain-explorer
# Open index.html in your browser
start index.html         # Windows
open index.html          # macOS
xdg-open index.html      # Linux
```

**Option 2: Local Dev Server (recommended for ES6 Modules)**
```bash
# Using Python
python -m http.server 8080

# Using Node.js http-server
npx -y http-server . -p 8080

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit: **http://localhost:8080**

---

## 📘 Usage Guide

### Exploring Consensus Algorithms
1. Navigate to the **Algorithm Explorer** section
2. Click any algorithm pill (PoW, PoS, DPoS, PBFT, etc.)
3. All sections update automatically:
   - Overview, mechanism, and step-by-step explanation
   - Performance metrics and pros/cons
   - Trilemma radar chart
   - Blockchain implementation cards

### Running the Simulator
1. Go to **Consensus Simulator**
2. Select an algorithm (PoW, PoS, DPoS, PBFT, PoA)
3. Click **Start** for auto-play, **Step** for manual advance
4. Watch the simulation log for real-time technical details

### Comparing Algorithms
1. Navigate to **Algorithm Comparison**
2. Select Algorithm A and Algorithm B from dropdowns
3. View side-by-side radar charts, bar charts, and metric cards

### Taking the Quiz
1. Go to **Knowledge Quiz**
2. Click **Start Quiz**
3. Answer 20 questions within the 30-second timer each
4. View your score, grade, and missed question review

---

## 🌐 Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "feat: initial commit — consensus algorithms explorer"
git branch -M main
git remote add origin https://github.com/<username>/consensus-algorithms-blockchain-explorer.git
git push -u origin main
# Enable GitHub Pages in Settings → Pages → Deploy from main branch / root
```

### Netlify
```bash
# Drag and drop the project folder to app.netlify.com/drop
# OR connect GitHub repository for auto-deploy
```

### Vercel
```bash
npx -y vercel --prod
# Follow prompts — no build command needed, output directory is root (.)
```

---

## 🗺️ Covered Content

### Consensus Algorithms (12 total)
| # | Algorithm | Acronym | Key Blockchain |
|---|---|---|---|
| 1 | Proof of Work | PoW | Bitcoin |
| 2 | Proof of Stake | PoS | Ethereum |
| 3 | Delegated Proof of Stake | DPoS | EOS, TRON |
| 4 | Practical Byzantine Fault Tolerance | PBFT | Hyperledger Fabric |
| 5 | Proof of Authority | PoA | VeChain |
| 6 | Proof of History | PoH | Solana |
| 7 | Proof of Burn | PoB | Slimcoin |
| 8 | Proof of Capacity | PoC | Chia, Burstcoin |
| 9 | Proof of Elapsed Time | PoET | Hyperledger Sawtooth |
| 10 | Proof of Activity | PoAct | Decred |
| 11 | Proof of Space | PoSpace | Chia, Spacemesh |
| 12 | Proof of Importance | PoI | NEM |

### Key Sections
- ✅ Blockchain Fundamentals (12 concepts)
- ✅ Byzantine Generals Problem
- ✅ Consensus Workflow Animation
- ✅ Interactive Algorithm Explorer
- ✅ Blockchain Trilemma Dashboard
- ✅ Real-world Blockchain Cards (10 networks)
- ✅ Smart Contract Language Mapping (9 blockchains)
- ✅ Layer 0/1/2/3 Classification
- ✅ 9×9 Compatibility Heatmap Matrix
- ✅ Algorithm Comparison Dashboard
- ✅ Consensus Simulator (5 algorithms)
- ✅ Search & Real-time Filters
- ✅ Interactive Timeline (24 events)
- ✅ 20-Question Quiz with Timer
- ✅ References & Resources

---

## 🔮 Future Enhancements

- [ ] 3D network topology visualization using Three.js
- [ ] Live blockchain data integration (CoinGecko API)
- [ ] User progress tracking with localStorage
- [ ] Exportable comparison reports (PDF)
- [ ] Additional consensus algorithms (Avalanche, Algorand, Tendermint)
- [ ] Multi-language support (internationalization)
- [ ] WebAssembly PoW mining demonstration
- [ ] Backend API for dynamic data updates
- [ ] Accessibility audit and WCAG 2.1 AA compliance
- [ ] Performance optimization with lazy loading

---

## 📚 References

1. Nakamoto, S. (2008). *Bitcoin: A Peer-to-Peer Electronic Cash System*. [bitcoin.org](https://bitcoin.org/bitcoin.pdf)
2. Castro, M. & Liskov, B. (1999). *Practical Byzantine Fault Tolerance*. OSDI.
3. Buterin, V. (2013). *Ethereum Whitepaper*. [ethereum.org](https://ethereum.org)
4. Kiayias, A. et al. (2017). *Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol*. CRYPTO 2017.
5. Yakovenko, A. (2018). *Solana: A new architecture for a high performance blockchain v0.8.13*. [solana.com](https://solana.com)
6. Larimer, D. (2013). *Transactions as Proof-of-Stake*. BitShares whitepaper.
7. Linux Foundation. (2016). *Hyperledger Fabric Documentation*. [hyperledger.org](https://hyperledger-fabric.readthedocs.io)
8. Buterin, V. (2021). *Why sharding is great: demystifying the technical properties*. [vitalik.eth.limo](https://vitalik.eth.limo)
9. Cohen, B. & Pietrzak, K. (2019). *The Chia Network Blockchain*. [chia.net](https://chia.net)
10. NEM Foundation. (2015). *NEM Technical Reference*. [nem.io](https://docs.nem.io)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

Built as a comprehensive university-level blockchain education project.

> **Note:** This is an educational resource. All blockchain data is accurate as of the last update but may change as networks evolve. Always verify with official documentation for production use.

---

<div align="center">

**⭐ Star this repository if it helped you understand blockchain consensus!**

Made with ❤️ and ⛓️

</div>
