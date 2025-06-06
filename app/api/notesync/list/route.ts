import { NextRequest, NextResponse } from "next/server";
import { listNotes } from "@/packages/integrations/notion/notesync/notesync.functions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || undefined;
  const maxResults = searchParams.get("maxResults");
  const maxResultsNum = maxResults ? parseInt(maxResults) : undefined;

  try {
    const notes = await listNotes({
      query,
      maxResults: maxResultsNum,
    });

    return NextResponse.json({ success: true, data: notes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
