# Hospital Management System

A comprehensive web application for managing hospital operations including patients, doctors, appointments, departments, and medical records.

## Overview

This is a full-stack Hospital Management System built with React, Express, and TypeScript. The application provides an intuitive interface for hospital staff to manage all aspects of hospital operations with real-time data updates.

## Features

### Dashboard
- Overview statistics for patients, doctors, appointments, and departments
- Today's appointments at a glance
- Trend indicators showing growth metrics

### Patient Management
- Complete patient registration with personal and medical details
- Blood type tracking
- Allergy and medical history records
- Search and filter functionality
- Patient profile cards with quick actions

### Doctor Management
- Doctor profiles with specialization and department
- Experience tracking
- Availability schedules
- Search by name or specialization

### Appointment System
- Book appointments with patient and doctor selection
- Status tracking (Scheduled, Completed, Cancelled)
- Tabbed view for different appointment statuses
- Update appointment status in real-time
- Search appointments by patient or doctor

### Department Management
- Department overview with bed availability
- Staff count per department
- Occupancy rate tracking
- Head doctor assignment

### Medical Records
- View completed appointments as medical records
- Patient visit history
- Doctor and diagnosis information
- PDF export capability (UI ready)

## Tech Stack

### Frontend
- **React** with TypeScript
- **Wouter** for routing
- **TanStack Query** for server state management
- **Shadcn UI** components with Tailwind CSS
- **Lucide React** for icons
- Dark mode support

### Backend
- **Express.js** with TypeScript
- **Zod** for validation
- **Drizzle ORM** for schema definitions
- In-memory storage for MVP (ready for PostgreSQL migration)

### Styling
- **Tailwind CSS** with custom design system
- Professional medical blue color scheme
- Responsive design for all screen sizes
- Smooth transitions and hover states

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Shadcn base components
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── stat-card.tsx
│   │   │   ├── patient-card.tsx
│   │   │   ├── doctor-card.tsx
│   │   │   ├── appointment-card.tsx
│   │   │   └── department-card.tsx
│   │   ├── pages/         # Page components
│   │   │   ├── dashboard.tsx
│   │   │   ├── patients.tsx
│   │   │   ├── doctors.tsx
│   │   │   ├── appointments.tsx
│   │   │   ├── departments.tsx
│   │   │   └── records.tsx
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Main app component
│   └── index.html
├── server/
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Data storage layer
│   └── index.ts           # Server entry point
├── shared/
│   └── schema.ts          # Shared TypeScript types and Zod schemas
└── design_guidelines.md   # Design system documentation
```

## API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PATCH /api/appointments/:id/status` - Update appointment status

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create new department

### Stats
- `GET /api/stats` - Get dashboard statistics

## Running the Application

The application is configured to run with a single command:

```bash
npm run dev
```

This starts both the Express backend server and Vite frontend development server on port 5000.

## Data Model

### Patient
- Personal information (name, email, phone)
- Medical details (blood type, allergies, medical history)
- Demographics (date of birth, gender, address)

### Doctor
- Professional information (name, email, phone)
- Specialization and department
- Years of experience
- Availability schedule

### Appointment
- Patient and doctor references
- Date and time
- Reason for visit
- Status (scheduled, completed, cancelled)

### Department
- Department information (name, description)
- Head doctor
- Staff count
- Bed availability and occupancy

## Design System

The application uses a professional medical theme with:
- Primary color: Blue (#2563EB - medical blue)
- Clean, modern interface optimized for healthcare workflows
- Consistent spacing and typography
- Accessible color contrast ratios
- Responsive grid layouts

## Future Enhancements

### Planned Features
- Billing and payment tracking
- Prescription management
- Medical inventory system
- Staff management (nurses, administrative)
- Bed/room allocation
- Advanced reporting and analytics
- Email notifications
- Database persistence with PostgreSQL
- User authentication and role-based access
- Audit logging

## User Preferences

- Currently using in-memory storage for rapid prototyping
- Professional medical blue color scheme
- Clean, minimal interface focused on usability
- Quick access to all major functions via sidebar navigation

## Recent Changes

- Initial application setup with full CRUD functionality
- Implemented all core features (patients, doctors, appointments, departments, records)
- Added search and filtering capabilities
- Integrated real-time updates with TanStack Query
- Created comprehensive design system with dark mode support
- Built responsive UI with Shadcn components
