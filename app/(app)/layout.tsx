import DashboardFooter from "@/components/layout/DashboardFooter";
import DashboardHeader from "@/components/layout/DashboardHeader";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />

      <main className="flex-1 bg-surface">{children}</main>

      <DashboardFooter />
    </div>
  );
}
