import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Mail, FileText, Phone, CreditCard, AlertCircle } from "lucide-react";
import { ProfileTabs } from "@/components/shared/ProfileTabs";
import type { ProfileTab } from "@/components/shared/ProfileTabs";

// ── Reusable tab data ─────────────────────────────────────────────────────────
const PERSONAL_TAB: ProfileTab = {
  id: "personal",
  label: "PERSONAL",
  fields: [
    { icon: <Mail size={22} strokeWidth={1.5} />,     label: "E-mail", value: "sh*****@****.com" },
    { icon: <FileText size={22} strokeWidth={1.5} />, label: "PAN",    value: "*****161Q"        },
    { icon: <Phone size={22} strokeWidth={1.5} />,    label: "Mobile", value: "+91 ***** *6353"  },
  ],
};

const DEMAT_TAB: ProfileTab = {
  id: "demat",
  label: "DEMAT",
  fields: [
    { label: "Demat ID",               value: "165668733571761386" },
    { label: "DP ID",                  value: "11263739"           },
    { label: "BO ID",                  value: "11263739"           },
    { label: "Depository Participant", value: "Ambit Broking LTD"  },
  ],
};

const BANK_TAB: ProfileTab = {
  id: "bank",
  label: "BANK",
  fields: [
    { icon: <CreditCard size={22} strokeWidth={1.5} />, label: "Account Number", value: "***** 3287872"                      },
    { label: "Bank",                                     value: "HDFC Bank LTD"                                              },
    { label: "Branch",                                   value: "Kamala Mills Compound, Lower, Parel" },
  ],
};

// ── Meta ──────────────────────────────────────────────────────────────────────
const meta: Meta<typeof ProfileTabs> = {
  title:     "Shared/ProfileTabs",
  component: ProfileTabs,
  tags:      ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark",  value: "#111" },
        { name: "light", value: "#f5f5f5" },
      ],
    },
    layout: "padded",
  },
  argTypes: {
    tabs:             { control: false },
    activeTabId:      { control: "select", options: [undefined, "personal", "demat", "bank"] },
    mobileBreakpoint: { control: { type: "number", min: 320, max: 1200, step: 10 } },
    onTabChange:      { action: "tabChanged" },
  },
  args: {
    tabs: [PERSONAL_TAB, DEMAT_TAB, BANK_TAB],
    activeTabId: undefined,
    mobileBreakpoint: 640,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Default — all tabs use the fields renderer
// ─────────────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: "Default (fields renderer)",
  args: { tabs: [PERSONAL_TAB, DEMAT_TAB, BANK_TAB] },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Custom slot on ONE tab — BANK replaced with a custom form
//    PERSONAL and DEMAT still use the default fields renderer
// ─────────────────────────────────────────────────────────────────────────────
export const CustomSlotOnOneTab: Story = {
  name: "Custom slot on BANK tab",
  args: {
    tabs: [
      PERSONAL_TAB,
      DEMAT_TAB,
      {
        id:    "bank",
        label: "BANK",
        // ↓ content overrides fields for this tab only
        content: (
          <div style={{ color: "#e0e0e0", fontFamily: "Jost, sans-serif" }}>
            <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>
              This tab uses a fully custom layout instead of the default field list.
            </p>

            {/* Example: custom bank card UI */}
            <div style={{
              background:   "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
              borderRadius: 12,
              padding:      "20px 24px",
              marginBottom: 16,
              border:       "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ fontSize: 11, color: "#666", letterSpacing: "0.1em", marginBottom: 8 }}>
                ACCOUNT NUMBER
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "0.2em" }}>
                •••••  •••••  3287872
              </div>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 10, color: "#666" }}>BANK</div>
                  <div style={{ fontSize: 13 }}>HDFC Bank LTD</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#666" }}>IFSC</div>
                  <div style={{ fontSize: 13 }}>HDFC0001234</div>
                </div>
              </div>
            </div>

            <div style={{
              display:     "flex",
              alignItems:  "center",
              gap:         8,
              padding:     "10px 14px",
              background:  "rgba(229,57,53,0.08)",
              borderRadius: 8,
              border:      "1px solid rgba(229,57,53,0.2)",
            }}>
              <AlertCircle size={16} color="#e53935" />
              <span style={{ fontSize: 12, color: "#e53935" }}>
                Bank details are verified and linked.
              </span>
            </div>
          </div>
        ),
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. All tabs use custom slots — maximum customization
// ─────────────────────────────────────────────────────────────────────────────
export const AllCustomSlots: Story = {
  name: "All tabs with custom slots",
  args: {
    tabs: [
      {
        id:    "personal",
        label: "PERSONAL",
        content: (
          <div style={{ color: "#e0e0e0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "linear-gradient(135deg, #e53935, #b71c1c)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: "#fff",
              }}>
                R
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Rakesh Patel</div>
                <div style={{ fontSize: 12, color: "#666" }}>Private Client</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "E-mail",  value: "sh*****@****.com" },
                { label: "Mobile",  value: "+91 ***** *6353"  },
                { label: "PAN",     value: "*****161Q"         },
                { label: "City",    value: "Mumbai"            },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontSize: 11, color: "#555" }}>{f.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id:    "demat",
        label: "DEMAT",
        content: (
          <div style={{ color: "#e0e0e0" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <tbody>
                {[
                  ["Demat ID",               "165668733571761386"],
                  ["DP ID",                  "11263739"          ],
                  ["BO ID",                  "11263739"          ],
                  ["Depository Participant", "Ambit Broking LTD" ],
                ].map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <td style={{ padding: "10px 0", color: "#555", width: "45%" }}>{label}</td>
                    <td style={{ padding: "10px 0", fontWeight: 500 }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      },
      {
        id:    "bank",
        label: "BANK",
        // Falls back to fields — mix of slot and fields in same story
        fields: BANK_TAB.fields,
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Controlled mode
// ─────────────────────────────────────────────────────────────────────────────
export const Controlled: Story = {
  name: "Controlled (external state)",
  render: (args) => {
    const [activeTabId, setActiveTabId] = useState("personal");
    return (
      <div>
        <p style={{ color: "#555", fontSize: 12, marginBottom: 16 }}>
          Active: <strong style={{ color: "#e53935" }}>{activeTabId}</strong>
        </p>
        <ProfileTabs
          {...args}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
        />
      </div>
    );
  },
  args: { tabs: [PERSONAL_TAB, DEMAT_TAB, BANK_TAB] },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Mobile layout forced
// ─────────────────────────────────────────────────────────────────────────────
export const MobileLayout: Story = {
  name: "Mobile layout (forced)",
  args: {
    tabs:             [PERSONAL_TAB, DEMAT_TAB, BANK_TAB],
    mobileBreakpoint: 9999,
  },
};