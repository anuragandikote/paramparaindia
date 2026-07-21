import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { enquiryService } from "@/services/enquiry.service";
import { PageHeader } from "@/components/common/page-header";
import { SearchBar } from "@/components/common/search-bar";
import { Pagination } from "@/components/common/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock } from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  IN_PROGRESS:
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  RESOLVED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  CLOSED: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
};

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || undefined;

  const result = await enquiryService.list({
    page,
    limit: 20,
    search,
    userId: (session!.user as any).id,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enquiries"
        description={`${result.total} total enquiries`}
      />

      <Suspense>
        <SearchBar placeholder="Search enquiries..." />
      </Suspense>

      {result.data.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">
              {search ? "No enquiries match your search." : "No enquiries yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {result.data.map((enquiry) => (
            <Link key={enquiry.id} href={`/admin/enquiries/${enquiry.id}`}>
              <Card className="transition-colors hover:bg-accent">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{enquiry.name}</h3>
                      <Badge className={statusColors[enquiry.status] || ""}>
                        {enquiry.status}
                      </Badge>
                      <Badge variant="outline">{enquiry.type}</Badge>
                    </div>
                    {enquiry.subject && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {enquiry.subject}
                      </p>
                    )}
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {enquiry.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {enquiry.email && (
                      <span className="hidden items-center gap-1 sm:flex">
                        <Mail className="h-3 w-3" />
                        {enquiry.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(enquiry.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Suspense>
        <Pagination currentPage={page} totalPages={result.totalPages} />
      </Suspense>
    </div>
  );
}
