# TerraProof AI 🛰️🌲
### AI-Powered Carbon-Credit Integrity & Dynamic Satellite MRV System
*Built for the IEEE ClimateChain Hackathon*

TerraProof AI solves the twin integrity crises plaguing voluntary carbon markets:
1. **Pre-Issuance Double-Counting & Overcrediting:** Project developers submitting overlapping or duplicated parcel claims under different registries.
2. **Post-Issuance Environmental Shocks (Permanence Risk):** Carbon credits issued for 20 years with zero real-time verification when catastrophic wildfires or illegal clear-cutting decimate the forest canopy.

TerraProof AI introduces **Canonical Geo-Polygon Normalization**, an on-chain **ERC-1155 Multi-Token Registry** (`TerraProofRegistry.sol`), and an **EIP-712 Satellite Oracle** that dynamically freezes credits if environmental health degrades below critical thresholds.

---

## 📁 Monorepo Structure

```
TerraProof AI/
├── contracts/               # Solidity Smart Contracts (Hardhat + OpenZeppelin)
│   ├── contracts/
│   │   └── TerraProofRegistry.sol   # ERC-1155, EIP-712 Oracle, Duplicate Parcel Shield
│   ├── ignition/modules/
│   │   └── deploy.js                # Hardhat Ignition deployment script
│   ├── test/
│   │   └── TerraProofRegistry.test.js # Unit test suite (7 passing tests)
│   ├── hardhat.config.js            # Solidity 0.8.20 / 0.8.24 Cancun config
│   └── package.json
│
├── backend/                 # Python FastAPI AI MRV & Geo-Engine
│   ├── geo_normalizer.py    # Canonical polygon sorting (4 decimals) & Keccak-256 hash
│   ├── main.py              # FastAPI endpoints for PDF/JSON analysis & EIP-712 signing
│   ├── requirements.txt     # fastapi, uvicorn, pydantic, eth-account, httpx
│   └── venv/                # Local virtual environment
│
└── frontend/                # React + Vite + Tailwind CSS Dashboard
    ├── src/
    │   ├── App.jsx          # Split-screen UI: Upload MRV & Satellite Scorecard
    │   ├── index.css        # Glassmorphic dark styling & radar animations
    │   └── main.jsx
    ├── index.html
    ├── tailwind.config.js
    └── package.json
```

---

## ⚡ Quick Start Guide

### 1. Smart Contracts (`contracts/`)
```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```
*Deploy to Sepolia:*
```bash
npx hardhat ignition deploy ignition/modules/deploy.js --network sepolia
```

### 2. Backend API (`backend/`)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
- Interactive Swagger Docs: `http://localhost:8000/docs`
- Endpoint `POST /api/project/analyze`: Accepts polygon coordinates and returns Trust Score + canonical hash.
- Endpoint `POST /api/oracle/sign-observation`: Signs EIP-712 satellite observation.

### 3. Frontend Dashboard (`frontend/`)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` to interact with the split-screen dashboard:
- **Left Panel:** Upload project documents, inspect parcel vertices, and generate the anti-double-mint parcel hash.
- **Right Panel:** Switch satellite sensor overlays (Optical, NDVI, Thermal), view the AI Trust Scorecard, simulate a wildfire shock (< 50 health), and click **"Mint Verified Credit"** ready for ethers.js / wagmi integration.

---

## 🛡️ Core Innovation

### 1. Canonical Polygon Normalization (`geo_normalizer.py`)
```
Input Polygon Vertices -> Round to 4 decimals (~11m resolution)
                      -> Canonical Lexicographical Sort
                      -> Keccak-256 / SHA-256 Hash
                      -> bytes32 parcelHash on-chain
```
If an actor attempts to re-register the same forest block under another project name or inverted coordinate order, `TerraProofRegistry.sol` reverts with `"Parcel already registered"`.

### 2. Dynamic Post-Issuance Risk Monitoring (`submitSatelliteObservation`)
- High-resolution satellites (Sentinel-2 / Landsat-9) calculate ongoing NDVI & canopy density.
- An authorized AI Oracle signs the observation via **EIP-712**.
- When `healthScore < 50` (wildfire or illegal logging), the contract automatically sets `batch.status = BatchStatus.Frozen` and `retirementEligible = false`, blocking transfers and retirements until remediation.
