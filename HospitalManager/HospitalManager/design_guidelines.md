# Hospital Management System - Design Guidelines

## Design Approach

**Selected System:** Material Design 3 with healthcare-optimized adaptations
**Rationale:** Information-dense healthcare application requiring clarity, professional credibility, and efficient data management workflows

## Typography

**Primary Font:** Inter (via Google Fonts CDN)
**Hierarchy:**
- Page Titles: text-3xl font-bold (30px)
- Section Headers: text-xl font-semibold (20px)
- Card Titles: text-lg font-medium (18px)
- Body Text: text-base (16px)
- Labels/Meta: text-sm text-gray-600 (14px)
- Table Headers: text-sm font-semibold uppercase tracking-wide

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, and 8 (e.g., p-4, mb-6, gap-8)
**Container Structure:**
- Main dashboard: Full-width with max-w-7xl container
- Side navigation: Fixed 64px (w-16) collapsed, 256px (w-64) expanded
- Content padding: p-6 on mobile, p-8 on desktop
- Card spacing: gap-6 for grids
- Form fields: mb-4 between fields, mb-6 between sections

**Grid Layouts:**
- Stats cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Patient/Doctor listings: grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
- Tables: Full-width responsive with horizontal scroll on mobile

## Component Library

### Navigation
- Vertical sidebar with icon + label for main sections (Dashboard, Patients, Doctors, Appointments, Departments, Records)
- Top bar with breadcrumbs, search, and user profile dropdown
- Mobile: Bottom navigation bar with 4 primary actions

### Dashboard Cards
- Elevated cards (shadow-md) with rounded-lg corners
- Header with icon, title, and action menu
- Stat cards: Large number (text-4xl font-bold), label below, trend indicator (↑/↓)
- Patient/Doctor cards: Avatar (w-12 h-12), name, specialty/condition, status badge

### Data Tables
- Zebra striping for row differentiation
- Fixed header on scroll
- Row hover state for interactivity
- Action column (right-aligned) with icon buttons
- Pagination footer with page size selector

### Forms
- Grouped sections with subtle borders
- Label above input pattern
- Input fields: border rounded-md with focus:ring-2
- Required field indicator (*)
- Helper text below inputs (text-sm text-gray-500)
- Submit buttons: Primary action (right-aligned), secondary actions (left)

### Status Badges
- Rounded-full px-3 py-1 text-xs font-medium
- Semantic states: Scheduled, Completed, Cancelled, Active, Inactive, Critical, Stable

### Modals & Overlays
- Backdrop overlay (bg-black/50)
- Centered modal with max-w-2xl
- Modal header with title and close button
- Modal footer with action buttons (Cancel left, Primary right)

### Search & Filters
- Search bar with icon prefix in top navigation
- Filter panel: Collapsible sidebar or dropdown with checkboxes/radio groups
- Applied filters shown as removable chips

## Animations

**Minimal Motion:**
- Card hover: subtle shadow lift (transition-shadow duration-200)
- Button interactions: Standard states only
- Page transitions: None (instant navigation)
- Loading states: Simple spinner, no skeleton screens

## Images

**Professional Medical Imagery:**
- Dashboard hero banner: Abstract medical pattern (stethoscope, heartbeat line) as subtle background texture (NOT a large hero image)
- Doctor/Patient avatars: Circular placeholder with initials or uploaded photos
- Empty states: Simple line illustrations for "No appointments scheduled" or "No patients found"

**Image Specifications:**
- Avatar: w-10 h-10 for lists, w-16 h-16 for profiles
- Banner: Full-width, h-32, low opacity background pattern
- Icons: Use Material Icons via CDN, size-5 (20px) for inline, size-6 (24px) for buttons

## Application-Specific Patterns

### Appointment Calendar
- Week/Month view toggle
- Time slots in 30-minute increments
- Color-coded by department
- Quick-add appointment button overlay

### Patient Medical Records
- Timeline view (vertical) showing visit history
- Expandable cards per visit
- Attached documents as downloadable chips

### Department Management
- Grid of department cards with bed count, staff count, current occupancy
- Quick stats overlay on each card

## Accessibility
- Consistent aria-labels on all interactive elements
- Form inputs with proper label associations
- Keyboard navigation support for tables and modals
- High contrast ratios maintained throughout