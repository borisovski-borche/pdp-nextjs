import { API_URL } from "@/lib/constants/core.constants";
import { LoginReq, UserData } from "@/lib/models/auth.model";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    const body: LoginReq = await req.json();

    const usersRes = await fetch(`${API_URL}/users`);

    const users: UserData[] = await usersRes.json();

    const foundUser = users.find(user => user.email === body.email);

    if (!foundUser) throw "Invalid Credentials";

    const isPasswordValid = await compare(
      body.password,
      foundUser.password as string
    );

    if (!isPasswordValid) throw "Invalid Credentials";

    const { password, ...userWithoutPassword } = foundUser;

    //Setup the auth-cookie
    cookieStore.set("auth-user", JSON.stringify(userWithoutPassword));

    //Return the user without the password as a response

    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }
}
