import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify email | Nata in Data",
};

export default function VerifyRequest() {
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
          Check your email
        </h1>
        <p className="mt-8 text-center text-gray-500">
          A sign in link has been sent to your email address.
        </p>
        <div className="my-8">
          <p className="text-center text-gray-500">
            Back to{" "}
            <Link href="/login" className="my-btn-text">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
