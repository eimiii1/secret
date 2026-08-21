import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "@/lib/supabase";

export async function POST(request) {
  const { username, password } = await request.json();

  // Query: find user in database
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !user)
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 401 },
    );

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return NextResponse.json(
      { message: "Invalid Credentials." },
      { status: 401 },
    );

  // create JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const response = NextResponse.json({message: 'Login successful'})
    
  response.cookies.set('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
  })

  return response
}
