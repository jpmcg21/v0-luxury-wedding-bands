import { NextResponse } from "next/server"
import { logTryOnLead } from "@/lib/tryon/store"

export async function POST(request: Request) {
  try {
    const { name, email, productTitle } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "name and email are required" }, { status: 400 })
    }

    await logTryOnLead({ name, email, productTitle })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving try-on lead:", error)
    return NextResponse.json({ error: "Failed to save" }, { status: 500 })
  }
}
