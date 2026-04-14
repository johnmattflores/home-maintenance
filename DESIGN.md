# Design System & Theme

## Overview

The House Maintenance Tracker features a modern, professional design built with **shadcn/ui** components and a carefully crafted color scheme.

## Design Principles

### 1. Visual Hierarchy
- Clear differentiation between task statuses using colored borders and badges
- Gradient backgrounds for visual appeal
- Consistent spacing and typography

### 2. Color Scheme

**Status Colors:**
- **Overdue**: Red (#DC2626) - Urgent attention required
- **Due Soon**: Yellow/Amber (#D97706) - Requires attention within 7 days
- **Upcoming**: Green (#16A34A) - All good, scheduled maintenance
- **Not Set**: Gray - Tasks without dates

**Brand Colors:**
- **Primary**: Blue to Indigo gradient (#2563EB → #4F46E5)
- **Background**: Slate to Blue gradient (Light mode)
- **Background**: Slate gradient (Dark mode)

### 3. Component Design

#### Stats Cards
- Gradient backgrounds with colored left borders
- Large, bold numbers for quick scanning
- Icons from Lucide React for visual clarity
- Responsive grid layout (1-2-4 columns)

#### Task Cards
- Left colored border indicates status at a glance
- Hover effect for interactivity
- Badge system for categories and status
- Inline editing without leaving the card
- Icon-enhanced buttons for actions

#### Filter Bar
- Pill-style buttons with gradient active state
- Clear visual feedback for selected filter
- Wraps responsively on mobile devices

#### Modal Dialogs
- Clean, centered overlay design
- Form validation with required field indicators
- Accessible with proper labels and descriptions

## Typography

**Font Family**: System font stack with fallback
- **Headings**: Bold, larger sizes (text-4xl, text-lg)
- **Body**: Medium weight for readability
- **Labels**: Muted foreground color for hierarchy

## Spacing

Consistent spacing scale:
- `gap-2`: 0.5rem (8px) - Tight spacing
- `gap-4`: 1rem (16px) - Standard spacing
- `gap-6`: 1.5rem (24px) - Section spacing
- `py-8`: 2rem (32px) - Page padding

## Responsive Design

### Breakpoints
- **Mobile**: < 640px - Single column layout
- **Tablet**: 640px - 1024px - 2 column grid
- **Desktop**: > 1024px - 3 column grid

### Mobile Optimizations
- Touch-friendly button sizes (size="sm" for compact layout)
- Wrapping filter buttons
- Stacked stat cards
- Full-width modals

## Dark Mode

Automatic dark mode support:
- Inverted background gradients
- Adjusted opacity for overlays
- Color-shifted status indicators
- Maintained contrast ratios

## Accessibility

- Semantic HTML elements
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Color contrast compliance (WCAG AA)
- Screen reader friendly

## Icons

**Lucide React Icons Used:**
- `Home` - App branding
- `Plus` - Add new task
- `AlertCircle` - Overdue status
- `Clock` - Due soon status
- `CheckCircle2` - Upcoming/completed status
- `Filter` - Filter section
- `Calendar` - Date fields
- `Tag` - Categories
- `Pencil` - Edit action
- `Trash2` - Delete action
- `Save` - Save changes
- `X` - Cancel/Close

## Component Library

Built with **shadcn/ui** components:
- `Card` - Task containers and stats
- `Button` - All interactive actions
- `Badge` - Status and category labels
- `Dialog` - Add/Edit task modals
- `Input` - Text and date inputs
- `Label` - Form field labels
- `Select` - Dropdown for frequency
- `Alert` - Empty state messages
- `Separator` - Visual dividers

## Future Enhancements

Potential design improvements:
- Add animations for card transitions
- Implement skeleton loaders
- Add toast notifications for actions
- Create data visualization charts
- Add calendar view option
- Implement drag-and-drop reordering
