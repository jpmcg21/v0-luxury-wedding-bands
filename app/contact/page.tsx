export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Get in Touch</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Have questions about our wedding bands? We're here to help you find the perfect ring.
        </p>

        <div className="space-y-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold mb-2">Customer Service</h2>
            <p className="text-muted-foreground">Email: support@justbands.com</p>
            <p className="text-muted-foreground">Response time: Within 24 hours</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
            <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
            <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
          </div>
        </div>

        <div className="bg-secondary/50 p-8 rounded-none border border-border">
          <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">What is your return policy?</p>
              <p className="text-muted-foreground">We offer free 30-day returns on all wedding bands.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Do you offer ring sizing?</p>
              <p className="text-muted-foreground">Yes, we provide free sizing assistance and exchanges.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Where do you ship?</p>
              <p className="text-muted-foreground">
                We currently ship within the United States with free shipping on all orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
