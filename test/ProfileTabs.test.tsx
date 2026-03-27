import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileTabs from "@/components/shared/ProfileTabs";

interface ProfileTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content?: React.ReactNode;
    fields?: Array<{ label: string; value: string }>;
  }>;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

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

  // ✅ PASSING TESTS - Default tab
  describe("✅ Default Tab (Passing)", () => {
    it("sets custom default tab", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal", content: "Info 1" },
        { id: "demat", label: "Demat", content: "Info 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} defaultTab="demat" />
      );
      expect(screen.getByText("Info 2")).toBeInTheDocument();
    });

    it("respects defaultTab prop on mount", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
        { id: "tab3", label: "Tab 3", content: "Content 3" },
      ];
      render(
        <ProfileTabs tabs={tabs} defaultTab="tab3" />
      );
      expect(screen.getByText("Content 3")).toBeInTheDocument();
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

    it("renders fields when provided", async () => {
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

      const tab = screen.getByRole("tab", { name: "Personal" });
      fireEvent.click(tab);

      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
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

    it("has aria-controls on tab buttons", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "personal", label: "Personal" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      const tab = screen.getByRole("tab");
      expect(tab).toHaveAttribute("aria-controls");
    });
  });

  // ✅ PASSING TESTS - Styling
  describe("✅ Styling (Passing)", () => {
    it("applies custom className", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} className="custom-class" />
      );
      expect(container.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("applies active tab styling", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1", content: "Content 1" },
        { id: "tab2", label: "Tab 2", content: "Content 2" },
      ];
      render(
        <ProfileTabs tabs={tabs} />
      );
      const activeTab = screen.getByRole("tab", { name: "Tab 1" });
      expect(activeTab).toHaveClass("active") || expect(activeTab).toHaveAttribute("aria-selected", "true");
    });

    it("applies inactive tab styling", () => {
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
  });

  // ✅ PASSING TESTS - Controlled state
  describe("✅ Controlled State (Passing)", () => {
    it("handles onTabChange callback", async () => {
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

    it("triggers callback once per click", async () => {
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
  });

  // ✅ PASSING TESTS - Custom props
  describe("✅ Custom Props (Passing)", () => {
    it("accepts data-testid", () => {
      const tabs: ProfileTabsProps["tabs"] = [
        { id: "tab1", label: "Tab 1" },
      ];
      const { container } = render(
        <ProfileTabs tabs={tabs} data-testid="profile-tabs" />
      );
      expect(container.querySelector('[data-testid="profile-tabs"]')).toBeInTheDocument();
    });
  });
});
