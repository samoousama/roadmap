import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getUser } from "@/db/data";
import ProfileMenu from "./ProfileMenu";

const link = "my-btn-link-hover";
const activeLink = " bg-primary-50 text-primary-700";

export default async function AppHeader({
  pathname = "",
}: {
  pathname?: String;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = await getUser(session);

  return (
    <div className="sticky top-0 z-50 w-full bg-white py-4">
      <nav className="my-container mx-auto flex items-center justify-between gap-2 px-4">
        <div className="flex flex-wrap items-center gap-x-2">
          <Link href="/" className="foc mr-2 text-2xl font-semibold sm:mr-4">
            <span className="hidden sm:block">⚡️ Nata in Data</span>
            <span className="sm:hidden">⚡️</span>
          </Link>
          <Link
            // href={`/my-jobs?d=${new Date().getTime()}`}
            href="/my-jobs"
            className={`${link}${
              pathname.indexOf("/my-jobs") >= 0 ? activeLink : ""
            }`}
          >
            My jobs
          </Link>
          <Link
            href="/company"
            className={`${link}${
              pathname.indexOf("/company") >= 0 ? activeLink : ""
            }`}
          >
            Company
          </Link>
        </div>
        <ProfileMenu user={user} />
      </nav>
    </div>
  );
}
