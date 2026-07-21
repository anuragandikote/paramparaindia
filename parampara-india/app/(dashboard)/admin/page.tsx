import { PageHeader } from "@/components/common/page-header";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome to the Parampara India CRM." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats cards placeholder */}
      </div>
    </div>
  );
}
