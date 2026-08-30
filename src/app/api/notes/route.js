import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(request) {
  const { title, body } = await request.json();
  const { error } = await supabase.from("notes").insert({ title, body });

  if (error)
    return NextResponse.json(
      { message: "There was an error creating your note." },
      { status: 500 },
    );

  return NextResponse.json(
    { message: "Note created successfully." },
    { status: 201 },
  );
}

export async function GET() {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ notes: data });
}
