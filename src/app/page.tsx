import Image from "next/image";
import Link from "next/link";
import {
  // ChartBarIcon,
  MicrophoneIcon,
  PencilSquareIcon,
  CircleStackIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import Header from "@/components/home/Header";
// import BookSection from "@/components/home/BookSection";
import JobsSection from "@/components/home/JobsSection";
import VideoSection from "@/components/home/VideoSection";
import { formatDate } from "@/utils/misc";
import { getPosts } from "@/db/ghost";

export const revalidate = 86_400; // 60 * 60 * 24; revalidate at most every day

const resources = [
  {
    name: "Fundamentals of Data Engineering",
    description:
      "Free eBook on how to apply the concepts of data generation, ingestion, orchestration, transformation, and much more",
    icon: BookOpenIcon,
    url: "https://bit.ly/de-fundamentals-book",
  },
  // {
  //   name: "Data Analytics Bootcamp",
  //   description:
  //     "Data Analytics and Business Intelligence Training Course from Syntax",
  //   icon: ChartBarIcon,
  //   url: "http://bit.ly/natalie200",
  // },
  {
    name: "Codecademy selected courses",
    description:
      "As a Codecademy ambassador, I have a separate page with my favorite course selection. Check it out!",
    icon: ComputerDesktopIcon,
    url: "https://try.codecademy.com/nataindata?utm_medium=influencer&utm_source=influencer&utm_campaign=nataindata",
  },
  {
    name: "Job interview preparation",
    description:
      "Invest in yourself and land your dream job with Interview Query",
    icon: MicrophoneIcon,
    url: "https://bit.ly/prepare-for-job-interviews",
  },
  {
    name: "ChatGPT Prompt Engineering",
    description:
      "Learn prompt engineering best practices for application development",
    icon: PencilSquareIcon,
    url: "https://bit.ly/chatgpt-course-by-openai",
  },
  {
    name: "CV review",
    description: "Want me to review your CV? Here is a place for you",
    icon: CircleStackIcon,
    url: "https://www.nataindata.com/blog/cv-review/",
  },
  {
    name: "Code with me",
    description: "Your space to focus and get things done with Life At",
    icon: MusicalNoteIcon,
    url: "https://bit.ly/code-with-me-lifeat",
  },
];

const links = [
  {
    title: "Follow @nataindata on Instagram",
    url: "https://www.instagram.com/nataindata/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
      </svg>
    ),
  },
  {
    title: "Follow @nataindata on Youtube",
    url: "https://www.youtube.com/@nataindata/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
  },
];

const imgPreview = [
  "/images/preview_02.png",
  "/images/preview_01.png",
  "/images/preview_04.jpeg",
  "/images/preview_05.jpeg",
  "/images/preview_03.jpeg",
];

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      {/* Hero section */}
      <Header />
      <section className="mx-auto max-w-7xl sm:px-6" id="home">
        <div className="relative isolate overflow-hidden bg-gray-50 px-6 pt-16 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
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
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold text-text sm:text-4xl">
              2023 Data Engineering Roadmap
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              100+ people got it. 105+ tools and concepts needed to become Data
              Engineer.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
              <a
                href="https://www.nataindata.com/blog/data-engineering-roadmap/"
                className="my-btn"
              >
                Get roadmap
              </a>
              <a href="#resources" className="my-btn-link group">
                More resources
                <span className="ml-1 transition-all duration-200 group-hover:ml-2">
                  →
                </span>
              </a>
            </div>
          </div>
          <div className="mt-8 h-full max-h-96 w-full">
            <Image
              className="mx-auto transition-all duration-200 hover:scale-105"
              src="/images/nata_main.png"
              alt="Nata in Data"
              width={1512}
              height={1604}
              priority={true}
            />
          </div>
        </div>
      </section>

      {/* <BookSection /> */}
      <JobsSection />

      {/* More resources section  */}
      <section className="bg-white py-12" id="resources">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-pink-800">
              Learn faster
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Jumpstart your Data Engineer career
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Useful resources to learn key concepts from basics to advanced
              level, and become a rockstar Data Engineer
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl lg:mt-10 lg:max-w-4xl">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-6">
              {resources.map((feature) => (
                <a
                  href={feature.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  key={feature.name}
                  className="duratino-200 foc relative rounded-lg p-2 pl-16 transition hover:scale-105 hover:bg-primary-50"
                >
                  <div className="text-base font-semibold leading-7 text-text">
                    <div className="absolute left-2 top-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </div>
                  <div className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {posts && posts.length && (
        <section id="blog-preview" className="pb-8 md:pt-12">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center lg:px-8">
              <p className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
                Latest articles
              </p>
              <p className="mt-3 text-lg leading-8 text-gray-600">
                Useful insights and resources the blog to learn from
              </p>
            </div>
            <div className="mt-8 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  href={p.url!}
                  key={p.title}
                  className="foc group relative col-span-1 flex w-full flex-col items-start gap-2"
                >
                  <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 rounded-lg bg-primary-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6"></div>
                  <div className="relative aspect-video w-full overflow-clip rounded-lg">
                    <Image
                      className="object-cover"
                      src={p.feature_image!}
                      fill={true}
                      alt={p.feature_image_alt || "blog preview image"}
                      loading="lazy"
                    />
                  </div>

                  <h2 className="z-10 line-clamp-2 text-lg font-semibold tracking-tight text-zinc-800">
                    {p.title}
                  </h2>
                  <p className="z-10 line-clamp-4 text-sm text-zinc-600">
                    {p.excerpt}
                  </p>
                  <div className="z-10 flex w-full justify-between text-sm text-zinc-400">
                    {p.primary_tag ? <span>{p.primary_tag.name!}</span> : null}
                    <time dateTime={p.published_at!}>
                      {formatDate(p.published_at!)}
                    </time>
                  </div>

                  <div className="z-10">
                    <button className="my-btn-link mt-2 text-sm">
                      Read article
                      <span className="ml-1 transition-all duration-200 group-hover:ml-2">
                        →
                      </span>
                    </button>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mx-auto mt-10 flex w-full sm:justify-center">
              <Link href="/blog" className="my-btn group">
                Browse all articles
                <span className="ml-1 transition-all duration-200 group-hover:ml-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <VideoSection />

      <section className="pb-8 md:pt-12" id="follow">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Get in touch
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Follow me for more useful content and memes.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="foc flex items-center justify-start gap-2 rounded-md py-4 transition-all duration-200 hover:scale-105 hover:bg-primary-50/70 hover:text-primary-dark sm:justify-center"
              >
                {link.icon}
                <span>{link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="photos" className="mb-12">
        <div className="flex justify-center gap-6 overflow-hidden py-6 sm:gap-8">
          {imgPreview.map((s, i) => {
            const c = i % 2 === 0 ? "rotate-3" : "-rotate-3";
            return (
              <div
                key={s}
                className={`relative aspect-[8/10] w-44 flex-none overflow-hidden rounded-xl border-[1px] border-gray-200 bg-primary-50 transition-all duration-200 hover:rotate-0 hover:scale-110 sm:w-72 sm:rounded-2xl ${c}`}
              >
                <Image
                  src={s}
                  className="object-cover"
                  alt=""
                  fill
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </section>

      <footer id="footer">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-start gap-6 px-6 pb-20 pt-0 md:flex-row md:justify-between md:pt-12">
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#home" className="my-btn-link">
              Home
            </Link>
            <Link href="#resources" className="my-btn-link">
              Resources
            </Link>
            <Link href="/blog" className="my-btn-link">
              Blog
            </Link>
            <Link href="#follow" className="my-btn-link">
              Contact
            </Link>
          </div>
          <div>
            <p className="text-center text-base text-zinc-500">
              © {new Date().getFullYear()}. All rights reserved.{" "}
              <Link
                href="/legal/privacy"
                className="foc hover:text-primary-700"
              >
                Privacy
              </Link>
              .{" "}
              <Link href="/legal/terms" className="foc hover:text-primary-700">
                Terms
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
