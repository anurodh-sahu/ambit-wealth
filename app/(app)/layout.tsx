import DashboardFooter from "@/components/layout/DashboardFooter";
import DashboardHeader from "@/components/layout/DashboardHeader";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <DashboardHeader />
      <main className="flex-1 w-full bg-surface overflow-y-auto">
        {children}
      </main>
      <DashboardFooter />
    </div>
  );
}
