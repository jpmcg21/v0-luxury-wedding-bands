import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog — Just Bands",
  description:
    "Expert guides and insights on choosing the perfect wedding band. Learn about gold weights, metal types, and more.",
}

const blogPosts = [
  {
    slug: "why-all-10mm-gold-bands-are-not-created-equal",
    title: "Why All 10mm Gold Bands Are Not Created Equal",
    excerpt:
      "When shopping for a 10mm gold band, it's easy to get caught up in the 'width vs. price' game. But in fine jewelry, weight is the true measure of value.",
    date: "January 15, 2026",
    readTime: "4 min read",
    category: "Buying Guide",
  },
  {
    slug: "14k-vs-platinum-which-is-right-for-you",
    title: "14k Gold vs Platinum: Which Is Right for You?",
    excerpt:
      "Both metals have their strengths. Here's an honest comparison to help you decide which wedding band metal suits your lifestyle.",
    date: "January 10, 2026",
    readTime: "5 min read",
    category: "Metal Guide",
  },
  {
    slug: "how-to-measure-ring-size-at-home",
    title: "How to Measure Your Ring Size at Home",
    excerpt:
      "Getting the perfect fit is crucial for a wedding band you'll wear every day. Learn professional techniques for accurate sizing.",
    date: "January 5, 2026",
    readTime: "3 min read",
    category: "Sizing Guide",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm tracking-widest text-muted-foreground mb-4">THE JOURNAL</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-medium mb-6 text-balance">
              Guides & Insights
            </h1>
            <p className="text-lg text-muted-foreground">Expert advice on choosing the perfect wedding band</p>
          </div>

          {/* Blog Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {blogPosts.map((post, index) => (
                <article
                  key={post.slug}
                  className={`group ${index !== blogPosts.length - 1 ? "border-b border-border pb-12" : ""}`}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs tracking-widest text-muted-foreground uppercase">
                            {post.category}
                          </span>
                          <span className="text-muted-foreground/40">•</span>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        </div>
                        <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-medium mb-3 group-hover:text-muted-foreground transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <span>Read Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">{post.date}</div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
