import { canEditJob, getUser } from "@/db/data";
import prisma from "@/db/prisma";
import { authOptions } from "@/utils/auth";
import { JobStatus } from "@/utils/const";
import { slugify } from "@/utils/misc";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

async function upsert(request: Request) {
  try {
    const {
      jobId,
      position,
      primaryRole,
      salaryMin,
      salaryMax,
      tags,
      locations,
      employmentType,
      jobDescription,
      benefits,
      applyUrlOrEmail,
      howToApply,
      companyName,
      companyHQ,
      companyEmail,
      companyWebsite,
      companyLinkedIn,
      companyDescription,
      companyLogo,
    } = await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await getUser(session);

    const currentJob = await prisma.job.findUnique({
      where: {
        id: jobId ?? 0,
      },
    });

    if (currentJob && !canEditJob(user, currentJob)) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = {
      position,
      primaryRole,
      salaryMin,
      salaryMax,
      tags,
      locations,
      employmentType,
      jobDescription,
      benefits,
      applyUrlOrEmail,
      howToApply,
      companyName,
      companyHQ,
      companyEmail,
      companyWebsite,
      companyLinkedIn,
      companyDescription,
      companyLogo: companyLogo ?? undefined,
    };

    // console.log(data);

    let res = await prisma.job.upsert({
      where: {
        id: jobId ?? 0,
      },
      update: {
        ...data,
        // slug: slugify(position) + "-" + jobId,
      },
      create: { ...data, userId: user?.id!, companyId: user?.companyId! },
    });
    let slug = slugify(position) + "-" + res.id; // Math.random().toString(36).substring(3, 10);
    if (
      slug !== res.slug &&
      res.status !== JobStatus.Published.value &&
      res.status !== JobStatus.Closed.value
    ) {
      // update slug only for Draft, InReview or Rejected
      res = await prisma.job.update({
        where: {
          id: res.id,
        },
        data: {
          slug,
        },
      });
    } else {
      slug = res.slug;
    }

    revalidatePath("/my-jobs");
    revalidatePath(`/jobs/edit/${slug}`);
    revalidatePath(`/jobs/${slug}`);

    return Response.json(res);
  } catch (e: any) {
    return Response.json({ message: e.message }, { status: 400 });
  }
}

export { upsert as POST, upsert as PUT };
