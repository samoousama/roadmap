import "server-only";

import { Session } from "next-auth";
import { cache } from "react";
import prisma from "@/db/prisma";
import { JobStatus, SortBy } from "@/utils/const";
import { Job, User, UserRole } from "@prisma/client";

export function canEditJob(user: User | null, job: Job | null) {
  // if empty or ('not admin' and 'not my job')
  const isAdmin = user?.role === UserRole.SuperAdmin;
  if (!user || !job || (!isAdmin && user.companyId !== job.companyId)) {
    return false;
  }
  return true;
}

export const getUser = cache(async (session: Session) => {
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });
  return user!;
});

export const getCompany = cache(async (session: Session) => {
  const user = await getUser(session);
  let company = await prisma.company.findUnique({
    where: {
      id: user?.companyId!,
    },
  });
  // create and link to user if empty
  if (!company) {
    company = await prisma.company.create({
      data: {
        name: `${user?.firstName}'s company`,
      },
    });
    await prisma.user.update({
      where: {
        email: session.user!.email!,
      },
      data: {
        companyId: company.id,
      },
    });
  }
  return company;
});

export const getJob = cache(
  async (slug: string, includeUser: boolean = false) => {
    const job = await prisma.job.findUnique({
      where: {
        slug,
      },
      include: {
        user: includeUser,
      },
    });
    return job;
  },
);

export const getMyJobs = cache(async (session: Session) => {
  const user = await getUser(session);
  const jobs = await prisma.job.findMany({
    where: {
      companyId: user?.companyId!,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });
  return jobs;
});

export const findJobs = cache(
  async (
    locations: string[],
    roles: string[],
    tags: string[],
    benefits: string[],
    salaryMin: number = 0,
    urlSort: string,
    excludeId: number | undefined = undefined,
    take: number | undefined = undefined,
    status: string = JobStatus.Published.value,
  ) => {
    const where: any = {};
    if (locations?.length) {
      where["locations"] = {
        hasSome: locations,
      };
    }
    if (roles?.length) {
      where["primaryRole"] = {
        in: roles,
      };
    }
    if (tags?.length) {
      where["tags"] = {
        hasSome: tags,
      };
    }
    if (benefits?.length) {
      where["benefits"] = {
        hasEvery: benefits,
      };
    }
    if (excludeId) {
      where["id"] = {
        not: excludeId,
      };
    }
    const sort = (SortBy.find((s) => s.value === urlSort) || SortBy[0]).dbField;

    const jobs = await prisma.job.findMany({
      where: {
        ...where,
        salaryMin: {
          gte: salaryMin,
        },
        status,
      },
      orderBy: {
        [sort]: "desc",
      },
      take: take ?? 10_000,
    });
    return jobs;
  },
);

export const findSitemapJobs = cache(async () => {
  const sort = SortBy[0].dbField;

  const statuses = [JobStatus.Published.value, JobStatus.Closed.value];

  const jobs = await prisma.job.findMany({
    where: {
      status: {
        in: statuses,
      },
    },
    orderBy: [
      //
      {
        status: "desc",
      },
      {
        [sort]: "desc",
      },
    ],
    take: 49_000,
  });
  return jobs;
});

// export type Job = Awaited<ReturnType<typeof getJob>>;
