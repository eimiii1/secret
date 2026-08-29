import { NextResponse } from "next/server";
import supabase from '@/lib/supabase'

export async function DELETE(request, { params }) {
  const { id } = await params;

  const { data: photo, error: fetchError } = await supabase
    .from("gallery")
    .select("url")
    .eq("id", id)
    .single();

  if (fetchError)
    return NextResponse.json({ message: fetchError.message }, { status: 500 });

  const filename = photo.url.split("/").pop();

  await supabase.storage.from("gallery").remove([filename]);

  const { error } = await supabase.from("gallery").delete().eq("id", id);
  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ message: "Deleted" });
}