# Crib Society — UI Guidelines

## 1. Visual Direction
Modern Gen Z coffee culture: bold, editorial, urban, slightly rebellious, premium but approachable. Use strong typography, generous spacing, high-contrast surfaces, expressive cards, subtle grain/texture where appropriate, and confident photography.

## 2. Brand Palette
- Primary: Crib Red — #C62828
- Deep Red: #8E1B1B
- Ink: #0B0B0D
- Charcoal: #17171A
- Cream: #F4EFE7
- Warm Gray: #A8A29A
- White: #FFFFFF
Use red as an accent/action color rather than flooding every surface.

## 3. Typography
- Display: bold geometric/neo-grotesk feel.
- Body: clean sans-serif.
- Strong hierarchy: oversized landing headlines, compact dashboard labels, readable POS numerics.

## 4. Layout
- Landing: editorial sections, asymmetric compositions, strong CTA.
- POS: productivity-first, two-column desktop layout; stacked mobile layout.
- Dashboard: compact sidebar + content canvas, KPI cards, tables/charts.
- Max content width should preserve comfortable reading and operational density.

## 5. Components
Buttons, inputs, selects, badges, cards, modal, drawer, tabs, dropdown, toast, table, pagination, product card, cart item, KPI card, status chip.

## 6. Interaction
- Clear hover/focus/active states.
- 150–250ms transitions for common UI interactions.
- Avoid excessive animation.
- Destructive actions require confirmation.
- Toasts confirm successful operations.

## 7. Responsive Rules
Mobile-first. POS controls must remain thumb-friendly. Tables should transform into cards or horizontal scroll where necessary. Sidebar becomes a drawer on small screens.

## 8. Accessibility
Maintain readable contrast, visible focus states, semantic controls, labels for forms, keyboard-friendly interactions, and sufficient touch targets.

## 9. Tech Styling Rule
Use Tailwind CSS Play CDN for HTML/static prototypes where needed, and Tailwind-compatible utility classes in the React + Vite implementation. Avoid introducing another CSS framework.
