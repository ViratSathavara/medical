# 🏥 MedPulse — Enterprise Hospital Management System (HMS)

> A full-stack, enterprise-grade, production-ready Hospital Management System built with **Next.js 15, React 18, TypeScript, Tailwind CSS, Redux Toolkit, Express.js, and MongoDB**. Engineered with strict HIPAA/GDPR clinical data privacy, multi-tenant RBAC, real-time appointments slot engine, PDF document generation, emergency trauma triage, electronic medical records (EMR), and executive analytics.

---

## 📑 Table of Contents

- [Architectural Overview](#-architectural-overview)
- [Technology Stack](#-technology-stack)
- [System Modules & Features](#-system-modules--features)
- [Pre-Seeded Demo Credentials](#-pre-seeded-demo-credentials)
- [Quick Start Guide](#-quick-start-guide)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Docker Deployment](#-docker-deployment)
- [API Documentation & Swagger](#-api-documentation--swagger)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Security & HIPAA Compliance](#-security--hipaa-compliance)

---

## 🏛 Architectural Overview

MedPulse follows a modern, decoupled client-server architecture:

```
┌──────────────────────────────────────────────────────────┐
│                   MedPulse Web Frontend                  │
│       Next.js 15 App Router • React 18 • TypeScript      │
│   Tailwind CSS • Redux Toolkit • Recharts • Lucide Icons │
└────────────┬─────────────────────────────▲───────────────┘
             │ HTTP REST / JSON            │
             ▼                             │
┌──────────────────────────────────────────┴───────────────┐
│                   MedPulse API Gateway                   │
│         Node.js • Express.js • TypeScript • RBAC         │
│  Centralized Middleware • Error Handlers • PDF Generator │
└────────────┬─────────────────────────────▲───────────────┘
             │ Mongoose ODM                │
             ▼                             │
┌──────────────────────────────────────────┴───────────────┐
│                   MongoDB Database                       │
│    25+ Collections • Indexes • Forensic Audit Trail      │
└──────────────────────────────────────────────────────────┘
```

---

## 💻 Technology Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI & View:** React 18, Lucide React Icons
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **State Management:** Redux Toolkit & React-Redux
- **Data Visualization:** Recharts (Area, Bar, Pie charts)
- **Validation & Forms:** React Hook Form + Zod
- **Networking:** Axios with token refresh interceptors

### Backend
- **Runtime & Server:** Node.js 20+ & Express.js
- **Language:** TypeScript 5
- **Database & ODM:** MongoDB with Mongoose
- **Authentication & Security:** JWT (Access & Refresh tokens), bcryptjs, Helmet, CORS
- **Validation:** Zod schemas
- **PDF Generation:** PDFKit (Prescriptions, Invoices, Lab Reports, Discharge Summaries)
- **API Documentation:** Swagger UI (`swagger-ui-express`)
- **Email:** Nodemailer (with fallback logger mode)
- **File Storage:** Multer disk storage

---

## 🌟 System Modules & Features

### 1. 🛡️ Authentication & Role-Based Access Control (RBAC)
- Strict multi-role permission matrix: `PATIENT`, `DOCTOR`, `ADMIN`, `STAFF`.
- Patients have zero read access to other patients' Protected Health Information (PHI).
- Secure password hashing, session tokens, and instant 1-click quick-demo login buttons.

### 2. 🩺 Doctor Practice & Clinical Hub
- **Executive Summary:** Today's appointments, queue counters, upcoming patients.
- **Consultation Hub:** All-in-one patient interface for vitals recording, ICD-10 diagnostic entries, BMI calculations, and instant digital prescription issuance.
- **Appointment Management:** Real-time status transitions (`Confirmed`, `Completed`, `Cancelled`).
- **Practice Schedule & Slots:** Customizable operating days, consultation time slots, and visit fee configurations.
- **Secure Messaging:** Confidential doctor-to-patient chat threads.

### 3. 🧑‍🤝‍🧑 Patient Health Portal
- **Dashboard Overview:** Upcoming clinic appointments, health alerts, active prescriptions.
- **Live Online Booking:** Live doctor search by department, dynamic time slot availability, double-booking prevention.
- **Electronic Health Records (EHR):** Full visit chronology, clinical notes, and physical vitals.
- **Digital Prescriptions:** Downloadable cryptographic PDFs with dosage schedules and instructions.
- **Laboratory Diagnostic Reports:** Abnormal result flags, reference values, and official PDF lab slips.
- **Invoices & Receipts:** Itemized bills, payment history, and instant receipt downloads.

### 4. 🏢 Hospital Administration & Operations
- **Executive Analytics:** Live hospital metrics with Recharts visualizations for monthly revenue, appointment volume, department distribution, and bed occupancy gauges.
- **User Accounts:** Identity management, role assignment, and account activation toggles.
- **Doctor Approvals:** Professional credential verification, hospital department allocations, and fee schedules.
- **Patient Registry:** Master database of all medical profiles and emergency contacts.
- **Staff Directory:** Roster management for nurses, lab technicians, pharmacists, and receptionists.
- **Departments & Facilities:** Clinical divisions, room numbers, bed capacity, and floor allocations.
- **Pharmacy & Stock:** Pharmaceutical drug catalog, batch expiration tracking, and stock in/out auditing.
- **Laboratory Center:** Diagnostic test catalog, specimen tracking, result entry, and automated PDF reports.
- **Billing & Invoices:** Multi-line invoice authoring, payment recording, and balance reconciliation.
- **Inpatient Admissions:** Ward and bed allocations, clinical course tracking, and discharge summary PDF generation.
- **Emergency Trauma Triage:** ESI Acuity levels 1–4, resuscitation bay alerts, and triage queuing.
- **System Audit Trail:** Forensic HIPAA/GDPR immutable logging of all database actions, timestamps, and IP addresses.
- **Hospital Configuration:** Global branding, emergency telephone hotlines, and facility operating hours.

---

## 🔑 Pre-Seeded Demo Credentials

All test accounts come pre-configured with active health records, sample appointments, prescriptions, and lab reports:

| Portal Role | Email Address | Password | Key Access |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@hospital.com` | `Password123!` | Full hospital operations, analytics, audits, staff |
| **Doctor / Clinician** | `doctor@hospital.com` | `Password123!` | Consultation hub, EMR, prescriptions, schedule |
| **Patient** | `patient@hospital.com` | `Password123!` | My appointments, medical records, invoices, reports |
| **Clinical Staff** | `nurse.sarah@hospital.com` | `Password123!` | Inpatient wards, pharmacy stock, lab requests |

*(You can also use the **Quick Demo Login** 1-click buttons directly on the `/login` page)*

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v20+ recommended)
- **MongoDB:** Local MongoDB running at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Verify or configure .env
# Default PORT=5000, MONGO_URI=mongodb://127.0.0.1:27017/hospital_management

# Seed the database with departments, doctors, patients, meds, and lab tests
npm run seed

# Run automated backend test suites
npm test

# Start backend server in development mode
npm run dev
```

The backend starts at `http://localhost:5000`.  
- **Swagger Documentation:** `http://localhost:5000/api/docs`  
- **API Health Check:** `http://localhost:5000/api/health`

---

### 3. Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

The frontend web application runs at `http://localhost:3000`.

---

## 🐳 Docker Deployment

To launch the complete MedPulse ecosystem (MongoDB, Express Backend, and Next.js Frontend) in isolated Docker containers:

```bash
# In the project root directory
docker compose up --build -d
```

Services will be accessible at:
- **Web Application:** `http://localhost:3000`
- **Backend API:** `http://localhost:5000/api`
- **Interactive Swagger Docs:** `http://localhost:5000/api/docs`
- **MongoDB:** `localhost:27017`

To stop the containers:
```bash
docker compose down
```

---

## 📑 API Documentation & Swagger

Interactive OpenAPI / Swagger documentation is mounted at:
```
http://localhost:5000/api/docs
```

All 18 RESTful route modules are documented:
- `/api/auth` — Registration, authentication, password reset, active session
- `/api/doctors` — Profiles, credentials, availability slots, dashboard summary
- `/api/patients` — Clinical records, emergency contacts, vital histories
- `/api/departments` — Specialized clinical divisions & doctors list
- `/api/appointments` — Live booking, doctor slot generation, status updates
- `/api/medical-records` — Clinical consultations, diagnoses, vitals, prescriptions
- `/api/prescriptions` — Rx authoring, dispensation tracking, PDF generation
- `/api/pharmacy` — Medication catalog, stock adjustments, low-stock warnings
- `/api/laboratory` — Test catalog, test requests, result entry, PDF lab reports
- `/api/billing` — Invoices, line items, payment processing, PDF billing slips
- `/api/facilities` — Wards, rooms, beds, occupancy rates, maintenance
- `/api/inpatient` — Hospital admissions, bed occupancy, discharge summary PDFs
- `/api/emergency` — Trauma cases, ESI priority levels, triage status
- `/api/staff` — Operational and clinical hospital personnel
- `/api/communication` — Secure doctor-patient messaging & notifications
- `/api/hospital` — Institution profile, contact points, operating hours
- `/api/admin` — Analytics dashboard metrics, charts, forensic audit logs

---

## 🛡️ Security & HIPAA Compliance

1. **Role-Based Authorization:** Every request is authenticated via signed JWTs and checked against granular role permissions (`PATIENT`, `DOCTOR`, `ADMIN`, `STAFF`).
2. **PHI Segregation:** Patients cannot access records outside their own `patientId`. Any cross-tenant attempt triggers an automatic 403 Forbidden.
3. **Forensic Audit Logging:** Every patient admission, prescription generation, user deactivation, and medical report update is permanently logged in the `AuditLog` collection with timestamp, user ID, module, and IP address.
4. **Data Sanitization & Validation:** All incoming payloads are strictly validated using Zod schemas with centralized error formatting.
5. **Transport Security:** HTTP headers hardened via `Helmet` and scoped `CORS` policies.

---

## 📄 License
This project is proprietary healthcare software developed for modern clinical management and hospital operations. All rights reserved.
