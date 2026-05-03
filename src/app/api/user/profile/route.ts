import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const notifications = formData.get("notifications") === "true";

    let imagePath = undefined;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save to public/uploads
      const uploadDir = join(process.cwd(), "public", "uploads");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}

      const fileName = `${session.user.id}-${Date.now()}-${file.name}`;
      const path = join(uploadDir, fileName);
      await writeFile(path, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email! },
      data: {
        name,
        surname,
        notifications,
        ...(imagePath && { image: imagePath }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
