# Just Bands - Modern Wedding Band E-Commerce

A modern, direct-to-consumer e-commerce platform for premium wedding bands at fair prices.

## Features

- Modern, minimalist design emphasizing value and transparency
- Full shopping cart with Stripe checkout
- Stuller API integration for automatic inventory and dropshipping
- Real-time product sync and pricing
- Mobile-responsive design
- Filterable product catalog (metal type, width)

## Technology Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Modern styling
- **Stripe** - Payment processing
- **Stuller API** - Product catalog and order fulfillment

## Getting Started

### 1. Install Dependencies

This project uses the shadcn CLI for setup:

```bash
npx shadcn@latest init
```

### 2. Configure Stripe

Stripe environment variables are already configured in v0. For local development:

```
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Configure Stuller API (Optional)

To connect real inventory, see [STULLER_SETUP.md](./STULLER_SETUP.md) for detailed instructions.

Required environment variables:
```
STULLER_API_USERNAME=your_developer_username
STULLER_API_PASSWORD=your_developer_password
```

Without Stuller credentials, the site uses mock product data.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── actions/          # Server actions (Stripe, orders)
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── cart-sidebar.tsx  # Shopping cart
│   ├── checkout.tsx      # Stripe checkout
│   ├── product-grid.tsx  # Product listing
│   └── ...
├── contexts/
│   └── cart-context.tsx  # Cart state management
├── lib/
│   ├── products.ts       # Product data layer
│   ├── stuller-api.ts    # Stuller API client
│   └── stripe.ts         # Stripe configuration
└── public/               # Static assets
```

## How It Works

### Product Management

1. **Without Stuller**: Uses mock product data from `lib/products.ts`
2. **With Stuller**: Automatically fetches real products via API
   - Real-time inventory and pricing
   - Automatic updates
   - High-quality product images

### Order Flow

1. Customer adds products to cart
2. Proceeds to Stripe checkout (embedded)
3. Payment processed securely
4. Order automatically submitted to Stuller for dropshipping (if configured)
5. Stuller ships directly to customer

### Cart Management

- Client-side cart using React Context
- Persistent across page navigation
- Real-time total calculations
- Quantity adjustment

## Customization

### Branding

Update in:
- `components/header.tsx` - Logo and navigation
- `components/hero.tsx` - Hero messaging
- `app/layout.tsx` - Site metadata

### Products

- **Mock Mode**: Edit `lib/products.ts`
- **Stuller Mode**: Configure filters in `lib/stuller-api.ts`

### Pricing

Adjust markup in `lib/stuller-api.ts`:
```typescript
priceInCents: Math.round(stullerProduct.yourCost * 1.3 * 100) // 30% markup
```

### Design

- Colors: `app/globals.css` (design tokens)
- Fonts: `app/layout.tsx` and `app/globals.css`
- Layout: Component files in `components/`

## Deployment

### Deploy to Vercel

1. Click **Publish** in v0, or:
2. Connect GitHub repository
3. Deploy to Vercel
4. Add environment variables in Vercel dashboard

### Environment Variables Checklist

Production environment:
- ✅ `STRIPE_SECRET_KEY`
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- ⬜ `STULLER_API_USERNAME` (optional, for real inventory)
- ⬜ `STULLER_API_PASSWORD` (optional, for real inventory)

## Support

- Stripe: [stripe.com/docs](https://stripe.com/docs)
- Stuller API: [STULLER_SETUP.md](./STULLER_SETUP.md)
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)

## License

MIT
