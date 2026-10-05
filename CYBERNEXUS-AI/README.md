# CYBERNEXUS AI

### AI-Powered Continuous Cyber Risk Quantification and Investment Optimization Platform
**Smart India Hackathon (SIH) Demonstration Prototype**

> **"From Cyber Risk Ratings to Financial Decision Intelligence."**  
> *"Know your cyber exposure. Understand what drives it. Invest where it matters most."*

---

## 1. Executive Summary & Problem Statement

### The Problem
Traditional enterprise cybersecurity produces qualitative risk heatmaps (Red / Amber / Green) and raw vulnerability tallies:
```text
Critical Vulnerability Found → "HIGH RISK"
```
When presented to the Board of Directors and Chief Financial Officer (CFO), this raises fundamental questions that legacy security tools cannot answer:
1. *"How much money (in Rupees) are we actually exposed to if this is breached?"*
2. *"What is our Expected Annual Loss (EAL) across core banking assets?"*
3. *"Where should we spend our next ₹1 Crore to achieve the highest measurable risk reduction?"*

### The Solution: CYBERNEXUS AI
CYBERNEXUS AI continuously ingests synthetic security telemetry across vulnerability scanners, SIEM logs, IAM identity directories, and EDR agents, translating raw technical flaws into defensible financial exposure in Indian Rupees (₹ Crore / ₹ Lakh). It models threat attack paths, simulates "what-if" security interventions, and executes a **0/1 Knapsack Dynamic Programming algorithm** to optimize capital allocation under any budget cap.

```text
SECURITY TELEMETRY (Qualys, Splunk, Azure AD, CrowdStrike)
        ↓
DATA NORMALIZATION & INGESTION
        ↓
ASSET CRITICALITY & DEPENDENCY MODEL
        ↓
VULNERABILITY + THREAT + CONTROL ANALYSIS
        ↓
AI RISK ENGINE (Likelihood = Vuln×0.3 + Threat×0.2 + Exposure×0.2 + Weakness×0.2 + Exploit×0.1)
        ↓
FINANCIAL IMPACT MODEL (Downtime + Breach + Recovery + Regulatory + Disruption + Reputation)
        ↓
EXPECTED ANNUAL LOSS (EAL = Probability × Financial Impact)
        ↓
TOP RISK DRIVERS & ATTACK PATHS
        ↓
CYBER RISK WHAT-IF SIMULATOR
        ↓
0/1 KNAPSACK INVESTMENT OPTIMIZER (ROSI Maximization)
        ↓
EXECUTIVE DECISION SUPPORT & REGULATORY SIGN-OFF (RBI, SEBI, NIST, ISO)
```

---

## 2. Absolute Cost Requirement (Zero-Cost Verification)

**The prototype uses only free and open-source software and synthetic enterprise telemetry. No paid APIs, cloud subscriptions, paid databases, or external billing services are required.**

- **AI Engine:** Deterministic rule-based and statistical natural language query engine that runs 100% locally.
- **Financial Risk Modeling:** Log-normal Value-at-Risk (Cyber VaR) and FAIR-inspired loss exceedance mathematical formulas.
- **Optimization:** Dynamic programming 0/1 knapsack algorithm maximizing Return on Security Investment (ROSI).
- **External Dependencies:** Zero paid SaaS, OpenAI, Gemini, Claude, AWS, Azure, or Firebase credentials needed.

---

## 3. Implemented Modules (13 Core Sections)

1. **Executive Overview Dashboard**: High-level KPI cards (Enterprise Cyber Risk 78/100, Total Exposure ₹18.4 Cr, EAL ₹7.8 Cr, Reduction Opp ₹5.2 Cr, Investment ₹2.0 Cr, ROSI 260%), 6-month historical exposure trend chart, and Cyber VaR confidence thresholds (90%, 95%, 99%).
2. **Financial Risk Engine (Risk Quantification)**: Explainable breakdown of Incident Likelihood, component-level financial impact (Downtime: ₹2.5 Cr, Data Breach: ₹3.0 Cr, Recovery: ₹1.2 Cr, Regulatory: ₹0.8 Cr, Disruption: ₹1.5 Cr, Reputation: ₹0.7 Cr = ₹9.7 Cr baseline), and asset-level loss registry.
3. **Top Risk Drivers**: Horizontal bar chart identifying the top five root causes contributing to exposure (e.g., Privileged accounts without MFA at ₹2.4 Cr, Core Banking API deserialization at ₹1.8 Cr) with drill-down into affected assets.
4. **Attack Path Visualization**: Interactive multi-hop progression graph (*Internet → Public Web API → Vulnerability → App Server → Privileged Account → Customer Database → Financial Impact*) with live "Simulate Path Severance" toggles.
5. **Enterprise Asset Inventory**: Directory of 10 Tier-1 banking systems (Core Banking API, Customer Database, Payment Gateway, Employee IAM, SWIFT Node, KYC Cloud Storage, Endpoint Fleet, etc.) with criticality ratings, ownership, and risk attribution.
6. **Vulnerability Matrix**: Detailed vulnerability registry with CVE IDs, CVSS scores, EPSS probabilities, exploit statuses, and rupee risk contribution.
7. **Control Effectiveness Dashboard**: Defense-in-depth evaluations of MFA, Patch Management, Zero-Trust Micro-segmentation, EDR Fleet, CSPM, and Immutable Backups.
8. **AI Mitigation Recommendations**: Prioritized, explainable recommendations featuring implementation cost, expected risk reduction, and ROSI percentage.
9. **Cyber Risk What-If Simulator**: Interactive decision workbench with 6 pre-configured scenarios (e.g., *Enable Privileged MFA*, *Patch Critical CVEs*, *Delay Remediation by 30 Days*) displaying dynamic *Before vs. After* exposure diffs.
10. **Security Investment Optimizer**: 0/1 Knapsack capital allocator allowing users to input any budget (e.g., ₹50 Lakh, ₹1 Crore, ₹2 Crore) and automatically discover the highest-ROSI combination of security controls, alongside an investment vs. risk curve showing the optimal frontier.
11. **Compliance & Framework Mapping**: Real-time readiness tracking across **NIST CSF 2.0 (86%)**, **ISO/IEC 27001 (81%)**, **CIS Controls v8 (78%)**, **RBI Cyber Security Framework for Banks (84%)**, and **SEBI CSCRF (80%)**.
12. **Executive Cyber Risk Reports**: Board-ready executive briefings with one-click print/PDF layout.
13. **Security Data Sources**: Connectivity dashboard for simulated telemetry feeds (Qualys VMDR, Splunk SIEM, Azure AD, CrowdStrike Falcon, Wiz CSPM, ServiceNow CMDB, Mandiant OTX) with a live **"Refresh Telemetry"** stream ingestion trigger.

---

## 4. Key SIH Demonstration Walkthrough (3–5 Minutes)

Judges can evaluate the end-to-end value proposition in under 4 minutes using the integrated **"Run Executive Demo"** button:

1. **Step 1 — The Problem**: Traditional qualitative tools say *"High Risk"*, but the Board needs to know financial exposure in Rupees.
2. **Step 2 — Baseline Exposure**: Observe Nexa Financial Services' baseline: **₹18.4 Cr Exposure** and **₹7.8 Cr Expected Annual Loss**.
3. **Step 3 — Top Risk Driver**: Identify that **Privileged Accounts Without MFA** contributes ₹2.4 Cr downstream exposure into customer databases.
4. **Step 4 — Attack Path**: Trace the attack path from the internet DMZ to the customer database.
5. **Step 5 — What-If Simulator**: Select *"Enable MFA for all privileged accounts"*. Watch exposure drop from ₹18.4 Cr to ₹15.2 Cr (saving **₹3.2 Cr** for only ₹35 Lakh cost; ROSI: 814%).
6. **Step 6 — Investment Optimizer**: Set available budget to **₹1 Crore**. The 0/1 knapsack engine funds *Privileged MFA (₹35 L)* + *Critical Patch Program (₹25 L)* + *Cloud Hardening (₹20 L)* = **₹80 Lakh Cost**, generating **₹3.4 Cr in Risk Reduction** with a **325% ROSI** (₹1 invested protects ₹4.25 in risk).
7. **Step 7 — Regulatory Compliance**: Observe how the same ₹80 Lakh investment elevates RBI and SEBI framework compliance from 82% to over 91%.

---

## 5. Technology Stack & Local Execution

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js, Express.js.
- **Build Tool**: Vite.
- **Architecture**: Express REST API server running on port 3000 mounting Vite middleware in development (`tsx server.ts`).

### Quick Start Commands

You can run CYBERNEXUS AI in either unified full-stack mode or with separate standalone frontend and backend processes:

#### Option A: Unified Full-Stack (Default AI Studio & Dev Mode)
```bash
# 1. Install dependencies
npm install

# 2. Start unified full-stack server (Express REST API + Vite on port 3000)
npm run dev

# 3. Open in browser: http://localhost:3000
```

#### Option B: Standalone Frontend & Backend Execution
The repository is organized with dedicated `frontend/` and `backend/` directories:
```bash
# Terminal 1 — Start Backend API Server (Port 5000)
cd backend
npm install
npm run dev

# Terminal 2 — Start Frontend Application (Port 3000)
cd frontend
npm install
npm run dev
```

---

## 6. Project Architecture & Directory Layout

```text
CYBERNEXUS-AI/
│
├── frontend/                     # Dedicated React/Vite Frontend
│   ├── src/
│   │   ├── components/           # UI Components (Navbar, Sidebar, Modals, Drawer, Cards)
│   │   ├── pages/                # 13 Application Views (Overview, Risk, Investment, etc.)
│   │   ├── services/             # Resilient REST API Client (api.ts)
│   │   ├── types/                # Frontend TypeScript Interfaces
│   │   ├── data/                 # Demo Mock & Constant Data
│   │   ├── utils/                # Currency & Percentage Formatters
│   │   ├── App.tsx               # Primary React App Component
│   │   ├── main.tsx              # Vite DOM Mount Entry
│   │   └── index.css             # Tailwind Theme & Typography
│   ├── index.html                # Frontend HTML Entry
│   ├── vite.config.ts            # Vite Build & Proxy Configuration
│   ├── tsconfig.json             # Frontend TypeScript Configuration
│   └── package.json              # Frontend Dependencies
│
├── backend/                      # Dedicated Express.js Backend
│   ├── src/
│   │   ├── routes/               # Express REST API Endpoints (/api/*)
│   │   ├── services/             # 7 Engines (Risk, Financial, Knapsack, Scenarios, AI, Compliance)
│   │   ├── models/               # Domain Models & Type Definitions
│   │   ├── data/                 # Synthetic Enterprise Telemetry & Seed Data
│   │   └── server.ts             # Express Server Entry (Port 5000)
│   ├── tsconfig.json             # Backend TypeScript Configuration
│   └── package.json              # Backend Dependencies
│
├── server.ts                     # Root Unified Full-Stack Dev & Preview Entry
└── README.md                     # Platform Documentation
```

---

## 6. The 5 Core SIH Value Pillars

1. **CONTINUOUS**: Risk scores update dynamically as new telemetry is ingested.
2. **QUANTIFIED**: Risk is articulated in Indian Rupee (₹ Cr) financial exposure.
3. **EXPLAINABLE**: Every metric includes a `"Why?"` button revealing step-by-step mathematical derivations.
4. **ACTIONABLE**: AI recommendations prioritize specific projects rather than generic advice.
5. **OPTIMIZED**: Security spending is prioritized through 0/1 knapsack mathematical optimization.

---

*CYBERNEXUS AI — Smart India Hackathon Prototype · Nexa Financial Services Simulated Enterprise Environment*
