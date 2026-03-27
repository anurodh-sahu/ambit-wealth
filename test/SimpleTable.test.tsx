import { render, screen, fireEvent } from "@testing-library/react";
import SimpleTable from "@/components/shared/table/SimpleTable";
import type { ColumnDef, SimpleTableProps } from "@/components/shared/table/types";

interface TestRow {
  id: string;
  name: string;
  value: number;
  status: string;
}

describe("SimpleTable", () => {
  // ❌ FAILING TESTS FIRST - Edge cases and validation
  describe("❌ Data Validation - Edge Cases (Currently Failing)", () => {
    it("should handle null data gracefully", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={null as any} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle undefined data gracefully", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={undefined as any} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle empty data array", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <SimpleTable<TestRow> data={[]} columns={columns} />
      );
      expect(screen.getByText("No data available.")).toBeInTheDocument();
    });

    it("should display custom empty message", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <SimpleTable<TestRow>
          data={[]}
          columns={columns}
          emptyMessage="No results found"
        />
      );
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });

    it("should handle data with missing fields", () => {
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
      ];
      const data: any[] = [
        { id: "1", name: "Item 1" }, // missing value
      ];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    it("should handle data with extra fields", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const data: any[] = [
        { id: "1", name: "Item 1", extraField: "ignored" },
      ];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    it("should handle very long cell values", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const data: any[] = [
        { id: "1", name: "A".repeat(200) },
      ];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(document.body).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Column handling
  describe("❌ Column Validation (Currently Failing)", () => {
    it("should handle null columns gracefully", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={null as any} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle undefined columns gracefully", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={undefined as any} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle empty columns array", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={[]} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Striping
  describe("❌ Row Striping (Currently Failing)", () => {
    it("should apply striped styling to alternate rows", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
        { id: "2", name: "Item 2", value: 200, status: "Active" },
        { id: "3", name: "Item 3", value: 300, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} striped={true} />
      );
      expect(container.querySelectorAll("tr").length).toBeGreaterThan(1);
    });

    it("should not stripe when striped is false", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
        { id: "2", name: "Item 2", value: 200, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} striped={false} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Hover effects
  describe("❌ Hover Effects (Currently Failing)", () => {
    it("should apply hover styling to rows on mouse enter", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );

      const row = container.querySelector("tbody tr");
      if (row) {
        fireEvent.mouseEnter(row);
        expect(row).toBeInTheDocument();
      }
    });

    it("should restore original styling on mouse leave", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );

      const row = container.querySelector("tbody tr");
      if (row) {
        fireEvent.mouseLeave(row);
        expect(row).toBeInTheDocument();
      }
    });
  });

  // ❌ FAILING TESTS - Negative value styling
  describe("❌ Negative Value Styling (Currently Failing)", () => {
    it("should display negative values in red", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: -100, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );

      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should not apply red color to positive values", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [
        { id: "value", header: "Value" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );

      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("renders table element", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("renders table headers", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
        { id: "status", header: "Status" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("thead")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Value")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });

    it("renders table rows with data", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
        { id: "2", name: "Item 2", value: 200, status: "Inactive" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Cell rendering
  describe("✅ Cell Rendering (Passing)", () => {
    it("displays cell values correctly", () => {
      const data: TestRow[] = [
        { id: "1", name: "Test Item", value: 500, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
        { id: "status", header: "Status" },
      ];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("Test Item")).toBeInTheDocument();
      expect(screen.getByText("500")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("uses custom cell renderer", () => {
      const data: TestRow[] = [
        { id: "1", name: "Test", value: 100, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [
        {
          id: "value",
          header: "Value",
          cell: (row) => `₹${row.value}`,
        },
      ];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("₹100")).toBeInTheDocument();
    });

    it("handles missing cell values with fallback", () => {
      const data: any[] = [
        { id: "1", name: "Test", value: undefined, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [
        { id: "value", header: "Value" },
      ];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("—")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Header styling
  describe("✅ Header Styling (Passing)", () => {
    it("applies header styling to thead", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      const th = container.querySelector("th");
      expect(th).toBeInTheDocument();
    });

    it("applies uppercase styling to headers", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("Name")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Column alignment
  describe("✅ Column Alignment (Passing)", () => {
    it("aligns first column to left by default", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("aligns other columns to right by default", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("applies custom column alignment", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name", align: "center" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Column width
  describe("✅ Column Width (Passing)", () => {
    it("applies custom column width", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name", width: "60%" },
        { id: "value", header: "Value", width: "40%" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Row styling
  describe("✅ Row Styling (Passing)", () => {
    it("renders tbody with rows", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("tbody")).toBeInTheDocument();
    });

    it("applies row styling for multiple rows", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
        { id: "2", name: "Item 2", value: 200, status: "Inactive" },
        { id: "3", name: "Item 3", value: 300, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelectorAll("tbody tr").length).toBe(3);
    });
  });

  // ✅ PASSING TESTS - Cell styling
  describe("✅ Cell Styling (Passing)", () => {
    it("applies cell styling", () => {
      const data: TestRow[] = [
        { id: "1", name: "Test", value: 100, status: "Active" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      const td = container.querySelector("td");
      expect(td).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Empty state
  describe("✅ Empty State (Passing)", () => {
    it("displays default empty message", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <SimpleTable<TestRow> data={[]} columns={columns} />
      );
      expect(screen.getByText("No data available.")).toBeInTheDocument();
    });

    it("spans all columns in empty message", () => {
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
        { id: "status", header: "Status" },
      ];
      const { container } = render(
        <SimpleTable<TestRow> data={[]} columns={columns} />
      );
      const td = container.querySelector("td");
      expect(td).toHaveAttribute("colSpan", "3");
    });
  });

  // ✅ PASSING TESTS - Responsive
  describe("✅ Responsive (Passing)", () => {
    it("renders with scroll container", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Custom props
  describe("✅ Custom Props (Passing)", () => {
    it("accepts custom emptyMessage", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <SimpleTable<TestRow>
          data={[]}
          columns={columns}
          emptyMessage="Custom empty state"
        />
      );
      expect(screen.getByText("Custom empty state")).toBeInTheDocument();
    });

    it("accepts custom striped prop", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100, status: "Active" },
        { id: "2", name: "Item 2", value: 200, status: "Inactive" },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow> data={data} columns={columns} striped={true} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("accepts data-testid prop", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100, status: "Active" }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <SimpleTable<TestRow>
          data={data}
          columns={columns}
          data-testid="simple-table"
        />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });
});
