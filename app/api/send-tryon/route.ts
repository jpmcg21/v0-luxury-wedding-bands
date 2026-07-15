import { NextResponse } from "next/server"
import { Resend } from "resend"
import { logTryOnLead } from "@/lib/tryon/store"

const RESEND_API_KEY = process.env.RESEND_API_KEY || ""
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "TryBands <onboarding@resend.dev>"
// TODO: replace with a real Shopify discount code, or set RESEND_DISCOUNT_CODE in env
const DISCOUNT_CODE = process.env.RESEND_DISCOUNT_CODE || "YOUR-CODE-HERE"

function buildEmailHtml({
  name,
  productTitle,
  productUrl,
}: {
  name: string
  productTitle?: string
  productUrl?: string
}) {
  const firstName = name.trim().split(" ")[0] || "there"

  return `
    <div style="font-family: Helvetica, Arial, sans-serif; background-color: #f7f6f4; padding: 32px 16px;">
      <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e3df;">
        <div style="padding: 32px 32px 0; text-align: center;">
          <p style="letter-spacing: 2px; font-size: 12px; color: #8a8681; margin: 0 0 8px;">TRYBANDS</p>
          <h1 style="font-size: 24px; font-weight: 500; margin: 0 0 16px;">Hey ${firstName}, here's your look</h1>
          <p style="color: #57534e; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
            Thanks for trying on${productTitle ? ` the ${productTitle}` : " a band"} with us. Your saved photo is attached to this email.
          </p>
        </div>
        <div style="padding: 0 32px;">
          <img src="cid:tryon-image" alt="Your try-on look" style="width: 100%; border-radius: 4px; display: block;" />
        </div>
        <div style="padding: 24px 32px; text-align: center;">
          ${
            productUrl
              ? `<a href="${productUrl}" style="display: inline-block; background: #1a1a1a; color: #ffffff; text-decoration: none; padding: 12px 28px; font-size: 14px; font-weight: 500; margin-bottom: 20px;">Shop This Band</a>`
              : ""
          }
          <p style="color: #57534e; font-size: 13px; line-height: 1.6; margin: 20px 0 0;">
            Use code <strong style="color: #1a1a1a;">${DISCOUNT_CODE}</strong> for a discount on your order.
          </p>
        </div>
        <div style="padding: 20px 32px; border-top: 1px solid #e5e3df; text-align: center;">
          <p style="color: #a19d97; font-size: 12px; margin: 0;">© TryBands. Premium wedding bands at fair prices.</p>
        </div>
      </div>
    </div>
  `
}

export async function POST(request: Request) {
  try {
    const { name, email, imageDataUrl, productTitle, productUrl } = await request.json()

    if (!name || !email || !imageDataUrl) {
      return NextResponse.json({ error: "name, email, and imageDataUrl are required" }, { status: 400 })
    }

    await logTryOnLead({ name, email, productTitle })

    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email sending is not configured yet. Set RESEND_API_KEY." },
        { status: 501 },
      )
    }

    const base64 = imageDataUrl.split(",")[1] ?? imageDataUrl
    const imageBuffer = Buffer.from(base64, "base64")

    const resend = new Resend(RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your Try-On Look from TryBands",
      html: buildEmailHtml({ name, productTitle, productUrl }),
      attachments: [
        {
          filename: "trybands-try-on.jpg",
          content: imageBuffer,
          contentId: "tryon-image",
        },
      ],
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending try-on email:", error)
    return NextResponse.json({ error: "Failed to send your look" }, { status: 500 })
  }
}
