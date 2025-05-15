import prisma from "@/db/prisma";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  try {
    const { name, location, email, website, linkedInUrl, description } =
      await request.json();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user?.email!;
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });
    if (!user?.companyId) {
      return Response.json(
        { message: "User does not have a company" },
        { status: 400 },
      );
    }
    const res = await prisma.company.update({
      where: {
        id: user?.companyId!,
      },
      data: {
        name,
        location,
        email,
        website,
        linkedInUrl,
        description,
      },
    });
    revalidatePath("/company");
    return Response.json(res);
  } catch (e: any) {
    return Response.json({ message: e.message }, { status: 400 });
  }
}
