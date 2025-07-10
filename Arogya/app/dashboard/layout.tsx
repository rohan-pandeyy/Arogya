import { AppSidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Main content area */}
      <main className="flex-1 pt-16 overflow-auto bg-gradient-to-b from-white to-green-100">
        {children}
      </main>
    </div>
  );
}
