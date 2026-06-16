# Stuller API Integration Setup Guide

This guide will help you connect your Just Bands e-commerce site to Stuller's API for automatic product syncing and order fulfillment.

## Prerequisites

1. **Stuller Account**: Apply for a Stuller account at [stuller.com](https://www.stuller.com)
2. **API Access**: Request API access from your Stuller account representative

## Step 1: Get Your API Credentials

Once Stuller approves your account:

1. Log in to Stuller.com
2. Go to **My Account** → **Create/Manage Logins**
3. Create a **Developer Login** (not a regular user login)
4. Save your credentials:
   - Username (developer login username)
   - Password (developer login password)

## Step 2: Add Credentials to Your Project

Add the following environment variables to your Vercel project:

```
STULLER_API_USERNAME=your_developer_username
STULLER_API_PASSWORD=your_developer_password
```

### In v0:
1. Click the three dots in the sidebar
2. Select **Vars** (Environment Variables)
3. Add both variables above

### In Vercel Dashboard:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add both variables for Production, Preview, and Development

## Step 3: How It Works

### Product Syncing

The site automatically fetches wedding band products from Stuller's catalog:

- **API Endpoint**: `POST /api/v2/products/advancedproductfilters`
- **Filters Applied**:
  - Product Types: Wedding Bands, Plain Metal Bands
  - Metal Types: 14K Yellow Gold, Platinum
  - Quality Levels: Good, Better, Best
  - In Stock Only: Yes

### Product Display

Stuller products are transformed to match your site's format:
- Stuller's `yourCost` → Your selling price
- Stuller's `retailPrice` → Comparison price (shows savings)
- Product images from Stuller's CDN
- Real-time inventory status

### Order Fulfillment (Dropshipping)

When a customer completes checkout:

1. **Payment captured** via Stripe
2. **Order auto-submitted** to Stuller via API
3. **Stuller ships directly** to your customer
4. **You get tracking info** via Stuller's API

The order includes:
- Customer shipping address from Stripe checkout
- Product Series IDs from the cart
- Dropship flag enabled (ships from Stuller with your branding)

## Step 4: Testing

### Test Mode (Current State)
Without API credentials, the site uses mock products. Everything works, but products aren't real.

### Live Mode (After Setup)
Once you add credentials:
1. Products load from Stuller automatically
2. Real-time pricing and availability
3. Orders submit to Stuller for fulfillment

To test after adding credentials:
```bash
# Check browser console for logs
# You should see: "[v0] Loaded X products from Stuller"
```

## Step 5: Customization

### Filter Different Products

Edit `lib/stuller-api.ts` to change what products are fetched:

```typescript
async searchWeddingBands(filters?: {
  metalType?: string[]  // ["14K Yellow Gold", "Platinum", "14K White Gold"]
  width?: number[]       // [2, 3, 4, 5, 6]
  minPrice?: number
  maxPrice?: number
})
```

### Adjust Pricing Strategy

Current: Uses Stuller's `yourCost` as selling price

To add markup, edit `lib/stuller-api.ts`:

```typescript
priceInCents: Math.round(stullerProduct.yourCost * 1.3 * 100), // 30% markup
```

## API Documentation

Full Stuller API docs: [https://api.stuller.com/help](https://api.stuller.com/help)

Key endpoints used:
- `POST /api/v2/products/advancedproductfilters` - Search products
- `GET /api/v2/products/{seriesId}` - Get product details
- `POST /api/v2/orders` - Submit orders

## Troubleshooting

### Products Not Loading
- Check browser console for `[v0]` logs
- Verify credentials in environment variables
- Ensure Stuller account is approved for API access

### Orders Not Submitting
- Check that `STULLER_API_USERNAME` and `STULLER_API_PASSWORD` are set
- Verify Stripe webhook is configured (if using webhooks)
- Check Stuller account has ordering enabled

### Need Help?
- Stuller Support: [stuller.com/services/e-commerce-business](https://www.stuller.com/services/e-commerce-business/api-documentation)
- Contact your Stuller account representative

## Next Steps

Once connected to Stuller:
1. Configure product filters to show your preferred inventory
2. Set up Stripe webhooks for automatic order fulfillment
3. Test the complete checkout → fulfillment flow
4. Customize pricing markup if desired
5. Add more product categories beyond wedding bands
