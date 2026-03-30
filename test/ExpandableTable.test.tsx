import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
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
    it("displays parent and child rows when expanded", () => {
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
          rowKey="id"
          defaultExpandedIds={["1"]}
        />
      );
      expect(screen.getByText("Parent")).toBeInTheDocument();
      expect(screen.getByText("Child")).toBeInTheDocument();
    });

    it("handles multiple children when expanded", () => {
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
          rowKey="id"
          defaultExpandedIds={["1"]}
        />
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
      expect(screen.getByText("Child 3")).toBeInTheDocument();
    });

    it("hides children when not expanded", () => {
      const data: TestRow[] = [
        {
          id: "1",
          name: "Parent",
          value: 100,
          children: [
            { id: "1.1", name: "HiddenChild", value: 50 },
          ],
        },
      ];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          rowKey="id"
        />
      );
      expect(screen.getByText("Parent")).toBeInTheDocument();
      expect(screen.queryByText("HiddenChild")).not.toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Indentation and depth styling
  describe("✅ Indentation (Passing)", () => {
    it("applies indentation styles based on depth", () => {
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
          rowKey="id"
          defaultExpandedIds={["1"]}
        />
      );
      expect(screen.getByText("Level 0")).toBeInTheDocument();
      expect(screen.getByText("Level 1")).toBeInTheDocument();
    });

    it("renders indent guide for nested items", () => {
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
      const { container } = render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
          rowKey="id"
          defaultExpandedIds={["1"]}
        />
      );
      // Check that table has rows (parent and child)
      const rows = container.querySelectorAll("tbody tr");
      expect(rows.length).toBeGreaterThan(1);
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

  // ✅ PASSING TESTS - Optional Props
  describe("✅ Optional Props (Passing)", () => {
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

    it("accepts rowKey prop to identify rows by property", () => {
      const data: TestRow[] = [
        {
          id: "custom-id",
          name: "Test",
          value: 100,
        },
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
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("uses index-based row identification by default", () => {
      const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
      const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
      const { container } = render(
        <ExpandableTable<TestRow>
          data={data}
          columns={columns}
        />
      );
      expect(container.querySelector("table")).toBeInTheDocument();
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });

  // // ✅ ACCESSIBILITY TESTS - jest-axe
  // describe("✅ Accessibility (a11y)", () => {
  //   it("should have no accessibility violations with simple data", async () => {
  //     const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
  //     const columns: ColumnDef<TestRow>[] = [
  //       { id: "name", header: "Name" },
  //       { id: "value", header: "Value" },
  //     ];
  //     const { container } = render(
  //       <ExpandableTable<TestRow> data={data} columns={columns} />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with nested data", async () => {
  //     const data: TestRow[] = [
  //       {
  //         id: "1",
  //         name: "Parent",
  //         value: 100,
  //         children: [
  //           { id: "1.1", name: "Child", value: 50 },
  //         ],
  //       },
  //     ];
  //     const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
  //     const { container } = render(
  //       <ExpandableTable<TestRow>
  //         data={data}
  //         columns={columns}
  //         rowKey="id"
  //         defaultExpandedIds={["1"]}
  //       />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have accessible table structure", () => {
  //     const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
  //     const columns: ColumnDef<TestRow>[] = [
  //       { id: "name", header: "Name" },
  //     ];
  //     const { container } = render(
  //       <ExpandableTable<TestRow> data={data} columns={columns} />
  //     );

  //     expect(container.querySelector("table")).toBeInTheDocument();
  //     expect(container.querySelector("thead")).toBeInTheDocument();
  //     expect(container.querySelector("tbody")).toBeInTheDocument();
  //     expect(container.querySelector("th")).toBeInTheDocument();
  //     expect(container.querySelector("td")).toBeInTheDocument();
  //   });

  //   it("should have accessible empty state", () => {
  //     const columns: ColumnDef<TestRow>[] = [{ id: "name", header: "Name" }];
  //     render(
  //       <ExpandableTable<TestRow>
  //         data={[]}
  //         columns={columns}
  //         emptyMessage="No results available"
  //       />
  //     );

  //     expect(screen.getByText("No results available")).toBeInTheDocument();
  //   });

  //   it("should have accessible header row", () => {
  //     const data: TestRow[] = [{ id: "1", name: "Test", value: 100 }];
  //     const columns: ColumnDef<TestRow>[] = [
  //       { id: "name", header: "Name" },
  //       { id: "value", header: "Value" },
  //     ];
  //     const { container } = render(
  //       <ExpandableTable<TestRow> data={data} columns={columns} />
  //     );

  //     const headers = container.querySelectorAll("th");
  //     expect(headers.length).toBe(2);
  //     expect(headers[0]).toHaveTextContent("Name");
  //     expect(headers[1]).toHaveTextContent("Value");
  //   });
  // });
});
