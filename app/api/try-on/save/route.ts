import { NextResponse } from "next/server"
import { getLatestTryOnByEmail, getTryOnById, saveTryOn } from "@/lib/tryon/store"

export async function POST(request: Request) {
  try {
    const { name, email, imageDataUrl, productTitle } = await request.json()

    if (!name || !email || !imageDataUrl) {
      return NextResponse.json({ error: "name, email, and imageDataUrl are required" }, { status: 400 })
    }

    const record = await saveTryOn({ name, email, imageDataUrl, productTitle })
    return NextResponse.json({ id: record.id })
  } catch (error) {
    console.error("Error saving try-on:", error)
    return NextResponse.json({ error: "Failed to save try-on" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const email = searchParams.get("email")

  try {
    const record = id ? await getTryOnById(id) : email ? await getLatestTryOnByEmail(email) : null

    if (!record) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(record)
  } catch (error) {
    console.error("Error fetching try-on:", error)
    return NextResponse.json({ error: "Failed to fetch try-on" }, { status: 500 })
  }
}
