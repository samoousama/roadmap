"use client";

import { getJobStatus } from "@/utils/const";
import { Job } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  job: Job;
  className?: string;
  openEditOnClick?: boolean;
};

export default function JobStatusChip({
  job,
  className,
  openEditOnClick = false,
}: Props) {
  const router = useRouter();
  const status = getJobStatus(job.status);
  return (
    <span
      onClick={(e) => {
        if (openEditOnClick) {
          e.preventDefault();
          router.push(`/jobs/edit/${job.slug}`);
        }
      }}
      className={`w-fit rounded-md px-2 py-0.5 text-base font-normal ${
        className ? className : ""
      }`}
      style={{
        backgroundColor: status.color,
      }}
    >
      {status.label}
    </span>
  );
}
