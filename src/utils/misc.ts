import { Job } from "@prisma/client";
import { getLocationsByValues, getPrimaryRole, getTagsByValues } from "./const";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "2-digit",
  hour12: false,
});

export function formatDate(date: string | Date) {
  // Sep 30, 23
  const d = date instanceof Date ? date : new Date(date);
  return DATE_FORMATTER.format(d);
}

export function slugify(str: string): string {
  // from here - https://byby.dev/js-slugify-string
  return str
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

const anHourInMs = 60 * 60 * 1000;
const aDayInMs = 24 * anHourInMs;

export function getTimeAgo(date: Date) {
  const milis = new Date().getTime() - date.getTime();
  const hoursDiff = Math.round(milis / anHourInMs);
  if (hoursDiff < 1) return "1h";
  if (hoursDiff < 24) return `${hoursDiff}h`;
  const daysDiff = Math.round(milis / aDayInMs);
  return `${daysDiff}d`;
}

export function getPageTitle(job: Job | null) {
  if (!job) {
    return "Unkown job";
  }
  let locations = getLocationsByValues(job.locations.slice(0, 3))
    .map((l) => l.label)
    .join(", ");
  return `${job.position} at ${job.companyName}. ${locations}`;
}

export function getPageDescription(job: Job | null) {
  if (!job) return "Unknown job";
  let locations = getLocationsByValues(job.locations)
    .map((l) => l.label)
    .join(", ");
  if (locations) locations = locations + ". ";
  const tags = getTagsByValues(job.tags)
    .map((t) => t.value)
    .join(", ");
  const comp = getCompensation(job, false) + " per year";
  return `${job.companyName} is hiring ${
    job.position
  } to join their ${getPrimaryRole(
    job.primaryRole,
  )} team. ${locations}${comp}. ${tags}`;
}

export function getCompensation(job: Job, withEmoji: boolean = true) {
  const em = withEmoji ? "💰 " : "";
  return `${em}$${job.salaryMin / 1000}k - $${job.salaryMax / 1000}k`;
}

// courtesy of ChatGPT
export function isValidEmail(email: string): boolean {
  // This is a simple regex for email validation that should cover most common use cases
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return pattern.test(email);
}

export function getDomain() {
  return (process.env.NEXTAUTH_URL as string) || "https://www.nataindata.com";
}
