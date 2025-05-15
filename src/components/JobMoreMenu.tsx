"use client";
import Image from "next/image";
import { Job } from "@prisma/client";
import Menu from "@mui/material/Menu";
import Dialog from "@mui/material/Dialog";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { closeJob, deleteJob, submitJobForReview } from "@/db/actions";
import { JobStatus } from "@/utils/const";

type Props = {
  job: Job;
  showEdit?: boolean;
};

export default function JobMoreMenu({ job, showEdit = true }: Props) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isDelDialogOpen, setIsDelDialogOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isCloseJobOpen, setIsCloseJobOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isMenuOpen = Boolean(anchorEl);

  const showSubmitForReview =
    job.status === JobStatus.Draft.value ||
    job.status === JobStatus.Rejected.value;

  const showCloseJob = job.status === JobStatus.Published.value;

  const onMenuClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // stop propagation
    setAnchorEl(null);
  };
  const onEdit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`/jobs/edit/${job.slug}`);
  };

  // Delete action
  const onDelDialogClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDelDialogOpen(false);
  };
  const onDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDelDialogOpen(true);
  };
  const onDeleteConfirmed = async (e: React.MouseEvent<HTMLElement>) => {
    onDelDialogClose(e);
    startTransition(() => {
      deleteJob(job.slug)
        .then(() => toast.success("Job deleted 🗑️"))
        .catch((e) => {
          console.error(e);
          toast.error("Oops, could not delete the job");
        });
    });
  };

  // Submit for review action
  const onSubmitForReview = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsSubmitOpen(true);
  };
  const onSubmitClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsSubmitOpen(false);
  };
  const onSubmitConfirmed = async (e: React.MouseEvent<HTMLElement>) => {
    onSubmitClose(e);
    startTransition(() => {
      submitJobForReview(job.slug)
        .then(() => {
          toast.success("Job submitted for review");
        })
        .catch((e) => {
          console.error(e);
          toast.error("Oops, could not submit job for review");
        });
    });
  };

  // Close job action
  const onCloseJob = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsCloseJobOpen(true);
  };
  const onCloseJobClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsCloseJobOpen(false);
  };
  const onCloseJobConfirmed = async (e: React.MouseEvent<HTMLElement>) => {
    onCloseJobClose(e);
    startTransition(() => {
      closeJob(job.slug)
        .then(() => {
          toast.success("Job closed");
        })
        .catch((e) => {
          console.error(e);
          toast.error("Oops, could not close the job");
        });
    });
  };

  return (
    <>
      <button
        className="foc h-6 w-6 shrink-0 rounded-md py-0.5 outline-[1px] outline-border hover:outline"
        onClick={(e) => {
          e.preventDefault(); // stop propagating
          setAnchorEl(e.currentTarget);
        }}
      >
        <Image
          src="/images/more-vertical.svg"
          width={20}
          height={20}
          alt="more menu"
          className="mx-auto"
        />
      </button>
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        className="mt-2"
        onClose={onMenuClose}
        onClick={onMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="my-menu flex flex-col">
          {showEdit && (
            <button className="my-btn-menu" onClick={onEdit}>
              Edit
            </button>
          )}
          {showSubmitForReview && (
            <button className="my-btn-menu" onClick={onSubmitForReview}>
              Submit for review
            </button>
          )}
          {showCloseJob && (
            <button className="my-btn-menu" onClick={onCloseJob}>
              Close job
            </button>
          )}
          <button className="my-btn-menu danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </Menu>
      <Dialog open={isDelDialogOpen} onClose={onDelDialogClose} maxWidth="sm">
        <div
          className="flex flex-col gap-4 p-6"
          onClick={(e) => e.preventDefault()}
        >
          <h2 className="text-xl font-semibold">Delete the job?</h2>
          <p>
            Are you sure you want to delete the job <b>{job.position}</b>? This
            action cannot be undone.
          </p>
          <div className="flex flex-row justify-end gap-4">
            <button
              className="my-btn-secondary"
              onClick={onDelDialogClose}
              autoFocus
            >
              Cancel
            </button>
            <button className="my-btn danger" onClick={onDeleteConfirmed}>
              Delete
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog open={isSubmitOpen} onClose={onSubmitClose} maxWidth="sm">
        <div
          className="flex flex-col gap-4 p-6"
          onClick={(e) => e.preventDefault()}
        >
          <h2 className="text-xl font-semibold">Submit for review?</h2>
          <div>
            <p>
              Do you want to submit the job <b>{job.position}</b> for review?
            </p>
            <br />
            <p>
              We verify all job posts on our website, to ensure quality and
              trust. You can still continue editing our job while it&apos;s in
              review of when published.
            </p>
            <br />
            <p>
              We&apos;ll notify you by email when your job is approved and
              published on Nata in Data Jobs 🙌
            </p>
            <br />
            <p className="text-sm text-placeholder">
              Review usually takes up to 1-2 business days.
            </p>
          </div>
          <div className="flex flex-row justify-end gap-4">
            <button
              className="my-btn-secondary"
              onClick={onSubmitClose}
              autoFocus
            >
              Cancel
            </button>
            <button className="my-btn" onClick={onSubmitConfirmed}>
              Submit for review
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog open={isCloseJobOpen} onClose={onCloseJobClose} maxWidth="sm">
        <div
          className="flex flex-col gap-4 p-6"
          onClick={(e) => e.preventDefault()}
        >
          <h2 className="text-xl font-semibold">Close job?</h2>
          <div>
            <p>
              Do you want to close the job <b>{job.position}</b>?
            </p>
            <br />
            <p>Closing the job will remove it from search for candidates</p>
            <br />
            <p className="text-sm text-placeholder">
              Note: you won&apos;t be able to re-open this job again. To open a
              new position — create a new job for it.
            </p>
          </div>
          <div className="flex flex-row justify-end gap-4">
            <button
              className="my-btn-secondary"
              onClick={onCloseJobClose}
              autoFocus
            >
              Cancel
            </button>
            <button className="my-btn" onClick={onCloseJobConfirmed}>
              Close job
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
