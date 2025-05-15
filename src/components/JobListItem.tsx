import { Job, User } from "@prisma/client";
import {
  COMPANY_PLACEHOLDER,
  getBenefitsByValues,
  getLocationsByValues,
  getTagsByValues,
} from "@/utils/const";
import { formatDate, getCompensation, getTimeAgo } from "@/utils/misc";
import JobMoreMenu from "./JobMoreMenu";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";
import JobStatusChip from "./JobStatusChip";

const tag = "my-tag";

export default function JobListItem({ job, user }: { job: Job; user?: User }) {
  const comp = getCompensation(job);
  // TODO: sort locations, tags, benefits by what user selected in search

  // render locations
  const locations = getLocationsByValues(job.locations);
  const displayLocations = locations.slice(0, locations.length > 3 ? 2 : 3);
  let locationsMoreText = "";
  let locationsTooltipText = "";
  if (locations.length > 3) {
    locationsMoreText = `+${locations.length - 2} more`;
    locationsTooltipText = locations
      .slice(2)
      .map((l) => l.label)
      .join(", ");
  }

  const tagsWithBenefits = [
    ...getTagsByValues(job.tags.slice(0, 4)),
    ...getBenefitsByValues(job.benefits.slice(0, 2)),
  ];

  const otherTags = [
    ...getTagsByValues(job.tags.slice(4)),
    ...getBenefitsByValues(job.benefits.slice(2)),
  ];
  let otherTagsMoreText = "";
  let otherTagsTooltipText = "";
  if (otherTags.length) {
    otherTagsMoreText = `+${otherTags.length} more`;
    otherTagsTooltipText = otherTags.map((t) => t.label).join(", ");
  }

  const timeAgo = getTimeAgo(job.postedAt);

  return (
    <Link href={`/jobs/${job.slug}`} className="foc w-full">
      <div className="group flex w-full flex-row items-center gap-4 rounded-md border border-border p-4 hover:bg-primary-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={`${job.companyName} logo`}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full border border-divider bg-white object-contain"
          src={job.companyLogo ?? COMPANY_PLACEHOLDER}
        />
        <div className="flex flex-col gap-1 md:w-[40%]">
          <p className="-mb-0.5 text-base">{job.companyName}</p>
          <h3 className="text-lg font-semibold">{job.position}</h3>
          <div className="flex flex-row flex-wrap gap-1">
            {displayLocations.map((loc) => (
              <span className={tag} key={loc.value}>
                {loc.label}
              </span>
            ))}
            {locationsMoreText && (
              <Tooltip title={locationsTooltipText}>
                <span className={tag}>{locationsMoreText}</span>
              </Tooltip>
            )}
            <span className={tag}>{comp}</span>
          </div>
        </div>
        <div className="hidden w-[30%] flex-row flex-wrap gap-1 md:flex">
          {tagsWithBenefits.map((b) => (
            <span className={tag} key={b.value}>
              {b.label}
            </span>
          ))}
          {otherTagsMoreText && (
            <Tooltip title={otherTagsTooltipText}>
              <span className={tag}>{otherTagsMoreText}</span>
            </Tooltip>
          )}
        </div>
        <Tooltip
          className="ml-auto"
          title={`Posted ${formatDate(job.postedAt)}`}
        >
          <time className="ml-auto text-base">{timeAgo}</time>
        </Tooltip>
        {user ? (
          <div className="ml-auto hidden min-w-[6rem] flex-col gap-2 md:flex">
            <JobStatusChip
              job={job}
              className="ml-auto"
              openEditOnClick={true}
            />
            {/* <Link
              href={`/jobs/edit/${job.slug}`}
              className="my-btn-outline hidden opacity-0 md:block md:group-hover:opacity-100"
            >
              Edit job
            </Link> */}
          </div>
        ) : (
          <button className="my-btn ml-auto hidden opacity-0 md:block md:group-hover:opacity-100">
            Apply
          </button>
        )}
        {!!user && <JobMoreMenu job={job} />}
      </div>
    </Link>
  );
}
