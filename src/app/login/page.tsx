import Image from "next/image";
import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Nata in Data",
};

export default async function Login() {
  const session = await getServerSession(authOptions);
  // console.log("session: ", session);
  if (session) {
    redirect("/my-jobs");
  }

  return (
    <div className="relative overflow-hidden px-4">
      <svg viewBox="0 0 1024 1024" className="grad-primary" aria-hidden="true">
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fillOpacity="0.5"
        />
        <defs>
          <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
            <stop stopColor="#ec4899" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
      <div className="mx-auto min-h-screen w-full max-w-sm py-12 sm:pt-24">
        <Image
          src="/images/logo.png"
          width={48}
          height={48}
          alt="logo"
          className="mx-auto"
        />
        <h1 className="mt-6 text-center text-3xl font-semibold">
          Log in to your account
        </h1>
        <p className="mt-3 text-center text-gray-500">
          Authorize to post a job.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
