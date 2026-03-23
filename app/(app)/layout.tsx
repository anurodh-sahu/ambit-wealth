import DashboardFooter from "@/components/layout/DashboardFooter";
import DashboardHeader from "@/components/layout/DashboardHeader";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[url('/dashboard-bg.png')] bg-cover bg-center">
      <DashboardHeader />

      <main className="flex-1 w-full max-w-[var(--container-page)] mx-auto px-4 md:px-0 bg-surface">
        {children}
      </main>

      <DashboardFooter />
    </div>
  );
}
