-- Seed initial products
INSERT INTO products (name, description, price, compare_at_price, metal_type, width, image_url, inventory_count, is_active) VALUES
  ('Classic Gold Band', 'Timeless 14k gold wedding band with polished finish', 299, 850, '14k Gold', '2mm', '/elegant-14k-gold-wedding-band-on-white-surface.jpg', 50, true),
  ('Classic Gold Band', 'Timeless 14k gold wedding band with polished finish', 349, 950, '14k Gold', '4mm', '/elegant-14k-gold-wedding-band-4mm-on-white-surface.jpg', 50, true),
  ('Classic Gold Band', 'Timeless 14k gold wedding band with polished finish', 399, 1100, '14k Gold', '6mm', '/elegant-14k-gold-wedding-band-6mm-on-white-surface.jpg', 50, true),
  ('Brushed Matte Band', 'Modern brushed matte finish 14k gold band', 329, 900, '14k Gold', '3mm', '/brushed-matte-14k-gold-wedding-band-on-marble.jpg', 30, true),
  ('Brushed Matte Band', 'Modern brushed matte finish 14k gold band', 379, 1000, '14k Gold', '5mm', '/brushed-matte-14k-gold-wedding-band-5mm-on-marble.jpg', 30, true),
  ('Platinum Classic', 'Premium platinum band with mirror polish', 599, 1800, 'Platinum', '2mm', '/platinum-wedding-band-polished-on-white-background.jpg', 25, true),
  ('Platinum Classic', 'Premium platinum band with mirror polish', 699, 2100, 'Platinum', '4mm', '/platinum-wedding-band-4mm-polished-on-white-backgr.jpg', 25, true),
  ('Platinum Comfort Fit', 'Comfort fit platinum band for everyday wear', 749, 2200, 'Platinum', '5mm', '/platinum-comfort-fit-wedding-band-5mm-on-velvet.jpg', 20, true),
  ('Two-Tone Band', 'Elegant combination of gold and platinum', 549, 1500, '14k Gold', '4mm', '/two-tone-gold-platinum-wedding-band-on-white.jpg', 15, true)
ON CONFLICT DO NOTHING;
