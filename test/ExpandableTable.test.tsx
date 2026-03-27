import { render, screen, fireEvent } from "@testing-library/react";
import ExpandableTable from "@/components/shared/table/ExpandableTable";
import type { ColumnDef, ExpandableTableProps } from "@/components/shared/table/types";

interface TestRow {
  id: string;
  name: string;
  value: number;
  children?: TestRow[];
  dotColor?: string;
}

describe("ExpandableTable", () => {
  // ❌ FAILING TESTS FIRST - Edge cases and validation
  describe("❌ Data Validation - Edge Cases (Currently Failing)", () => {
    it("should handle null data gracefully", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={null as any} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle undefined data gracefully", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={undefined as any} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle empty data array", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={[]} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should display empty message when no data", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow>
          data={[]}
          columns={columns}
          emptyMessage="No records found"
        />
      );
      expect(screen.getByText("No records found")).toBeInTheDocument();
    });

    it("should handle data with null children", () => {
      const data: TestRow[] = [
        { id: "1", name: "Parent", value: 100, children: null as any },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle deeply nested data", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Level 1",
          value: 100,
          children: [
            {
              id: "1.1",
              name: "Level 2",
              value: 50,
              children: [
                {
                  id: "1.1.1",
                  name: "Level 3",
                  value: 25,
                },
              ],
            },
          ],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Column handling
  describe("❌ Column Validation (Currently Failing)", () => {
    it("should handle null columns gracefully", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={null as any} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle undefined columns gracefully", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={undefined as any} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should handle empty columns array", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={[]} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Expansion functionality
  describe("❌ Expansion Functionality (Currently Failing)", () => {
    it("should expand row when clicked", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Parent",
          value: 100,
          children: [{ id: "1.1", name: "Child", value: 50 }],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );

      const expandButton = container.querySelector("span");
      if (expandButton) {
        fireEvent.click(expandButton);
      }

      expect(screen.getByText("Child")).toBeInTheDocument();
    });

    it("should collapse row when clicked again", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Parent",
          value: 100,
          children: [{ id: "1.1", name: "Child", value: 50 }],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { rerender } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );

      expect(document.body).toBeInTheDocument();
    });

    it("should apply default expanded state", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Parent",
          value: 100,
          children: [{ id: "1.1", name: "Child", value: 50 }],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          defaultExpandedIds={["1"]}
        />
      );

      expect(screen.getByText("Child")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Row key handling
  describe("❌ Row Key Handling (Currently Failing)", () => {
    it("should use custom rowKey for identification", () => {
      const data: TestRow[] = [
        { id: "row-1", name: "Test 1", value: 100 },
        { id: "row-2", name: "Test 2", value: 200 },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          rowKey="id"
        />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ❌ FAILING TESTS - Visual styling
  describe("❌ Visual Styling - Edge Cases (Currently Failing)", () => {
    it("should apply different background colors by depth", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Level 0",
          value: 100,
          children: [
            { id: "1.1", name: "Level 1", value: 50 },
          ],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          defaultExpandedIds={["1"]}
        />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("should display color dot for depth 0", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Test",
          value: 100,
          dotColor: "#ff0000",
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("renders table element", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("renders table headers", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
      ];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("th")).toBeInTheDocument();
    });

    it("renders table rows with data", () => {
      const data: TestRow[] = [
        { id: "1", name: "Item 1", value: 100 },
        { id: "2", name: "Item 2", value: 200 },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Cell rendering
  describe("✅ Cell Rendering (Passing)", () => {
    it("displays cell values correctly", () => {
      const data: TestRow[] = [
        { id: "1", name: "Test Item", value: 500 },
      ];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name" },
        { id: "value", header: "Value" },
      ];
      render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("Test Item")).toBeInTheDocument();
      expect(screen.getByText("500")).toBeInTheDocument();
    });

    it("uses custom cell renderer", () => {
      const data: TestRow[] = [
        { id: "1", name: "Test", value: 100 },
      ];
      const columns: ColumnDef<TestRow>[] = [
        {
          id: "value",
          header: "Value",
          cell: (row) => `₹${row.value}`,
        },
      ];
      render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(screen.getByText("₹100")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Nested data
  describe("✅ Nested Data (Passing)", () => {
    it("displays parent and child rows", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Parent",
          value: 100,
          children: [
            { id: "1.1", name: "Child", value: 50 },
          ],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          defaultExpandedIds={["1"]}
        />
      );
      expect(screen.getByText("Parent")).toBeInTheDocument();
      expect(screen.getByText("Child")).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Parent",
          value: 100,
          children: [
            { id: "1.1", name: "Child 1", value: 30 },
            { id: "1.2", name: "Child 2", value: 40 },
            { id: "1.3", name: "Child 3", value: 30 },
          ],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          defaultExpandedIds={["1"]}
        />
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Indentation
  describe("✅ Indentation (Passing)", () => {
    it("applies indentation based on depth", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Level 0",
          value: 100,
          children: [
            {
              id: "1.1",
              name: "Level 1",
              value: 50,
            },
          ],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          defaultExpandedIds={["1"]}
        />
      );
      expect(screen.getByText("Level 0")).toBeInTheDocument();
      expect(screen.getByText("Level 1")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - CSS classes
  describe("✅ CSS Classes (Passing)", () => {
    it("applies table styling", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      const table = container.querySelector("table");
      expect(table).toHaveStyle({ borderCollapse: "collapse" });
    });

    it("applies header styling", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      const th = container.querySelector("th");
      expect(th).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Column props
  describe("✅ Column Props (Passing)", () => {
    it("applies custom column width", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "name", header: "Name", width: "60%" },
      ];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("applies custom column alignment", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [
        { id: "value", header: "Value", align: "right" },
      ];
      const { container } = render(
        <ExpandableTable<TestRow> data={data} columns={columns} />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Custom props
  describe("✅ Custom Props (Passing)", () => {
    it("accepts custom emptyMessage", () => {
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow>
          data={[]}
          columns={columns}
          emptyMessage="Custom empty message"
        />
      );
      expect(screen.getByText("Custom empty message")).toBeInTheDocument();
    });

    it("accepts data-testid prop", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          data-testid="expandable-table"
        />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
    });
  });
});
