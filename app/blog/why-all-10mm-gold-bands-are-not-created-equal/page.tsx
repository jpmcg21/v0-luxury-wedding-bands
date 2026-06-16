import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Why All 10mm Gold Bands Are Not Created Equal — Just Bands",
  description:
    "When shopping for a 10mm gold band, weight is the true measure of value. Learn the difference between lightweight and professional-grade bands.",
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <article className="container mx-auto px-6">
          {/* Back Link */}
          <div className="max-w-3xl mx-auto mb-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </Link>
          </div>

          {/* Article Header */}
          <header className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-xs tracking-widest text-muted-foreground uppercase">Buying Guide</span>
              <span className="text-muted-foreground/40">•</span>
              <span className="text-xs text-muted-foreground">4 min read</span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-medium mb-6 text-balance leading-tight">
              Why All 10mm Gold Bands Are Not Created Equal
            </h1>
            <p className="text-muted-foreground">January 15, 2026</p>
          </header>

          {/* Article Content */}
          <div className="max-w-2xl mx-auto">
            <div className="prose prose-lg">
              <p className="text-lg leading-relaxed text-foreground mb-8">
                When shopping for a 10mm gold band, it's easy to get caught up in the "width vs. price" game. You see a
                wide band at a big-box retailer for an unbelievable price and think you've found a steal.
              </p>

              <p className="text-xl font-medium text-foreground mb-8 border-l-2 border-foreground pl-6">
                But in fine jewelry, weight is the true measure of value.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-medium mt-12 mb-6">
                The "Lightweight" Secret
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Mass-market retailers often sell "lightweight" bands to keep prices low. By stretching the gold thin
                (typically a <strong className="text-foreground">1.2mm depth</strong>), a 10mm band might only weigh{" "}
                <strong className="text-foreground">7.8 grams</strong>. While it looks wide, it is prone to bending or
                warping over time. At today's gold prices ($6,400 CAD/oz), you're paying a premium for a ring that lacks
                the "heft" required for a lifetime of wear.
              </p>

              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-medium mt-12 mb-6">
                The Professional Standard
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                A professional-grade 10mm band (standard or heavyweight) usually features a{" "}
                <strong className="text-foreground">1.7mm to 2.1mm depth</strong>, bringing the weight closer to{" "}
                <strong className="text-foreground">12–15 grams</strong>.
              </p>

              {/* Comparison Table */}
              <div className="my-12 border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-medium text-foreground">Feature</TableHead>
                      <TableHead className="font-medium text-foreground">Mass-Market "Light"</TableHead>
                      <TableHead className="font-medium text-foreground">Our Professional Standard</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Gold Weight</TableCell>
                      <TableCell className="text-muted-foreground">~7.8 Grams</TableCell>
                      <TableCell className="text-foreground font-medium">~13.5 Grams</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Metal Depth</TableCell>
                      <TableCell className="text-muted-foreground">1.2 mm (Thin)</TableCell>
                      <TableCell className="text-foreground font-medium">1.8 mm (Substantial)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Durability</TableCell>
                      <TableCell className="text-muted-foreground">Prone to warping</TableCell>
                      <TableCell className="text-foreground font-medium">Lifetime Guarantee</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Feel</TableCell>
                      <TableCell className="text-muted-foreground">Lightweight/Hollow</TableCell>
                      <TableCell className="text-foreground font-medium">Solid/Luxe</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-medium mt-12 mb-6">
                Why Weight Matters
              </h2>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3">
                  <span className="text-foreground font-medium">Durability:</span>
                  <span className="text-muted-foreground">
                    It won't bend out of shape during daily activity or exercise.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-medium">Feel:</span>
                  <span className="text-muted-foreground">
                    There is a tactile "luxe" presence that lightweight rings cannot replicate.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-foreground font-medium">Investment Value:</span>
                  <span className="text-muted-foreground">You are wearing nearly double the precious metal.</span>
                </li>
              </ul>

              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-medium mt-12 mb-6">
                Our Value Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We use a <strong className="text-foreground">Direct-to-Consumer markup (1.4x – 1.7x)</strong>. This
                allows us to offer substantial, professional-weight rings for a price that mall jewelers simply can't
                touch.
              </p>

              <p className="text-xl font-medium text-foreground border-l-2 border-foreground pl-6">
                Don't just buy a width; buy the weight.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-16 pt-12 border-t border-border text-center">
              <p className="text-muted-foreground mb-6">Ready to feel the difference?</p>
              <Link
                href="/#collection"
                className="inline-flex items-center justify-center bg-foreground text-background px-8 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Shop Professional-Grade Bands
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
