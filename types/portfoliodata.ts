import type { PortfolioData } from "@/types/portfolio";

export const PORTFOLIO_DATA: PortfolioData = {
  assetClasses: [
    {
      name: "Cash",
      value: 5.37,
      color: "#26c6a6",
      categories: [
        {
          name: "Cash ETF", value: 98, color: "#26c6a6",
          products: [
            { name: "Nippon India ETF Liquid BeES", value: 60, cost: 12.60, marketValue: 12.70, income: 0, gainLoss: 0.10, gainPct: 0.79, irr: 0 },
            { name: "HDFC Overnight ETF", value: 40, cost: 8.20, marketValue: 8.30, income: 0, gainLoss: 0.10, gainPct: 1.22, irr: 0 },
          ],
        },
        {
          name: "Cash MF", value: 2, color: "#4dd0c4",
          products: [
            { name: "SBI Liquid Fund", value: 55, cost: 11.50, marketValue: 12.00, income: 0, gainLoss: 0.50, gainPct: 4.35, irr: 12 },
            { name: "Mirae Asset Cash Mgmt", value: 45, cost: 9.80, marketValue: 10.37, income: 0, gainLoss: 0.57, gainPct: 5.82, irr: 12 },
          ],
        },
      ],
      securities: [
        { name: "Cash ETF", pct: "98%", cost: "₹12.60 Cr", mv: "₹1.26 Cr", income: "₹0", gl: "₹0", glPct: "0.00%", irr: "0", isChild: true },
        { name: "Cash MF", pct: "2%", cost: "₹22.17 Cr", mv: "₹23.37 Cr", income: "₹0", gl: "₹1.20 Cr", glPct: "5.45%", irr: "12%", isChild: true },
      ],
      totalCost: "₹22.17 Cr", totalMV: "₹23.37 Cr", totalIncome: "₹0",
      totalGL: "₹1.20 Cr", totalGLPct: "5.45%", totalIRR: "12%",
    },
    {
      name: "Fixed Income",
      value: 34.30,
      color: "#2196f3",
      categories: [
        {
          name: "Fixed Income MF", value: 8, color: "#2196f3",
          products: [
            { name: "HDFC Short Term Debt Fund", value: 50, cost: 0.17, marketValue: 0.175, income: 0, gainLoss: 0.005, gainPct: 2.94, irr: 11.5 },
            { name: "Axis Banking & PSU Debt", value: 50, cost: 0.17, marketValue: 0.175, income: 0, gainLoss: 0.005, gainPct: 2.94, irr: 11.5 },
          ],
        },
        {
          name: "High Yield AIF", value: 42, color: "#1565c0",
          products: [
            { name: "Edelweiss Alternative Equity", value: 55, cost: 9.34, marketValue: 10.26, income: 0.63, gainLoss: 0.15, gainPct: 9.25, irr: 11.5 },
            { name: "Kotak Special Situations", value: 45, cost: 7.64, marketValue: 8.40, income: 0.52, gainLoss: 0.13, gainPct: 8.42, irr: 11.5 },
          ],
        },
        {
          name: "REIT / InvIT", value: 57, color: "#42a5f5",
          products: [
            { name: "Embassy Office Parks REIT", value: 45, cost: 9.42, marketValue: 11.26, income: 0.60, gainLoss: 0.24, gainPct: 14.89, irr: 11.5 },
            { name: "Mindspace Business Parks", value: 35, cost: 7.32, marketValue: 8.76, income: 0.47, gainLoss: 0.18, gainPct: 16.39, irr: 11.5 },
            { name: "Powergrid InvIT", value: 20, cost: 4.20, marketValue: 5.02, income: 0.27, gainLoss: 0.12, gainPct: 19.05, irr: 11.5 },
          ],
        },
      ],
      securities: [
        { name: "Fixed Income MF", pct: "1%", cost: "₹0.34 Cr", mv: "₹0.35 Cr", income: "₹0", gl: "₹0.96 Cr", glPct: "2.79%", irr: "11.5%", isChild: true },
        { name: "High Yield AIF", pct: "42%", cost: "₹16.98 Cr", mv: "₹18.66 Cr", income: "₹1.15 Cr", gl: "₹0.28 Cr", glPct: "16.69%", irr: "11.5%", isChild: true },
        { name: "REIT / InvIT", pct: "57%", cost: "₹20.94 Cr", mv: "₹25.02 Cr", income: "₹1.34 Cr", gl: "₹0.54 Cr", glPct: "25.93%", irr: "11.5%", isChild: true },
      ],
      totalCost: "₹38.27 Cr", totalMV: "₹44.04 Cr", totalIncome: "₹2.50 Cr",
      totalGL: "₹8.27 Cr", totalGLPct: "21.62%", totalIRR: "11.5%",
    },
    {
      name: "Equity",
      value: 32.89,
      color: "#ff9800",
      categories: [
        {
          name: "Direct Equity", value: 72, color: "#ff9800",
          products: [
            { name: "Reliance Industries", value: 30, cost: 1.01, marketValue: 8.90, income: 0.08, gainLoss: 7.89, gainPct: 781.2, irr: 16 },
            { name: "HDFC Bank", value: 25, cost: 0.84, marketValue: 7.42, income: 0.10, gainLoss: 6.58, gainPct: 783.3, irr: 16 },
            { name: "Infosys Ltd", value: 17, cost: 0.57, marketValue: 5.04, income: 0.05, gainLoss: 4.47, gainPct: 784.2, irr: 16 },
            { name: "TCS Ltd", value: 28, cost: 0.95, marketValue: 8.30, income: 0.05, gainLoss: 7.35, gainPct: 773.7, irr: 16 },
          ],
        },
        {
          name: "Equity Index Fund", value: 28, color: "#ffb74d",
          products: [
            { name: "UTI Nifty 50 Index Fund", value: 60, cost: 0.22, marketValue: 0.20, income: 0, gainLoss: -0.02, gainPct: -9.09, irr: 16 },
            { name: "Mirae Asset Nifty 50 ETF", value: 40, cost: 0.14, marketValue: 0.13, income: 0, gainLoss: -0.01, gainPct: -7.14, irr: 16 },
          ],
        },
      ],
      securities: [
        { name: "Direct Equity", pct: "72%", cost: "₹3.37 Cr", mv: "₹29.66 Cr", income: "₹0.28 Cr", gl: "₹26.57 Cr", glPct: "786.66%", irr: "16%", isChild: true },
        { name: "Equity Index Fund", pct: "28%", cost: "₹0.36 Cr", mv: "₹0.33 Cr", income: "₹0", gl: "-₹0.03 Cr", glPct: "-9.48%", irr: "16%", isChild: true, negative: true },
      ],
      totalCost: "₹12.37 Cr", totalMV: "₹41.04 Cr", totalIncome: "₹0.28 Cr",
      totalGL: "₹28.95 Cr", totalGLPct: "233.99%", totalIRR: "16%",
    },
    {
      name: "Alternate",
      value: 20.17,
      color: "#f5c842",
      categories: [
        {
          name: "Gold ETF", value: 40, color: "#f5c842",
          products: [
            { name: "Nippon India Gold ETF", value: 55, cost: 3.10, marketValue: 3.85, income: 0, gainLoss: 0.75, gainPct: 24.19, irr: 9 },
            { name: "SBI Gold Fund", value: 45, cost: 2.54, marketValue: 3.15, income: 0, gainLoss: 0.61, gainPct: 24.02, irr: 9 },
          ],
        },
        {
          name: "Multi Asset AIF", value: 35, color: "#ffd54f",
          products: [
            { name: "IIFL Special Opportunities", value: 60, cost: 6.20, marketValue: 7.44, income: 0.20, gainLoss: 1.24, gainPct: 20.0, irr: 10 },
            { name: "Avendus High Yield Credit", value: 40, cost: 4.13, marketValue: 4.96, income: 0.13, gainLoss: 0.83, gainPct: 20.1, irr: 10 },
          ],
        },
        {
          name: "Real Estate AIF", value: 25, color: "#e6ac00",
          products: [
            { name: "Kotak Real Estate Fund", value: 55, cost: 3.60, marketValue: 4.18, income: 0.12, gainLoss: 0.58, gainPct: 16.11, irr: 8 },
            { name: "ASK Real Estate Fund", value: 45, cost: 2.95, marketValue: 3.42, income: 0.10, gainLoss: 0.47, gainPct: 15.93, irr: 8 },
          ],
        },
      ],
      securities: [
        { name: "Gold ETF", pct: "40%", cost: "₹5.64 Cr", mv: "₹7.00 Cr", income: "₹0", gl: "₹1.36 Cr", glPct: "24.11%", irr: "9%", isChild: true },
        { name: "Multi Asset AIF", pct: "35%", cost: "₹10.33 Cr", mv: "₹12.40 Cr", income: "₹0.33 Cr", gl: "₹2.07 Cr", glPct: "20.04%", irr: "10%", isChild: true },
        { name: "Real Estate AIF", pct: "25%", cost: "₹6.55 Cr", mv: "₹7.60 Cr", income: "₹0.22 Cr", gl: "₹1.05 Cr", glPct: "16.03%", irr: "8%", isChild: true },
      ],
      totalCost: "₹22.52 Cr", totalMV: "₹27.00 Cr", totalIncome: "₹0.55 Cr",
      totalGL: "₹4.48 Cr", totalGLPct: "19.89%", totalIRR: "9%",
    },
  ],
};