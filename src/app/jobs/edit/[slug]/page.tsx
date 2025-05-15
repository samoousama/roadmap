import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import NewJobForm from "@/components/NewJobForm";
import { canEditJob, getJob, getUser } from "@/db/data";
import { Metadata } from "next";
import { getCompany } from "@/db/data";
import { getPageTitle, getPageDescription } from "@/utils/misc";
import Link from "next/link";
import JobStatusChip from "@/components/JobStatusChip";
import JobMoreMenu from "@/components/JobMoreMenu";
import { JobStatus } from "@/utils/const";
import { UserRole } from "@prisma/client";
import AdminJobSection from "@/app/admin/AdminJobSection";

export const dynamic = "force-dynamic";
export const revalidate = true;

type Props = {
  params: { slug: string };
  // searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const job = await getJob(slug);
  return {
    title: getPageTitle(job),
    description: getPageDescription(job),
  };
}

export default async function EditJob({ params }: Props) {
  const jobSlug = params.slug;
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await getUser(session);

  const isAdmin = user?.role === UserRole.SuperAdmin;

  const company = await getCompany(session);
  const job = await getJob(jobSlug, true);
  if (!job || !canEditJob(user, job)) {
    redirect("/my-jobs");
  }

  const canBeSubmitted =
    job.status === JobStatus.Draft.value ||
    job.status === JobStatus.Rejected.value;

  return (
    <div className="relative min-h-screen bg-gray-50">
      <AppHeader pathname="/jobs/new" />
      <div className="my-container mx-auto mt-8 px-4 pb-12 sm:mt-12">
        <div className="mx-auto flex max-w-5xl flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Edit job</h2>
            {job ? (
              <div className="flex items-center gap-4">
                <Link className="my-btn-text" href={`/jobs/${job.slug}`}>
                  Preview ↗
                </Link>
                <JobStatusChip job={job} />
                <JobMoreMenu job={job} showEdit={false} />
              </div>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Make edits to your job post.
            {canBeSubmitted ? " Submit for review to get published." : ""}
          </p>
          <div className="-mx-4 mt-6 rounded-md bg-white px-4 py-6 shadow-sm sm:mx-0 sm:px-6">
            <NewJobForm company={company} job={job} user={user} />
          </div>
          {isAdmin && <AdminJobSection job={job} />}
        </div>
      </div>
    </div>
  );
}
