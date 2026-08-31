import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(request) {
  const { body, sender_name, song_url } = await request.json();
  const { error } = await supabase
    .from("letters")
    .insert({ body, sender_name, song_url });

  if (error) {
    return NextResponse.json(
      { message: "There was an error creating your letter." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Note created successfully." },
    { status: 201 },
  );
}

export async function GET() {
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { message: "There was an error fetching your letters." },
      { status: 500 },
    );
  }

  return NextResponse.json({ letters: data });
}
