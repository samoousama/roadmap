import { canEditJob, getUser } from "@/db/data";
import prisma from "@/db/prisma";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export async function DELETE(
  request: Request,
  { params: { jobId: requestJobId } }: { params: { jobId: string } },
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const jobId = parseInt(requestJobId);
    const user = await getUser(session);

    const currentJob = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!currentJob) {
      return Response.json(
        { message: `Job with ID = '${jobId}' not found` },
        { status: 404 },
      );
    }

    if (!canEditJob(user, currentJob)) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    let res = await prisma.job.delete({
      where: {
        id: jobId,
      },
    });

    revalidatePath("/my-jobs");

    return Response.json(res);
  } catch (e: any) {
    return Response.json({ message: e.message }, { status: 400 });
  }
}
