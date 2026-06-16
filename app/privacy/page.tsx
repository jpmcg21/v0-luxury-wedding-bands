export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Information We Collect</h2>
            <p>
              We collect information you provide directly to us when you create an account, place an order, or contact
              customer service. This includes your name, email address, shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="space-y-2 ml-6">
              <li>• Process and fulfill your orders</li>
              <li>• Communicate with you about your orders and our products</li>
              <li>• Improve our website and customer service</li>
              <li>• Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Information Sharing</h2>
            <p>
              We do not sell or rent your personal information to third parties. We may share your information with
              service providers who assist us in operating our website and fulfilling orders, such as payment processors
              and shipping carriers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Data Security</h2>
            <p>
              We use industry-standard security measures to protect your personal information. All payment information
              is encrypted and processed through secure payment gateways.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. Contact us at
              privacy@justbands.com to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@justbands.com.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
