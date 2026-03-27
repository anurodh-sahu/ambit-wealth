import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotificationBell } from "@/components/shared/NotificationBell";

const meta: Meta<typeof NotificationBell> = {
  title: "Shared/NotificationBell",
  component: NotificationBell,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f5f5" },
        { name: "dark", value: "#111" },
      ],
    },
    layout: "padded",
  },
  argTypes: {
    count: { control: { type: "number", min: 0, max: 99 } },
  },
  args: {
    count: 0,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// 1. No notifications
// ─────────────────────────────────────────────────────────────────────────────
export const NoNotifications: Story = {
  name: "No Notifications",
  args: {
    count: 0,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Single notification
// ─────────────────────────────────────────────────────────────────────────────
export const SingleNotification: Story = {
  name: "Single Notification",
  args: {
    count: 1,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Few notifications
// ─────────────────────────────────────────────────────────────────────────────
export const FewNotifications: Story = {
  name: "Few Notifications",
  args: {
    count: 5,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Many notifications
// ─────────────────────────────────────────────────────────────────────────────
export const ManyNotifications: Story = {
  name: "Many Notifications",
  args: {
    count: 10,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. High notification count (99+)
// ─────────────────────────────────────────────────────────────────────────────
export const HighNotificationCount: Story = {
  name: "High Notification Count",
  args: {
    count: 99,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Interactive with drawer open/close
// ─────────────────────────────────────────────────────────────────────────────
export const InteractiveWithDrawer: Story = {
  name: "Interactive with Drawer",
  render: (args) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(args.count);

    const handleBellClick = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
      setIsDrawerOpen(false);
    };

    const markAsRead = () => {
      setNotificationCount(0);
      setIsDrawerOpen(false);
    };

    return (
      <div style={{ position: "relative", display: "flex", gap: 16 }}>
        {/* Bell Icon */}
        <button
          onClick={handleBellClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
          title="Click to open notifications"
        >
          <NotificationBell count={notificationCount} />
        </button>

        {/* Drawer */}
        {isDrawerOpen && (
          <div
            style={{
              position: "absolute",
              top: 40,
              right: 0,
              width: 320,
              background: "#fff",
              borderRadius: 12,
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 1000,
              maxHeight: 400,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                Notifications
              </span>
              <button
                onClick={closeDrawer}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: "auto" }}>
              {notificationCount > 0 ? (
                <div style={{ padding: 16 }}>
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 13, color: "#555", margin: "0 0 8px 0" }}>
                      You have <strong>{notificationCount}</strong> unread notification
                      {notificationCount !== 1 ? "s" : ""}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      {Array.from({ length: Math.min(notificationCount, 3) }).map(
                        (_, i) => (
                          <li
                            key={i}
                            style={{
                              padding: "8px 12px",
                              borderRadius: 8,
                              background: "#f5f5f5",
                              marginBottom: 8,
                              fontSize: 12,
                              color: "#666",
                            }}
                          >
                            Notification {i + 1}: Your portfolio has been updated
                          </li>
                        )
                      )}
                    </ul>
                    {notificationCount > 3 && (
                      <p
                        style={{
                          fontSize: 12,
                          color: "#999",
                          marginTop: 8,
                          textAlign: "center",
                        }}
                      >
                        +{notificationCount - 3} more notifications
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: 24,
                    textAlign: "center",
                    color: "#999",
                    fontSize: 13,
                  }}
                >
                  No notifications
                </div>
              )}
            </div>

            {/* Footer */}
            {notificationCount > 0 && (
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid #f0f0f0",
                  display: "flex",
                  gap: 8,
                }}
              >
                <button
                  onClick={markAsRead}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: "#e53935",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) =>
                    ((e.target as HTMLButtonElement).style.background = "#c62828")
                  }
                  onMouseOut={(e) =>
                    ((e.target as HTMLButtonElement).style.background = "#e53935")
                  }
                >
                  Mark as Read
                </button>
              </div>
            )}
          </div>
        )}

        {/* Backdrop */}
        {isDrawerOpen && (
          <div
            onClick={closeDrawer}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
          />
        )}
      </div>
    );
  },
  args: {
    count: 5,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. In header context
// ─────────────────────────────────────────────────────────────────────────────
export const InHeaderContext: Story = {
  name: "In Header Context",
  render: (args) => (
    <div
      style={{
        width: "100%",
        background: "#f5f5f5",
        padding: "12px 24px",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
          Dashboard
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          <NotificationBell count={args.count} />
        </button>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#e53935",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          A
        </div>
      </div>
    </div>
  ),
  args: {
    count: 3,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Dynamic notification count
// ─────────────────────────────────────────────────────────────────────────────
export const DynamicNotificationCount: Story = {
  name: "Dynamic Notification Count",
  render: () => {
    const [count, setCount] = useState(2);

    return (
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <NotificationBell count={count} />
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setCount(Math.max(0, count - 1))}
              style={{
                padding: "6px 12px",
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              -
            </button>
            <button
              onClick={() => setCount(count + 1)}
              style={{
                padding: "6px 12px",
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              +
            </button>
            <button
              onClick={() => setCount(0)}
              style={{
                padding: "6px 12px",
                background: "#e53935",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Reset
            </button>
          </div>
          <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
            Current: {count}
          </p>
        </div>
      </div>
    );
  },
};
