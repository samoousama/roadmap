import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import { getCompany, getUser } from "@/db/data";
import CompanyForm from "./CompanyForm";

export const dynamic = "force-dynamic";
export const revalidate = true;

export const metadata: Metadata = {
  title: "Company | Nata in Data",
};

export default async function Company() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await getUser(session);
  const company = await getCompany(session);

  return (
    <div className=" relative min-h-screen bg-gray-50">
      <AppHeader pathname="/company" />
      <div className="my-container mx-auto mt-8 px-4 pb-12 sm:mt-12">
        <div className="mx-auto flex max-w-xl flex-col">
          <h2 className="text-lg">Company</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your company details here. These will be default values for
            your jobs.
          </p>
          <CompanyForm company={company} user={user} />
        </div>
      </div>
    </div>
  );
}
