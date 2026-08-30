import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function DELETE(request, { params }) {
  const {id } = await params

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }

  return NextResponse.json({message: 'Note deleted successfully.'})
}
