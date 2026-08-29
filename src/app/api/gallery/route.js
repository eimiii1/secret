import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function POST(request) {
  // get request data
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file)
    return NextResponse.json({ message: "No file provided" }, { status: 400 });

  // file is required as raw bytes
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + "-" + file.name.replace(/\s/g, "-");

  // upload to supabase storage
  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(filename, buffer, { contentType: file.type });

  if (uploadError) {
    console.log('upload error:', uploadError)
    return NextResponse.json({ message: uploadError.message }, { status: 500 });
  }

  // get the public URL
  const { data: urlData } = supabase.storage
    .from("gallery")
    .getPublicUrl(filename);

  // save to database
  const { error: dbError } = await supabase
    .from("gallery")
    .insert({ url: urlData.publicUrl});

  if (dbError) {
    console.log('db error:', dbError)
    return NextResponse.json({ message: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ url: urlData.publicUrl });
}

export async function GET() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({ photos: data });
}
