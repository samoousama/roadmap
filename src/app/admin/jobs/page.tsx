import Header from "@/components/home/Header";
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill-styles.css";
import { Search } from "@/utils/const";
import { getServerSession } from "next-auth";
import { findJobs, getUser } from "@/db/data";
import { UserRole } from "@prisma/client";
import JobListItem from "@/components/JobListItem";
import JobSearch from "@/components/JobSearch";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata() {
  return {
    title: "Admin: Jobs",
    description: "Admin Jobs",
  };
}

function toArray(search: string | string[] | undefined): string[] {
  if (!search) return [];
  if (typeof search === "string") return [search];
  return search;
}

export default async function AdminJobs({ searchParams }: Props) {
  const locations = toArray(searchParams[Search.Location]);
  const roles = toArray(searchParams[Search.Role]);
  const tags = toArray(searchParams[Search.Tag]);
  const benefits = toArray(searchParams[Search.Benefit]);

  const urlSort = toArray(searchParams[Search.Sort])[0];
  const status = toArray(searchParams[Search.Status])[0];

  let comp = 0;
  try {
    comp = parseInt(toArray(searchParams[Search.Compensation])[0]);
    if (isNaN(comp)) comp = 0;
  } catch {}

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await getUser(session);
  const isAdmin = user && user.role === UserRole.SuperAdmin;
  if (!isAdmin) {
    redirect("/jobs");
  }

  const jobs = await findJobs(
    locations,
    roles,
    tags,
    benefits,
    comp,
    urlSort,
    undefined,
    undefined,
    status ? status : undefined,
  );

  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <div className="my-container mx-auto mt-2 px-6 pb-12 sm:mt-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="hidden text-center text-2xl font-medium sm:block">
              Admin: Data jobs all over the world
            </h1>
            <h1 className="text-center text-2xl font-medium sm:hidden">
              Data Engineering jobs
            </h1>
            <h2 className="text-md text-center text-placeholder">
              Find your dream job now. Jobs for Data Engineers, Data Scientists, Data Analysts, ML specialists. Let’s go!🥁
            </h2>
          </div>
          <JobSearch
            locations={locations}
            tags={tags}
            roles={roles}
            benefits={benefits}
            sort={urlSort}
            comp={comp}
            isAdmin={isAdmin}
            status={status}
          />
          <div className="mt-6 flex flex-col gap-4">
            {jobs.map((j) => (
              <JobListItem job={j} key={j.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
