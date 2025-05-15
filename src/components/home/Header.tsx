import Link from "next/link";

export default function Header() {
  return (
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/" className="foc text-2xl font-semibold">
            ⚡️ Nata in Data
          </Link>
            <div className="hidden lg:flex lg:gap-x-12 items-center">
                <Link href="/" className="text-sm font-semibold uppercase leading-6 text-gray-900">Home</Link>
                <Link href="/data-engineering-roadmap" className="text-sm font-semibold uppercase leading-6 text-gray-900">RoadMap</Link>
                <Link href="/blog" className="text-sm font-semibold uppercase leading-6 text-gray-900">Blog</Link>
                <Link href="/jobs" className="text-sm font-semibold uppercase leading-6 text-gray-900">Jobs</Link>
            </div>
          {/*<Link href="/blog" className="my-btn-link">*/}
          {/*  Blog*/}
          {/*</Link>*/}
        </div>
      </div>
  );
}