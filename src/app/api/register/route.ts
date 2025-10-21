import { API_URL } from "@/lib/constants/core.constants";
import { RegisterReq } from "@/lib/models/auth.model";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const body: RegisterReq = await req.json();

    const hashedPass = await hash(body.password, 8);

    const newUser = {
      id: uuid(),
      ...body,
      password: hashedPass,
    };

    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
    });

    if (!res.ok) throw new Error("Couldn't register user");
  } catch (error) {
    return NextResponse.json(
      { error: "Can't register user" },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    { msg: "User registered successfully!" },
    { status: 201 }
  );
}
