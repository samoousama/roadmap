import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getUser } from "@/db/data";
import ProfileForm from "./ProfileForm";
import AppHeader from "@/components/AppHeader";
import { signOut } from "next-auth/react";

export const dynamic = "force-dynamic";
export const revalidate = true;

export const metadata: Metadata = {
  title: "My jobs | Nata in Data",
};

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const user = await getUser(session);
  if (!user) {
    await signOut();
    redirect("/login");
  }
  return (
    <div className=" relative min-h-screen bg-gray-50">
      <AppHeader />
      <div className="my-container mx-auto mt-8 px-4 pb-12 sm:mt-12">
        <div className="mx-auto flex max-w-xl flex-col">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 overflow-hidden">
            <h2 className="text-lg">Profile</h2>
            <p>{user.email}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Update your photo and personal details here.
          </p>
          <div className="mt-6 rounded-md bg-white px-4 py-6 shadow-sm sm:px-6">
            <ProfileForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
