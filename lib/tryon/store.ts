import "server-only"

import { randomUUID } from "crypto"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

export type TryOnRecord = {
  id: string
  name: string
  email: string
  imageDataUrl: string
  productTitle?: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), "data")
const DATA_FILE = path.join(DATA_DIR, "try-on-saves.json")

async function readAll(): Promise<TryOnRecord[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8")
    return JSON.parse(raw) as TryOnRecord[]
  } catch {
    return []
  }
}

async function writeAll(records: TryOnRecord[]) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(records, null, 2), "utf-8")
}

export async function saveTryOn(input: {
  name: string
  email: string
  imageDataUrl: string
  productTitle?: string
}): Promise<TryOnRecord> {
  const record: TryOnRecord = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    imageDataUrl: input.imageDataUrl,
    productTitle: input.productTitle,
    createdAt: new Date().toISOString(),
  }

  const records = await readAll()
  records.push(record)
  await writeAll(records)

  return record
}

export async function getTryOnById(id: string): Promise<TryOnRecord | null> {
  const records = await readAll()
  return records.find((r) => r.id === id) ?? null
}

export async function getLatestTryOnByEmail(email: string): Promise<TryOnRecord | null> {
  const records = await readAll()
  const matches = records.filter((r) => r.email.toLowerCase() === email.toLowerCase())
  return matches.length > 0 ? matches[matches.length - 1] : null
}
