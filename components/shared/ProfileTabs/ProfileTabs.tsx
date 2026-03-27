"use client";

import { useState, useEffect } from "react";
import type { ProfileTabsProps, ProfileField } from "./ProfileTabs.types";

export default function ProfileTabs({
  tabs,
  activeTabId,
  onTabChange,
  mobileBreakpoint = 640,
}: ProfileTabsProps) {
  // ── Controlled vs uncontrolled ────────────────────────────────────────────
  const [internalId, setInternalId] = useState(() => tabs[0]?.id ?? "");
  const isControlled   = activeTabId !== undefined;
  const resolvedActive = isControlled ? activeTabId : internalId;

  const handleTabClick = (id: string) => {
    if (!isControlled) setInternalId(id);
    onTabChange?.(id);
  };

  // ── Responsive ────────────────────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq     = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mobileBreakpoint]);

  const activeTab = tabs.find((t) => t.id === resolvedActive) ?? tabs[0];
  if (!tabs.length) return null;

  return (
    <div
      style={{
        display:    isMobile ? "block" : "flex",
        gap:        isMobile ? 0 : 48,
        fontFamily: "Jost, 'Jost Fallback', sans-serif",
        background: "transparent",
      }}
    >
      {/* ── Tab nav ── */}
      <nav
        aria-label="Profile sections"
        style={{
          display:       "flex",
          flexDirection: isMobile ? "row" : "column",
          gap:           isMobile ? 0 : 4,
          minWidth:      isMobile ? "unset" : 130,
          flexShrink:    0,
          borderBottom:  isMobile ? "1px solid rgba(255,255,255,0.08)" : "none",
          marginBottom:  isMobile ? 24 : 0,
        }}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={tab.id === resolvedActive}
            isMobile={isMobile}
            onClick={() => handleTabClick(tab.id)}
          />
        ))}
      </nav>

      {/* ── Content ──────────────────────────────────────────────────────────
          Priority:
            1. tab.content  → render custom slot as-is
            2. tab.fields   → render default FieldRow list
            3. neither      → render nothing (empty tab)
      ── */}
      <div style={{ flex: 1 }}>
        {activeTab?.content != null ? (
          // Custom slot — full control, no wrapper interference
          activeTab.content
        ) : (
          // Default renderer
          <div
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           isMobile ? 20 : 28,
            }}
          >
            {(activeTab?.fields ?? []).map((field, i) => (
              <FieldRow key={i} field={field} isMobile={isMobile} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── TabButton ─────────────────────────────────────────────────────────────────
function TabButton({
  label,
  isActive,
  isMobile,
  onClick,
}: {
  label: string;
  isActive: boolean;
  isMobile: boolean;
  onClick: () => void;
}) {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className="text-black font-medium"
      style={{
        position:      "relative",
        background:    "transparent",
        border:        "none",
        cursor:        "pointer",
        fontFamily:    "Jost, Jost Fallback",
        // fontSize:      13,
        // fontWeight:    isActive ? 700 : 400,
        letterSpacing: "0.08em",
        color:         isActive ? "#e53935" : "#666",
        transition:    "color 0.2s",
        ...(!isMobile && {
          padding:         "10px 16px",
          textAlign:       "left" as const,
          borderRadius:    4,
          backgroundImage: isActive
            ? "linear-gradient(to left, rgba(229,57,53,0.18) 0%, rgba(229,57,53,0.0) 100%)"
            : "none",
        }),
        ...(isMobile && {
          flex:            1,
          padding:         "10px 8px 12px",
          textAlign:       "center" as const,
          backgroundImage: isActive
            ? "linear-gradient(to left, rgba(229,57,53,0.22) 0%, rgba(229,57,53,0.0) 100%)"
            : "none",
        }),
      }}
    >
      {label}

      {/* Desktop left bar */}
      {!isMobile && isActive && (
        <span style={{
          position: "absolute", left: 0, top: "50%",
          transform: "translateY(-50%)",
          width: 3, height: "99%",
          background: "#e53935", borderRadius: "0 2px 2px 0",
        }} />
      )}

      {/* Mobile bottom bar */}
      {isMobile && isActive && (
        <span style={{
          position: "absolute", bottom: 0, left: "10%",
          width: "90%", height: 2,
          background: "#e53935", borderRadius: "2px 2px 0 0",
        }} />
      )}
    </button>
  );
}

// ── FieldRow (default renderer) ───────────────────────────────────────────────
function FieldRow({ field, isMobile }: { field: ProfileField; isMobile: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: isMobile ? 14 : 20 }}>
      <div style={{ width: 28, flexShrink: 0, marginTop: 2, color: "#e53935", display: "flex", alignItems: "center" }}>
        {field.icon ?? null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#666", letterSpacing: "0.03em" }}>
          {field.label}
        </span>
        <span style={{ fontSize: isMobile ? 13 : 14, fontWeight: 500, color: "#a3a3a3", letterSpacing: "0.02em" }}>
          {field.value}
        </span>
      </div>
    </div>
  );
}