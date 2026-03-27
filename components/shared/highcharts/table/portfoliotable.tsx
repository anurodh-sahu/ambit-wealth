import type { TableRow } from "@/types/portfolio";

interface PortfolioTableProps {
  rows: TableRow[];
}

const HEADERS = [
  "Security",
  "Cost ⓘ",
  "Market Value ⓘ",
  "Income ⓘ",
  "Gain/Loss ⓘ",
  "% IRR ⓘ",
];

export default function PortfolioTable({ rows }: PortfolioTableProps) {
  return (
    <div
      style={{
        overflowX: "auto",
        borderRadius: 8,
        border: "1px solid #e8e8e8",
        marginTop: 16,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
        <thead>
          <tr>
            {HEADERS.map((h, i) => (
              <th
                key={h}
                style={{
                  padding: "8px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#666",
                  borderBottom: "1px solid #e0e0e0",
                  textAlign: i === 0 ? "left" : "right",
                  background: "#f7f7f5",
                  whiteSpace: "nowrap",
                  fontFamily: "Georgia, serif",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <TableRowItem key={i} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Single row ─────────────────────────────────────────────────────────────────
function TableRowItem({ row }: { row: TableRow }) {
  const tdBase: React.CSSProperties = {
    padding: "9px 12px",
    fontSize: 12,
    color: "#333",
    borderBottom: "1px solid #f0f0f0",
    textAlign: "right",
    fontFamily: "'Courier New', monospace",
  };

  return (
    <tr
      style={{ background: row.isHeader ? "#fff" : "#fafafa", transition: "background 0.15s" }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f0f7ff")}
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background = row.isHeader ? "#fff" : "#fafafa")
      }
    >
      {/* Security name */}
      <td style={{ ...tdBase, textAlign: "left", paddingLeft: row.isChild ? 28 : 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {row.isChild && <span style={{ color: "#aaa", fontSize: 10 }}>▼</span>}
          <span
            style={{
              fontWeight: row.isHeader ? 700 : 400,
              color: row.isHeader ? (row.headerColor ?? "#333") : "#444",
              fontSize: row.isHeader ? 13 : 12,
              fontFamily: row.isHeader ? "Georgia, serif" : "'Courier New', monospace",
            }}
          >
            {row.name}
          </span>
          {row.pct && (
            <span style={{ color: "#26b5a0", fontWeight: 600, fontSize: 12, marginLeft: 4 }}>
              {row.pct}
            </span>
          )}
        </div>
      </td>

      <td style={tdBase}>{row.cost ?? "—"}</td>
      <td style={tdBase}>{row.mv ?? "—"}</td>
      <td style={tdBase}>{row.income ?? "—"}</td>

      {/* Gain/Loss with colored percentage */}
      <td style={tdBase}>
        <span>{row.gl ?? "—"} </span>
        <span
          style={{
            color: row.negative ? "#e53935" : "#26b57a",
            fontWeight: 600,
            fontSize: 11,
          }}
        >
          {row.glPct}
        </span>
      </td>

      <td style={{ ...tdBase, fontWeight: row.isHeader ? 700 : 400 }}>{row.irr ?? "—"}</td>
    </tr>
  );
}