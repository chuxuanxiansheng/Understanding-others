import { NextRequest, NextResponse } from "next/server";
import { deleteCorrections, saveCorrections, completeSession } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { corrections } = body;

    await deleteCorrections(params.id);
    await saveCorrections(corrections, params.id);
    await completeSession(params.id);

    return NextResponse.json({ sessionId: params.id });
  } catch (error) {
    console.error("??????", error);
    return NextResponse.json({ error: "????" }, { status: 500 });
  }
}
