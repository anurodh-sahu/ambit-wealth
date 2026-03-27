import { useState, useMemo } from "react";
import { PORTFOLIO_DATA } from "@/types/portfoliodata";
import type { ChartSlice, TableRow, Category } from "@/types/portfolio";

interface UsePortfolioFiltersReturn {
  selectedAsset: string | null;
  selectedCategory: string | null;
  selectedProduct: string | null;
  handleSelectAsset: (name: string | null) => void;
  handleSelectCategory: (name: string | null) => void;
  handleSelectProduct: (name: string | null) => void;
  clearFilters: () => void;
  assetData: ChartSlice[];
  categoryData: ChartSlice[];
  productData: ChartSlice[];
  tableRows: TableRow[];
}

export function usePortfolioFilters(): UsePortfolioFiltersReturn {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const { assetClasses } = PORTFOLIO_DATA;

  const handleSelectAsset = (name: string | null) => {
    setSelectedAsset(name);
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  const handleSelectCategory = (name: string | null) => {
    setSelectedCategory(name);
    setSelectedProduct(null);
  };

  const handleSelectProduct = (name: string | null) => {
    setSelectedProduct(name);
  };

  const clearFilters = () => {
    setSelectedAsset(null);
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  const assetData: ChartSlice[] = useMemo(
    () => assetClasses.map((a) => ({ name: a.name, value: a.value, color: a.color })),
    [assetClasses]
  );

  const activeCategorySource: Category[] = useMemo(() => {
    if (selectedAsset) {
      return assetClasses.find((a) => a.name === selectedAsset)?.categories ?? [];
    }
    return assetClasses.flatMap((a) => a.categories);
  }, [selectedAsset, assetClasses]);

  const categoryData: ChartSlice[] = useMemo(
    () => activeCategorySource.map((c) => ({ name: c.name, value: c.value, color: c.color })),
    [activeCategorySource]
  );

  const productData: ChartSlice[] = useMemo(() => {
    const source = selectedCategory
      ? activeCategorySource.find((c) => c.name === selectedCategory)?.products ?? []
      : activeCategorySource.flatMap((c) => c.products);

    return source.map((p) => ({
      name: p.name,
      value: p.value,
      color:
        activeCategorySource.find((c) => c.products.some((pp) => pp.name === p.name))?.color ?? "#aaa",
    }));
  }, [selectedCategory, activeCategorySource]);

  const tableRows: TableRow[] = useMemo(() => {
    const rows: TableRow[] = [];
    const sourceAssets = selectedAsset
      ? assetClasses.filter((a) => a.name === selectedAsset)
      : assetClasses;

    for (const asset of sourceAssets) {
      rows.push({
        name: asset.name,
        pct: `${asset.value}%`,
        isHeader: true,
        headerColor: asset.color,
        cost: asset.totalCost,
        mv: asset.totalMV,
        income: asset.totalIncome,
        gl: asset.totalGL,
        glPct: asset.totalGLPct,
        irr: asset.totalIRR,
      });

      const catSource = selectedCategory
        ? asset.categories.filter((c) => c.name === selectedCategory)
        : asset.categories;

      for (const cat of catSource) {
        const sec = asset.securities.find((s) => s.name === cat.name);
        if (sec) rows.push({ ...sec, isChild: true });
      }
    }

    return rows;
  }, [selectedAsset, selectedCategory, assetClasses]);

  return {
    selectedAsset, selectedCategory, selectedProduct,
    handleSelectAsset, handleSelectCategory, handleSelectProduct,
    clearFilters,
    assetData, categoryData, productData, tableRows,
  };
}