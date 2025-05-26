"use server";

import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { JobStatus } from "@/utils/const";
import { DEFAULT_TEMPLATE_ID, sendEmail } from "@/utils/mail";
import { canEditJob, getJob, getUser } from "./data";
import { getDomain } from "@/utils/misc";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { UserRole } from "@prisma/client";

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const user = await getUser(session);
  return user;
}

// server action checks are also required - https://nextjs.org/blog/security-nextjs-server-components-actions
async function assertIsSuperAdmin() {
  const user = await getCurrentUser();
  if (user?.role !== UserRole.SuperAdmin) {
    throw new Error("Unauthorized");
  }
}

async function assertCanEditJob(jobSlug: string) {
  const user = await getCurrentUser();
  const job = await prisma.job.findUnique({
    where: {
      slug: jobSlug,
    },
  });
  if (!canEditJob(user, job)) {
    throw new Error("Unauthorized");
  }
}

async function assertCanEditCompany(companyId: number) {
  const user = await getCurrentUser();
  if (!user || user.companyId !== companyId) {
    throw new Error("Unauthorized");
  }
}

async function changeJobStatus(jobSlug: string, newStatus: string) {
  await prisma.job.update({
    where: {
      slug: jobSlug,
    },
    data: {
      status: newStatus,
    },
  });
  revalidatePath(`/jobs/edit/${jobSlug}`);
}

// =====================================================

export async function deleteJob(jobSlug: string) {
  await assertCanEditJob(jobSlug);
  await prisma.job.delete({
    where: {
      slug: jobSlug,
    },
  });
  revalidatePath("/my-jobs");
}

export async function updateCompany(
  companyId: number,
  name: string,
  location: string,
  email: string,
  website: string,
  linkedInUrl: string,
  description: string,
  logoUrl?: string,
) {
  await assertCanEditCompany(companyId);
  await prisma.company.update({
    where: {
      id: companyId,
    },
    data: {
      name,
      location,
      email,
      website,
      linkedInUrl,
      description,
      logoUrl,
    },
  });
  revalidatePath("/company");
}

export async function submitJobForReview(jobSlug: string) {
  await assertCanEditJob(jobSlug);
  await changeJobStatus(jobSlug, JobStatus.InReview.value);
  sendEmail({
    to: "hi@nataindata.com",
    //     text: `Hey, admin. \n\n
    // New job submitted for review: ${getDomain()}/jobs/edit/${jobSlug}
    // \n\n
    // Needs approval to be published.`,
    templateId: DEFAULT_TEMPLATE_ID,
    dynamicTemplateData: {
      subject: "Admin: new job submitted for review",
      body_text: `Hey, admin. <br /><br />
New job submitted for review: ${getDomain()}/jobs/edit/${jobSlug}
<br /><br />
Needs approval to be published.`,
      button_text: "View job",
      button_url: `${getDomain()}/jobs/edit/${jobSlug}`,
    },
  });
  revalidatePath(`/my-jobs`);
}

export async function closeJob(jobSlug: string) {
  await assertCanEditJob(jobSlug);
  await changeJobStatus(jobSlug, JobStatus.Closed.value);
  revalidatePath(`/my-jobs`);
}

export async function adminChangeJobStatus(jobSlug: string, newStatus: string) {
  await assertIsSuperAdmin();
  await changeJobStatus(jobSlug, newStatus);
}

export async function approveJob(jobSlug: string) {
  await assertIsSuperAdmin();
  await changeJobStatus(jobSlug, JobStatus.Published.value);
  const job = await getJob(jobSlug, true);
  const user = job?.user;
  if (!job || !user) return;
  sendEmail({
    to: job.user.email!,
    templateId: DEFAULT_TEMPLATE_ID,
    dynamicTemplateData: {
      subject: `Your job ${job.position} is published`,
      body_text: `Hey, ${user.firstName}. <br /><br />
    Your job "<b>${job.position}</b>" is now published on Nata in Data Jobs 🎉
    <br /><br />
    Check it out here by the link - ${getDomain()}/jobs/${jobSlug}
    <br /><br />
    You can make changes to the job in your account, if needed.`,
      button_text: "View job",
      button_url: `${getDomain()}/jobs/${jobSlug}`,
    },
  });
}

export async function rejectJob(jobSlug: string, rejectReason: string) {
  await assertIsSuperAdmin();
  await prisma.job.update({
    where: {
      slug: jobSlug,
    },
    data: {
      status: JobStatus.Rejected.value,
      rejectReason,
    },
  });
  
  revalidatePath(`/jobs/edit/${jobSlug}`);
  const job = await getJob(jobSlug, true);
  const user = job?.user;

  if (!job || !user) return;
  sendEmail({
    to: job.user.email!,
    templateId: DEFAULT_TEMPLATE_ID,
    dynamicTemplateData: {
      subject: `Your job ${job.position} has one ore more issues`,
      body_text: `Hey, ${user.firstName}. <br /><br />
    Your job "<b>${job.position}</b>" was rejected for the following reason:
    <br /><br />
    "<b>${rejectReason}</b>"
    <br /><br />
    Please, make the necessary changes to address the issues, and re-submit your job.`,
      button_text: "Edit job",
      button_url: `${getDomain()}/jobs/edit/${jobSlug}`,
    },
  });
}
