import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import { getMyJobs, getUser } from "@/db/data";
import JobListItem from "@/components/JobListItem";

export const dynamic = "force-dynamic";
export const revalidate = true;

export const metadata: Metadata = {
  title: "My jobs | Nata in Data ",
};

export default async function MyJobs() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const jobs = await getMyJobs(session);
  const user = await getUser(session);

  return (
    <div className=" relative min-h-screen bg-gray-50">
      <AppHeader pathname="/my-jobs" />
      <div className="my-container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">My jobs</h2>
          {jobs.length > 0 && (
            <Link href="/jobs/new" className="my-btn max-w-fit">
              New job
            </Link>
          )}
        </div>
        <div className="mt-6 flex flex-col items-center gap-4">
          {jobs.map((j) => (
            <JobListItem job={j} key={j.id} user={user} />
          ))}
          {jobs.length === 0 && (
            <>
              <p className="text-center text-lg">
                You don&apos;t have any jobs yet.
              </p>
              <p className="max-w-3xl text-center text-placeholder">
                Create your first job and reach the most qualified people in
                Data Engineering, Data Science, AI/ML Software Development
                (Frontend, Backend), Design, Marketing, Testing and more.
              </p>
              <Link href="/jobs/new" className="my-btn mt-4 max-w-fit">
                Create job
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
