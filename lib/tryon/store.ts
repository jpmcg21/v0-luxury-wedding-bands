import "server-only"

import { randomUUID } from "crypto"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

// Lightweight marketing-list log of who tried on what. The actual look image
// is emailed directly and isn't persisted here.
export type TryOnLead = {
  id: string
  name: string
  email: string
  productTitle?: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "try-on-leads.json")

async function readAll(): Promise<TryOnLead[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw) as TryOnLead[]
  } catch {
    return []
  }
}

async function writeAll(leads: TryOnLead[]) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8")
}

export async function logTryOnLead(input: { name: string; email: string; productTitle?: string }): Promise<TryOnLead> {
  const lead: TryOnLead = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    productTitle: input.productTitle,
    createdAt: new Date().toISOString(),
  }

  const leads = await readAll()
  leads.push(lead)
  await writeAll(leads)

  return lead
}
