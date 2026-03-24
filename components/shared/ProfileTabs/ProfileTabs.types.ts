import type { ReactNode } from "react";

// ── Field (default renderer) ──────────────────────────────────────────────────
export interface ProfileField {
  /** Optional Lucide icon shown in red */
  icon?: ReactNode;
  /** Muted label e.g. "E-mail" */
  label: string;
  /** Primary value e.g. "sh*****@****.com" */
  value: string;
}

// ── Tab ───────────────────────────────────────────────────────────────────────
export interface ProfileTab {
  /** Unique id */
  id: string;
  /** Button label e.g. "PERSONAL" */
  label: string;

  /**
   * OPTION A — default renderer.
   * Pass an array of fields and the component renders them automatically.
   * Use this for standard label/value layouts.
   */
  fields?: ProfileField[];

  /**
   * OPTION B — custom slot.
   * Pass any ReactNode to fully control what renders inside this tab.
   * When present, `fields` is ignored for this tab.
   *
   * @example
   * content: <MyCustomBankForm />
   */
  content?: ReactNode;
}

// ── Component props ───────────────────────────────────────────────────────────
export interface ProfileTabsProps {
  tabs: ProfileTab[];
  /**
   * Controlled active tab id.
   * Omit for uncontrolled (component manages its own state).
   */
  activeTabId?: string;
  /** Called when user clicks a tab */
  onTabChange?: (id: string) => void;
  /** Breakpoint in px where layout switches to horizontal. Default: 640 */
  mobileBreakpoint?: number;
}