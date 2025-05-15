import Header from "@/components/home/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="mx-auto flex h-full min-h-[400px] max-w-7xl flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-3xl font-semibold">Page not Found</h1>
        <p>Sorry, but the page you were looking for could not be found.</p>
        <p>Check if you typed the URL correctly, or</p>
        <Link className="my-btn-secondary mt-4" href="/">
          Return home
        </Link>
      </div>
    </div>
  );
}
