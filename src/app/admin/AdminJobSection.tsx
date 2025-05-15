"use client";

import { approveJob, adminChangeJobStatus, rejectJob } from "@/db/actions";
import { AllJobStatus, JobStatus } from "@/utils/const";
import Dialog from "@mui/material/Dialog";
import { Job, User } from "@prisma/client";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

type Props = {
  job: Job & { user: User };
};

export default function AdminJobSection({ job }: Props) {
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const user = job.user;
  const canApprove = job.status === JobStatus.InReview.value;
  const canReject =
    job.status === JobStatus.InReview.value ||
    job.status === JobStatus.Published.value;

  // Approve action
  const onApproveClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsApproveOpen(false);
  };
  const onApproveConfirmed = (e: React.MouseEvent<HTMLElement>) => {
    onApproveClose(e);
    startTransition(() => {
      approveJob(job.slug)
        .then(() => toast.success("Job published"))
        .catch((e) => {
          console.error(e);
          toast.error("Could not publish job((");
        });
    });
  };

  // Reject action
  const onRejectClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsRejectOpen(false);
  };
  const onRejectConfirmed = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRejectOpen(false);
    const els = e.currentTarget.elements;
    const rejectReason = (
      els.namedItem("rejectReason") as HTMLInputElement
    ).value?.trim();

    startTransition(() => {
      rejectJob(job.slug, rejectReason)
        .then(() => toast.success("Job rejected"))
        .catch((e) => {
          console.error(e);
          toast.error("Could not reject job((");
        });
    });
  };

  return (
    <div className="mt-4 flex flex-col gap-2 rounded-md border-2 border-teal-500 bg-teal-50 p-2">
      <p className="text-lg">Admin Only Section</p>
      <p>
        User: {user.firstName} {user.lastName} ({user.email})
      </p>
      <div className="flex gap-4">
        <select
          required
          defaultValue={job.status}
          value={job.status}
          className="my-input w-40"
          onChange={(e) => {
            const value = e.currentTarget.value;
            startTransition(() => {
              adminChangeJobStatus(job.slug, value)
                .then(() => toast.success("Status updated"))
                .catch((e) => {
                  console.error(e);
                  toast.error("Could not update status((");
                });
            });
          }}
        >
          <option value="" disabled>
            Change status
          </option>
          {AllJobStatus.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {canApprove && (
          <button className="my-btn" onClick={() => setIsApproveOpen(true)}>
            Approve
          </button>
        )}
        {canReject && (
          <button
            className="my-btn-outline danger"
            onClick={() => setIsRejectOpen(true)}
          >
            Reject
          </button>
        )}
      </div>
      <Dialog open={isApproveOpen} onClose={onApproveClose} maxWidth="sm">
        <div
          className="flex flex-col gap-4 p-6"
          onClick={(e) => e.preventDefault()}
        >
          <h2 className="text-xl font-semibold">Approve and publish job?</h2>
          <div>
            <p>
              Do you want to approve and publish job <b>{job.position}</b>?
            </p>
            <br />
            <p>
              The job will become available for all, user{" "}
              <b>
                {user.firstName} {user.lastName}
              </b>{" "}
              will receive an email.
            </p>
          </div>
          <div className="flex flex-row justify-end gap-4">
            <button
              className="my-btn-secondary"
              autoFocus
              onClick={onApproveClose}
            >
              Cancel
            </button>
            <button className="my-btn" onClick={onApproveConfirmed}>
              Approve
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog open={isRejectOpen} onClose={onRejectClose} maxWidth="sm">
        <form className="flex flex-col gap-4 p-6" onSubmit={onRejectConfirmed}>
          <h2 className="text-xl font-semibold">Reject job?</h2>
          <div>
            <p>
              Do you want to reject job <b>{job.position}</b>?
            </p>
            <br />
            <p>
              The user{" "}
              <b>
                {user.firstName} {user.lastName}
              </b>{" "}
              will receive an email with the reject reason.
            </p>
          </div>
          <textarea
            className="my-input min-h-16 w-full resize-y"
            rows={4}
            required
            placeholder="Write what issues the job has"
            name="rejectReason"
            id="rejectReason"
          />
          <div className="flex flex-row justify-end gap-4">
            <button
              className="my-btn-secondary"
              autoFocus
              onClick={onRejectClose}
            >
              Cancel
            </button>
            <button type="submit" className="my-btn danger">
              Reject
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
