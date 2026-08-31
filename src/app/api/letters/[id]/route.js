import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function DELETE(request, { params }) {
  const { id } = await params;

  const { error } = await supabase.from("letters").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { message: "There was an error deleting your letter." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Letter deleted." });
}

export async function GET(request, { params }) {
  const { id } = await params;

  const { data: letter, error } = await supabase
    .from("letters")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { message: "There was an error opening your letter." },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: letter });
}
