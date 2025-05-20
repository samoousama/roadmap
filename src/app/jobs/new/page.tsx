import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import NewJobForm from "@/components/NewJobForm";
import { Metadata } from "next";
import { getCompany, getUser } from "@/db/data";

export const dynamic = "force-dynamic";
export const revalidate = true;

export const metadata: Metadata = {
  title: "New job | Nata in Data ..",
};
export default async function NewJob() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await getUser(session);
  const company = await getCompany(session);
  return (
    <div className="relative min-h-screen bg-gray-50">
      <AppHeader pathname="/jobs/new" />
      <div className="my-container mx-auto mt-8 px-4 pb-12 sm:mt-12">
        <div className="mx-auto flex max-w-5xl flex-col">
          <h2 className="text-lg">New job</h2>
          <p className="mt-1 text-sm text-gray-500 p-0 ">
            Create a new job and reach the largest Data Engineering community on
            the web.
          </p>
          <div className="-mx-4 mt-6 rounded-md bg-white px-4 py-6 shadow-sm sm:mx-0 sm:px-6">
            <NewJobForm company={company} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
