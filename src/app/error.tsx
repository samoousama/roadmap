"use client";

import Header from "@/components/home/Header";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex h-full min-h-[400px] max-w-7xl flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong!</h1>
        <p>Sorry, there was a problem on our end. 🙈</p>
        <p>We&apos;re working to fix it 🛠️</p>
        <button
          className="my-btn mt-4"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <p>or</p>
        <Link className="my-btn-secondary" href="/">
          Return Home
        </Link>
      </div>
    </div>
  );
}
