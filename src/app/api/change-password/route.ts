import { API_URL } from "@/lib/constants/core.constants";
import { ChangePassReq, UserData } from "@/lib/models/auth.model";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: ChangePassReq = await req.json();

    const usersRes = await fetch(`${API_URL}/users`);

    const users: UserData[] = await usersRes.json();

    const foundUser = users.find(user => user.id === body.userId);

    if (!foundUser)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });

    const isOldPassValid = await compare(
      body.oldPassword,
      foundUser.password as string
    );

    if (!isOldPassValid)
      return NextResponse.json(
        { error: "Invalid old password" },
        { status: 400 }
      );

    const newHashedPassword = await hash(body.newPassword, 8);

    const updatedUser: UserData = { ...foundUser, password: newHashedPassword };

    const res = await fetch(`${API_URL}/users/${foundUser.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok)
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 400 }
      );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Can't change password" },
      { status: 401 }
    );
  }
}
