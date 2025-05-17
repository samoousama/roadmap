import Header from "@/components/home/Header";
import { findJobs, findSitemapJobs, getJob } from "@/db/data";
import { redirect } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import "@/app/styles/quill-styles.css";
import "./JobDetails.css";
import {
  getPageTitle,
  getTimeAgo,
  formatDate,
  getCompensation,
  isValidEmail,
  getPageDescription,
} from "@/utils/misc";
import Link from "next/link";
import {
  COMPANY_PLACEHOLDER,
  JobStatus,
  Search,
  getBenefitsByValues,
  getEmploymentType,
  getLocationsByValues,
  getPrimaryRole,
  getTagsByValues,
} from "@/utils/const";
import Image from "next/image";
import JobListItem from "@/components/JobListItem";

export const revalidate = 86_400; // 60 * 60 * 24; revalidate at most every day

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params: { slug } }: Props) {
  const job = await getJob(slug);
  return {
    title: getPageTitle(job),
    description: getPageDescription(job),
  };
}

export async function generateStaticParams() {
  const jobs = await findSitemapJobs();
  return jobs.map((j) => ({
    slug: j.slug,
  }));
}

export default async function JobDetails({ params: { slug } }: Props) {
  const job = await getJob(slug);
  if (!job) {
    redirect("/jobs");
  }

  const similarJobs = await findJobs(
    job.locations,
    [job.primaryRole],
    [],
    [],
    0,
    "",
    job.id,
    20,
  );
  const isClosed =
    job.status === JobStatus.Closed.value ||
    job.status === JobStatus.Rejected.value;

  const applyLink = isValidEmail(job.applyUrlOrEmail)
    ? `mailto:${job.applyUrlOrEmail}?subject=${job.position} at ${job.companyName} | Nata in Data`
    : job.applyUrlOrEmail;

  const applyComponent = isClosed ? (
    <button className="my-btn mt-2 max-w-fit" disabled>
      Position is closed
    </button>
  ) : (
    <Link
      href={applyLink}
      target="_blank"
      className="my-btn mt-2 max-w-fit"
      rel="nofollow noopener noreferrer"
    >
      Apply for this position
    </Link>
  );

  const companyLogo = job.companyLogo ?? COMPANY_PLACEHOLDER;

  const title = isClosed ? `${job.position} [Closed]` : job.position;

  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <div className="my-container mx-auto mt-2 px-6 pb-12 sm:mt-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <div>
            <Link className="my-btn-link font-normal" href="/jobs">
              All jobs
            </Link>{" "}
            /{" "}
            <Link
              className="my-btn-link font-normal"
              href={`/jobs?${Search.Role}=${job.primaryRole}`}
              prefetch={false}
            >
              {getPrimaryRole(job.primaryRole)}
            </Link>
          </div>
          <div className="flex flex-row gap-6">
            <div className="flex flex-1 flex-col gap-2">
              <p className="mt-2 text-sm text-placeholder">
                Posted {getTimeAgo(job.postedAt)} ago (
                {formatDate(job.postedAt)})
              </p>
              <div className="flex items-center gap-3 md:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`${job.companyName} logo`}
                  src={companyLogo}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-divider object-contain"
                />
                <Link
                  className="flex flex-col text-lg"
                  href={job.companyWebsite ?? job.companyLinkedIn ?? applyLink}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  {job.companyName}
                </Link>
                <span className="text-sm text-placeholder">
                  {job.companyHQ}
                </span>
              </div>
              <h1 className="text-3xl font-semibold">{title}</h1>
              <div className="mt-2 flex flex-row flex-wrap gap-2">
                {/* <span className="my-tag">{getPrimaryRole(job.primaryRole)}</span> */}
                {getLocationsByValues(job.locations).map((l) => (
                  <span className="my-tag" key={l.value}>
                    {l.label}
                  </span>
                ))}
                <span className="my-tag">{getCompensation(job)}</span>
                <span className="my-tag">
                  {getEmploymentType(job.employmentType)}
                </span>
                {getTagsByValues(job.tags).map((t) => (
                  <span className="my-tag" key={t.value}>
                    {t.label}
                  </span>
                ))}
              </div>
              <div className="my-quill-job-details ql-snow mt-1 text-text">
                <div
                  className="ql-editor"
                  dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                ></div>
              </div>
              <h2 className="mt-4 text-2xl text-text">
                Salary and compensation
              </h2>
              <span>
                ${job.salaryMin.toLocaleString("en-US")} - $
                {job.salaryMax.toLocaleString("en-US")} per year
              </span>
              <h2 className="mt-4 text-2xl text-text">Benefits</h2>
              {job.benefits?.length ? (
                <div className="mt-2 flex flex-row flex-wrap gap-2">
                  {getBenefitsByValues(job.benefits).map((b) => (
                    <span className="my-tag" key={b.value}>
                      {b.label}
                    </span>
                  ))}
                </div>
              ) : (
                <span>No benefits provided.</span>
              )}
              {job.howToApply && !isClosed ? (
                <>
                  <h2 className="mt-4 text-2xl text-text">How to apply</h2>
                  <span>{job.howToApply}</span>
                </>
              ) : null}
              {applyComponent}
              <div className="my-10 h-[1px] bg-divider"></div>
              <div className="flex flex-col gap-2">
                <span className="text-lg">
                  Any feedback or want to report a concern?
                </span>
                <span className="text-placeholder">
                  Help us maintain the quality of jobs posted on Nata in Data!
                </span>
                <Link
                  href={`mailto:hi@nataindata.com?subject=Feedback about the job&body=There are issues with this job - https://nataindata.com/jobs/${job.slug}`}
                  className="my-btn-outline mt-2 max-w-fit"
                >
                  Contact us
                </Link>
              </div>
            </div>
            <div className="sticky top-6 hidden h-fit max-w-[18rem] shrink-0 flex-col items-center gap-4 rounded-md border border-border px-6 py-8 md:flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`${job.companyName} logo`}
                src={companyLogo}
                width={128}
                height={128}
                className="h-32 w-32 rounded-full border border-divider object-contain"
              />
              <span className="text-2xl font-semibold">{job.companyName}</span>
              <div className="flex flex-col items-center gap-1">
                {job.companyHQ ? (
                  <span className="flex flex-row items-center gap-1">
                    <Image
                      src="/images/map-pin.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    {job.companyHQ}
                  </span>
                ) : null}
                {job.companyLinkedIn ? (
                  <Link
                    className="my-btn-link flex flex-row items-center gap-1 font-normal"
                    href={job.companyLinkedIn}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <Image
                      src="/images/linkedin.svg"
                      alt="linkedin"
                      width={20}
                      height={20}
                    />
                    LinkedIn
                  </Link>
                ) : null}
                {job.companyWebsite ? (
                  <Link
                    className="my-btn-link flex flex-row items-center gap-1 font-normal"
                    href={job.companyWebsite}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    <Image
                      src="/images/globe.svg"
                      alt="globe"
                      width={20}
                      height={20}
                    />
                    Website
                  </Link>
                ) : null}
              </div>
              {applyComponent}
            </div>
          </div>
          {similarJobs.length > 0 && (
            <div className="mt-6 flex flex-col gap-4">
              <h2 className="mt-4 text-2xl text-text">Similar jobs</h2>
              {similarJobs.map((j) => (
                <JobListItem job={j} key={j.id} />
              ))}
              <Link href="/jobs" className="my-btn-outline max-w-fit">
                View all jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

