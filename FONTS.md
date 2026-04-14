# Typography & Font System

## Font Choices

The application uses a professional, modern font stack optimized for readability and aesthetics.

### Primary Font: Inter

**Inter** is used for all body text and headings.

**Why Inter?**
- Designed specifically for computer screens and user interfaces
- Excellent readability at all sizes
- Professional, modern appearance
- Variable font with optical sizing for perfect rendering
- Used by companies like GitHub, Mozilla, and Figma
- OpenType features for enhanced typography

### Monospace Font: JetBrains Mono

**JetBrains Mono** is used for code snippets and monospace elements.

**Why JetBrains Mono?**
- Designed for developers with increased letter height
- Enhanced readability for code
- Distinctive character shapes reduce confusion
- Professional appearance

## Font Configuration

### Next.js Font Optimization

```typescript
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Prevents flash of unstyled text
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});
```

**Benefits:**
- ✅ Automatic font optimization
- ✅ Self-hosted fonts (no external requests)
- ✅ Zero layout shift with `display: swap`
- ✅ Subset to Latin characters for smaller file size
- ✅ CSS variables for easy customization

### Typography Scale

```css
/* Headings */
h1: 2.25rem (36px) - Bold, Tight tracking
h2: 1.875rem (30px) - Bold
h3: 1.5rem (24px) - Semibold
h4: 1.25rem (20px) - Semibold
h5: 1.125rem (18px) - Medium
h6: 1rem (16px) - Medium

/* Body */
Base: 1rem (16px) - Regular
Small: 0.875rem (14px) - Regular
Tiny: 0.75rem (12px) - Medium
```

### Font Weights

- **Regular (400)**: Body text, labels
- **Medium (500)**: Emphasized text, small headings
- **Semibold (600)**: Subheadings, buttons
- **Bold (700)**: Main headings, important actions

## Advanced Features

### OpenType Features

```css
font-feature-settings:
  "rlig" 1,  /* Required ligatures */
  "calt" 1;  /* Contextual alternates */
```

For headings:
```css
font-feature-settings:
  "ss01" 1,  /* Stylistic set 1 */
  "ss02" 1;  /* Stylistic set 2 */
```

### Font Rendering Optimizations

```css
text-rendering: optimizeLegibility;       /* Better kerning and ligatures */
-webkit-font-smoothing: antialiased;      /* Smoother on macOS/iOS */
-moz-osx-font-smoothing: grayscale;       /* Smoother on Firefox/macOS */
```

### Letter Spacing

- **Headings**: `-0.025em` (tighter for better visual weight)
- **H1 specific**: `tracking-tight` (even tighter for impact)
- **Body**: Default (optimized by Inter)

## Usage Examples

### Headings

```tsx
<h1 className="text-4xl font-bold tracking-tight">
  House Maintenance Tracker
</h1>
```

### Body Text

```tsx
<p className="text-base text-muted-foreground">
  Keep your home in top shape
</p>
```

### Small Text

```tsx
<span className="text-sm font-medium">
  Last updated: Today
</span>
```

### Emphasized Text

```tsx
<p className="font-semibold text-foreground">
  Important information
</p>
```

## Performance

### Font Loading Strategy

1. **Display: Swap** - Shows fallback font immediately, swaps to custom font when loaded
2. **Preloading** - Next.js automatically preloads font files
3. **Subsetting** - Only Latin characters included (smaller files)
4. **Self-hosting** - No external requests, better privacy and performance

### File Sizes (Optimized)

- Inter (variable): ~30KB gzipped
- JetBrains Mono: ~20KB gzipped

**Total**: ~50KB for professional typography

## Accessibility

✅ **High Contrast**: Passes WCAG AA standards
✅ **Readable Sizes**: Minimum 14px for body text
✅ **Clear Hierarchy**: Distinct heading sizes
✅ **Line Height**: Optimized for readability (1.5 for body, 1.2 for headings)
✅ **Letter Spacing**: Enhanced for clarity

## Browser Support

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers
- ✅ Graceful fallback to system fonts

## Fallback Fonts

```css
--font-sans:
  var(--font-inter),
  ui-sans-serif,
  system-ui,
  sans-serif;

--font-mono:
  var(--font-jetbrains-mono),
  ui-monospace,
  monospace;
```

System fonts provide instant rendering while custom fonts load.

## Customization

To change fonts, edit `app/layout.tsx`:

```typescript
import { YourFont } from "next/font/google";

const yourFont = YourFont({
  variable: "--font-custom",
  subsets: ["latin"],
  display: "swap",
});
```

Then update `app/globals.css`:

```css
--font-sans: var(--font-custom), ui-sans-serif, system-ui, sans-serif;
```

## Resources

- [Inter Font](https://rsms.me/inter/)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
