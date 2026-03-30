import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import LoginForm from "@/features/auth/components/LoginForm";

const meta = {
  title: "Features/Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default LoginForm component showing the standard login interface
 * with email/Login ID and password fields.
 */
export const Default: Story = {};

/**
 * Loading state - button shows "Signing in..." text
 * and is disabled to prevent multiple submissions.
 */
export const Loading: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Shows the LoginForm in a loading state. The Sign In button is disabled and displays 'Signing in...' to provide visual feedback to users during authentication.",
      },
    },
  },
};

/**
 * LoginForm with filled form fields - shows how the component
 * looks when user has entered both Login ID and Password.
 */
export const WithFilledFields: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          "Visual representation of LoginForm with filled input fields. Users can see how the form looks when both Login ID and Password are entered.",
      },
    },
  },
};

/**
 * LoginForm with dark background - demonstrates the component's
 * appearance in different background contexts.
 */
export const DarkBackground: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#1a1a1a",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm with minimal spacing - shows the component in a
 * compact layout suitable for mobile or space-constrained environments.
 */
export const CompactLayout: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "400px",
            backgroundColor: "#f5f5f5",
            padding: "10px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm with expanded spacing - shows the component in a
 * spacious layout with generous padding for desktop environments.
 */
export const ExpandedLayout: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "700px",
            backgroundColor: "#f5f5f5",
            padding: "40px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "60px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm with light blue background - demonstrates how the
 * component maintains visibility and contrast on colored backgrounds.
 */
export const LightBlueBackground: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#e3f2fd",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm with gradient background - shows the component over
 * gradient background which is common in modern web design.
 */
export const GradientBackground: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm on transparent background - useful for understanding
 * the component's visual structure without surrounding context.
 */
export const TransparentBackground: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "transparent",
            padding: "20px",
          }}
        >
          <Story />
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm with shadow elevation - demonstrates how drop shadows
 * add depth and visual hierarchy to the login card.
 */
export const WithElevation: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "8px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm with rounded card - shows the component in a card
 * with increased border radius for a more modern appearance.
 */
export const RoundedCard: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
};

/**
 * LoginForm with no card wrapper - shows the component directly
 * without a card background for minimal design approach.
 */
export const NoCardWrapper: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "600px",
            backgroundColor: "#f5f5f5",
            padding: "20px",
          }}
        >
          <Story />
        </div>
      </Provider>
    ),
  ],
};
