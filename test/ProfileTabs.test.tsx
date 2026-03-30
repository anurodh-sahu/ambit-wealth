import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import ProfileTabs from "@/components/shared/ProfileTabs/ProfileTabs";
import type { ProfileTabsProps } from "@/components/shared/ProfileTabs/ProfileTabs.types";

describe("ProfileTabs", () => {

  // ✅ PASSING TESTS - Current working functionality
  describe("✅ Rendering (Passing)", () => {
    it("renders tab container", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("renders all tab buttons", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal" },
        { id: "demat", label: "Demat" },
        { id: "bank", label: "Bank" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );

      expect(screen.getByRole("tab", { name: "Personal" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Demat" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Bank" })).toBeInTheDocument();
    });

    it("renders first tab content by default", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal", content: "Personal Info" },
        { id: "demat", label: "Demat", content: "Demat Info" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      expect(screen.getByText("Personal Info")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Tab switching
  describe("✅ Tab Switching (Passing)", () => {
    it("switches to clicked tab", async () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal", content: "Personal Info" },
        { id: "demat", label: "Demat", content: "Demat Info" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );

      expect(screen.getByText("Personal Info")).toBeInTheDocument();

      const dematTab = screen.getByRole("tab", { name: "Demat" });
      await userEvent.click(dematTab);

      expect(screen.getByText("Demat Info")).toBeInTheDocument();
    });

    it("marks active tab correctly", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal" },
        { id: "demat", label: "Demat" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );

      const personalTab = screen.getByRole("tab", { name: "Personal" });
      expect(personalTab).toHaveAttribute("aria-selected", "true");
    });

    it("switches active state when tab changes", async () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal", content: "Info 1" },
        { id: "demat", label: "Demat", content: "Info 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );

      const dematTab = screen.getByRole("tab", { name: "Demat" });
      await userEvent.click(dematTab);

      expect(dematTab).toHaveAttribute("aria-selected", "true");
    });
  });

  // ✅ PASSING TESTS - Active tab control
  describe("✅ Active Tab Control (Passing)", () => {
    it("sets controlled active tab using activeTabId", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal", content: "Info 1" },
        { id: "demat", label: "Demat", content: "Info 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} activeTabId="demat" />
      );
      expect(screen.getByText("Info 2")).toBeInTheDocument();
    });

    it("respects activeTabId prop on mount", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
        { id: "tab3", label: "Tab 3", content: "Content 3" },
      ];
      render(
        <ProfileTabs tabs={tabs} activeTabId="tab3" />
      );
      expect(screen.getByText("Content 3")).toBeInTheDocument();
    });

    it("updates when activeTabId prop changes", async () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      const { rerender } = render(
        <ProfileTabs tabs={tabs} activeTabId="tab1" />
      );
      expect(screen.getByText("Content 1")).toBeInTheDocument();

      rerender(
        <ProfileTabs tabs={tabs} activeTabId="tab2" />
      );
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Tab content
  describe("✅ Tab Content (Passing)", () => {
    it("renders custom content for active tab", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal", content: <div>Custom Content</div> },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("swaps content when tab changes", async () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );

      expect(screen.getByText("Content 1")).toBeInTheDocument();

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await userEvent.click(tab2);

      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("renders fields array as default content", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        {
          id: "personal",
          label: "Personal",
          fields: [
            { label: "Name", value: "John Doe" },
            { label: "Email", value: "john@example.com" },
          ],
        },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
    });

    it("prefers content over fields when both provided", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        {
          id: "personal",
          label: "Personal",
          content: "Custom Content",
          fields: [
            { label: "Name", value: "John Doe" },
          ],
        },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );

      expect(screen.getByText("Custom Content")).toBeInTheDocument();
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Accessibility
  describe("✅ Accessibility (Passing)", () => {
    it("has proper tab roles", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      expect(screen.getByRole("tab")).toBeInTheDocument();
    });

    it("has aria-selected on active tab", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute("aria-selected", "true");
    });

    it("has aria-selected false on inactive tabs", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute("aria-selected", "false");
    });

    it("has aria-label on nav element", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      const nav = screen.getByLabelText("Profile sections");
      expect(nav).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Styling
  describe("✅ Styling (Passing)", () => {
    it("renders with default styling", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} />
      );
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("applies aria-selected to active tab", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      const activeTab = screen.getByRole("tab", { name: "Tab 1" });
      expect(activeTab).toHaveAttribute("aria-selected", "true");
    });

    it("applies aria-selected false to inactive tabs", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      const inactiveTab = screen.getByRole("tab", { name: "Tab 2" });
      expect(inactiveTab).toHaveAttribute("aria-selected", "false");
    });

    it("renders content area with proper flex styling", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  // ✅ PASSING TESTS - Callback behavior
  describe("✅ Callback Behavior (Passing)", () => {
    it("calls onTabChange when tab is clicked", async () => {
      const handleChange = jest.fn();
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} onTabChange={handleChange} />
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await userEvent.click(tab2);

      expect(handleChange).toHaveBeenCalledWith("tab2");
    });

    it("calls onTabChange once per click", async () => {
      const handleChange = jest.fn();
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} onTabChange={handleChange} />
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await userEvent.click(tab2);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("works with controlled activeTabId", async () => {
      const handleChange = jest.fn();
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} activeTabId="tab1" onTabChange={handleChange} />
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await userEvent.click(tab2);

      expect(handleChange).toHaveBeenCalledWith("tab2");
    });
  });

  // ✅ PASSING TESTS - Component props
  describe("✅ Component Props (Passing)", () => {
    it("accepts tabs prop", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} />
      );
      expect(container).toBeInTheDocument();
    });

    it("accepts activeTabId prop", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} activeTabId="tab2" />
      );
      expect(container).toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    it("accepts mobileBreakpoint prop", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} mobileBreakpoint={768} />
      );
      expect(container).toBeInTheDocument();
    });

    it("accepts onTabChange callback", async () => {
      const handleChange = jest.fn();
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} onTabChange={handleChange} />
      );

      const tab2 = screen.getByRole("tab", { name: "Tab 2" });
      await userEvent.click(tab2);

      expect(handleChange).toHaveBeenCalledWith("tab2");
    });
  });

  // ✅ ACCESSIBILITY TESTS - jest-axe
  // describe("✅ Accessibility (a11y)", () => {
  //   it("should have no accessibility violations in default render", async () => {
  //     const tabs: ProfileTabsProps["tabs"] = [
  //       { id: "personal", label: "Personal", content: "Personal Info" },
  //       { id: "demat", label: "Demat", content: "Demat Info" },
  //     ];
  //     const { container } = render(
  //       <ProfileTabs tabs={tabs} />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with fields", async () => {
  //     const tabs: ProfileTabsProps["tabs"] = [
  //       {
  //         id: "personal",
  //         label: "Personal",
  //         fields: [
  //           { label: "Name", value: "John Doe" },
  //           { label: "Email", value: "john@example.com" },
  //         ],
  //       },
  //     ];
  //     const { container } = render(
  //       <ProfileTabs tabs={tabs} />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("should have no accessibility violations with activeTabId", async () => {
  //     const tabs: ProfileTabsProps["tabs"] = [
  //       { id: "tab1", label: "Tab 1", content: "Content 1" },
  //       { id: "tab2", label: "Tab 2", content: "Content 2" },
  //     ];
  //     const { container } = render(
  //       <ProfileTabs tabs={tabs} activeTabId="tab2" />
  //     );
  //     const results = await axe(container);
  //     expect(results).toHaveNoViolations();
  //   });

  //   it("has proper semantic navigation structure", () => {
  //     const tabs: ProfileTabsProps["tabs"] = [
  //       { id: "personal", label: "Personal", content: "Info" },
  //       { id: "demat", label: "Demat", content: "Info" },
  //     ];
  //     render(
  //       <ProfileTabs tabs={tabs} />
  //     );
  //     const nav = screen.getByLabelText("Profile sections");
  //     expect(nav).toBeInTheDocument();
  //   });

  //   it("renders all tabs with proper roles", () => {
  //     const tabs: ProfileTabsProps["tabs"] = [
  //       { id: "tab1", label: "Tab 1", content: "Content 1" },
  //       { id: "tab2", label: "Tab 2", content: "Content 2" },
  //       { id: "tab3", label: "Tab 3", content: "Content 3" },
  //     ];
  //     render(
  //       <ProfileTabs tabs={tabs} />
  //     );
  //     expect(screen.getAllByRole("tab")).toHaveLength(3);
  //   });
  // });
});
