export interface Product {
  name: string;
  value: number;
  cost: number;
  marketValue: number;
  income: number;
  gainLoss: number;
  gainPct: number;
  irr: number;
}

export interface Category {
  name: string;
  value: number;
  color: string;
  products: Product[];
}

export interface SecurityRow {
  name: string;
  pct: string;
  cost: string;
  mv: string;
  income: string;
  gl: string;
  glPct: string;
  irr: string;
  isChild: boolean;
  negative?: boolean;
}

export interface AssetClass {
  name: string;
  value: number;
  color: string;
  categories: Category[];
  securities: SecurityRow[];
  totalCost: string;
  totalMV: string;
  totalIncome: string;
  totalGL: string;
  totalGLPct: string;
  totalIRR: string;
}

export interface PortfolioData {
  assetClasses: AssetClass[];
}

export interface ChartSlice {
  name: string;
  value: number;
  color: string;
}

export interface TableRow extends Partial<SecurityRow> {
  name: string;
  pct?: string;
  cost?: string;
  mv?: string;
  income?: string;
  gl?: string;
  glPct?: string;
  irr?: string;
  isHeader?: boolean;
  isChild?: boolean;
  headerColor?: string;
  negative?: boolean;
}