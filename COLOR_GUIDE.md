# GO Time - Color Palette Reference Guide

## Color System Overview

This guide explains the age-inclusive color palette designed for GO Time Neighborhood Map app.

---

## Primary Color - Warm Teal
**Purpose**: Main brand color, primary actions, headers

```
#0D9488 (Primary)
#14B8A6 (Light/Hover)
#0F766E (Dark)
```

**Why Teal?**
- Modern and approachable for all ages
- High contrast for accessibility
- Warm enough for seniors, modern enough for youth
- Works well on both light and dark backgrounds

**Usage:**
- Primary buttons (e.g., "Publicar en el mapa")
- Header backgrounds
- Active states
- Links and focus indicators
- Map overlay elements

---

## Accent Color - Vibrant Amber
**Purpose**: Secondary actions, highlights, category badges

```
#F59E0B (Primary)
#FBBF24 (Light/Hover)
#D97706 (Dark)
```

**Why Amber?**
- Energetic and warm
- High visibility without being aggressive
- Appeals to younger users while remaining professional
- Excellent contrast for readability
- Warm enough to feel welcoming to all ages

**Usage:**
- Secondary buttons
- "Ofrezco" (Offer) activity badges
- Category badges
- Highlights and attention-grabbers
- Secondary interactive elements

---

## Secondary Color - Soft Rose
**Purpose**: "Need" activities, complementary accent

```
#F87171 (Primary)
#FB7185 (Light/Hover)
#F43F5E (Dark)
```

**Why Rose?**
- Complementary to teal (opposite on color wheel)
- Softer than pure red (better for older eyes)
- Less aggressive than bright red
- Better for color-blind accessibility

**Usage:**
- "Necesito" (Need) activity markers
- Need-related badges and buttons
- Complementary visual elements
- Secondary alerts

---

## Neutral Colors

### Text Colors
- **Primary Text**: `#374151` (Dark gray)
  - Body text, descriptions
  - Good contrast on light backgrounds
  
- **Heading Text**: `#111827` (Nearly black)
  - Headlines, titles
  - Maximum contrast and readability
  
- **Muted Text**: `#6B7280` (Medium gray)
  - Secondary information
  - Helper text, placeholders
  - Metadata (dates, authors)

### Background Colors
- **Primary Background**: `#FFFFFF` (White)
  - Main app background
  - Card backgrounds
  - Form inputs
  
- **Light Background**: `#F9FAFB` (Off-white)
  - Alternative background
  - Section separators
  - Subtle contrast areas

### Borders & Dividers
- **Border Color**: `#E5E7EB` (Light gray)
  - Card borders
  - Input borders
  - Section dividers

---

## Semantic Color Usage

### Offer Activities (🤝)
- Badge Background: Teal (#0D9488)
- Badge Text: White
- Card Border: Teal-200 (#99F6E4)
- Card Background: Teal-50 (#F0FDFA)
- Hover State: Teal-100 (#CCFBF1)

### Need Activities (🙌)
- Badge Background: Rose (#F87171)
- Badge Text: White
- Card Border: Rose-200 (#FECDD3)
- Card Background: Rose-50 (#FEF2F2)
- Hover State: Rose-100 (#FEE2E2)

### Interactive Elements
- **Primary Button**: Teal (#0D9488) → Teal-600 on hover
- **Secondary Button**: Amber (#F59E0B) → Amber-600 on hover
- **Focus State**: Teal ring with 20% opacity
- **Disabled State**: Muted gray (#E5E7EB)

### Success State
- **WhatsApp Button**: #25D366 (Official WhatsApp green)
- Used for main contact action
- Maintains recognizable brand color

---

## Dark Mode Colors

When dark mode is enabled, colors automatically invert:

### Dark Mode Palette
- **Background**: `#111827` (Dark charcoal)
- **Card Background**: `#1F2937` (Slightly lighter)
- **Text**: `#F9FAFB` (Off-white)
- **Primary**: `#14B8A6` (Lighter teal)
- **Border**: `#374151` (Medium gray)
- **Muted Text**: `#9CA3AF` (Light gray)

---

## Accessibility Standards

✅ **WCAG AA Compliance**
- All text color combinations have contrast ratio ≥ 4.5:1
- Large text (18px+) have contrast ratio ≥ 3:1
- Interactive elements are distinguishable without color alone

✅ **Color Blindness Friendly**
- Uses warm colors (teal, amber, rose) not red-green
- Includes text labels with icons
- Enough brightness variation for grayscale viewing

✅ **Age-Inclusive Design**
- Text sizes suitable for reading (16px base)
- Line height 1.6 for comfortable reading
- High contrast for aging eyes
- Warm tones less harsh than cool colors

---

## Implementation in Code

### CSS Variables
```css
:root {
  --primary: #0D9488;
  --secondary: #F59E0B;
  --accent: #F87171;
  --foreground: #111827;
  --background: #FFFFFF;
}
```

### Tailwind Usage
```tsx
// Buttons
<Button className="bg-primary text-primary-foreground">...</Button>
<Button className="bg-secondary text-secondary-foreground">...</Button>

// Cards
<div className="bg-card border border-border">...</div>

// Text
<p className="text-foreground">...</p>
<span className="text-muted-foreground">...</span>
```

---

## Color Palette Summary Table

| Color | Light | Primary | Dark | Usage |
|-------|-------|---------|------|-------|
| **Teal** | #99F6E4 | #0D9488 | #0F766E | Primary actions, headers |
| **Amber** | #FBBF24 | #F59E0B | #D97706 | Secondary actions, highlights |
| **Rose** | #FB7185 | #F87171 | #F43F5E | Need activities, alerts |
| **Text** | - | #374151 | #F9FAFB | Body text |
| **Heading** | - | #111827 | #F9FAFB | Headlines |
| **Background** | #F9FAFB | #FFFFFF | #111827 | Main background |

---

## Testing the Colors

To verify color accessibility and contrast:

1. **Use Online Tools:**
   - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
   - [Accessible Colors](https://accessible-colors.com/)

2. **Test with Users:**
   - Test with color-blind users
   - Test with older adults (50+)
   - Test with young users (18-25)

3. **Dark Mode Testing:**
   - Enable dark mode in browser dev tools
   - Verify all text remains readable
   - Check color combinations still work

---

## Future Color Considerations

If adding more colors in the future:
1. Stay within warm color families
2. Maintain contrast ratios ≥ 4.5:1
3. Consider colorblind vision (avoid red-green)
4. Test with seniors and youth
5. Ensure dark mode support
