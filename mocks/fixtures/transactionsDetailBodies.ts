/** `GET /api/v1/transactions/:id` — shape aligned with list rows; `transactionId` overridden from path. */
export const transactionsDetailDefault = {
  status: "SUCCESS" as const,
  transactionId: "TXN-1M-1",
  security: "ICICI Corporate Bond",
  amount: 1317.42,
  settlementDate: "2026-03-04",
  memberName: "Rakesh Patel",
  lastUpdatedDate: "2026-03-24",
  type: "SELL",
  price: 112.6,
  status: "SETTLED",
  accountId: "ACC1001",
  transactionDate: "2026-03-02",
  units: 11.7,
  assetClass: "Equity",
};
