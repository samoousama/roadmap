import prisma from "@/db/prisma";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  try {
    const { firstName, lastName, companyName, jobTitle, linkedInUrl } =
      await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const email = session.user?.email!;
    const res = await prisma.user.update({
      where: {
        email,
      },
      data: {
        firstName,
        lastName,
        companyName,
        jobTitle,
        linkedInUrl,
      },
    });

    revalidatePath("/profile");
    return Response.json(res);
  } catch (e: any) {
    return Response.json({ message: e.message }, { status: 400 });
  }
}
