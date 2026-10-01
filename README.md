# Career Connect Hub

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Project Overview

**Career Connect Hub** is a modern, responsive job portal and recruitment platform designed to seamlessly connect job seekers, employers, and hiring managers. Built using React, TypeScript, Vite, and Tailwind CSS, the platform provides an intuitive, high-performance interface for searching open positions, submitting job applications, bookmarking listings, posting new jobs, and managing recruiter dashboards.

---

## Features

### 🔍 For Job Seekers
- **Real-Time Job Search**: Search open positions by job title, company name, skill, or keyword.
- **Advanced Filtering**: Filter listings dynamically by Category, Location, and Employment Type (Full-time, Part-time, Contract, Remote).
- **Interactive Job Application**: Submit applications directly with full candidate contact details, cover notes, and instant toast notifications.
- **Saved / Bookmarked Jobs**: Save interesting job postings to a local saved list for easy review later.
- **Candidate Dashboard**: Track applied job statuses (*Submitted*, *Under Review*, *Interview*), manage saved positions, and update candidate profile details.

### 💼 For Employers & Recruiters
- **Post a Job Listing**: Publish new job opportunities specifying title, company, salary range, category, location, job type, description, and requirements.
- **Listings Management**: View active job listings, monitor candidate applicant counts in real-time, and delete expired listings.
- **Applicant Review**: Review incoming candidate applications, candidate contact details, and update hiring statuses.

### 🛡️ For Administrators
- **Multi-Role Switcher**: Seamlessly switch between Applicant, Recruiter, and Administrator views for quick testing and demonstration.
- **System Metrics**: Overview of total platform users, live job listings, pending approvals, and system health status.

---

## Tech Stack

- **Frontend Library**: [React 18](https://react.dev/)
- **Programming Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Styling & Design System**: [Tailwind CSS](https://tailwindcss.com/), Radix UI Primitives, Lucide Icons, Framer Motion
- **State & Data Management**: React Context API (`AuthContext`, `JobContext`), LocalStorage Persistence
- **Form & UI Feedback**: Sonner Toast Notifications
- **Testing Framework**: [Vitest](https://vitest.dev/) & React Testing Library
- **Linting & Code Quality**: ESLint 9 & TypeScript Compiler (`tsc`)

---

## Project Structure

```text
career-connect-hub/
├── public/                 # Static public assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Radix UI / Shadcn base components
│   │   ├── Footer.tsx      # Application footer with navigation links
│   │   ├── HeroSection.tsx # Hero search banner & stats
│   │   ├── JobCard.tsx     # Interactive job card component
│   │   └── Navbar.tsx      # Main top header & responsive mobile drawer
│   ├── context/            # React Context state management
│   │   ├── AuthContext.tsx # Authentication & user profile state
│   │   └── JobContext.tsx  # Jobs, applications, and saved jobs state
│   ├── data/
│   │   └── mockData.ts     # Initial seed jobs, categories, and locations
│   ├── hooks/              # Custom React hooks (use-toast, use-mobile)
│   ├── lib/                # Utility helpers (clsx, tailwind-merge)
│   ├── pages/              # Application page views
│   │   ├── About.tsx       # About Career Connect Hub
│   │   ├── Companies.tsx   # Hiring company directory
│   │   ├── Contact.tsx     # Contact & feedback form page
│   │   ├── Dashboard.tsx   # Role-based applicant & recruiter dashboard
│   │   ├── Index.tsx       # Landing page / Home
│   │   ├── JobDetail.tsx   # Full job specification & application modal
│   │   ├── Jobs.tsx        # Search & filter jobs catalog
│   │   ├── Login.tsx       # Authentication sign in page
│   │   ├── NotFound.tsx    # 404 Error fallback page
│   │   ├── Privacy.tsx     # Platform privacy policy
│   │   └── Register.tsx    # User registration & role selection page
│   ├── test/               # Vitest unit test suite
│   ├── App.tsx             # Main routing & Provider wrapper
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind CSS imports & theme variables
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules for node_modules, build & secrets
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML document root
├── package.json            # Dependencies and scripts configuration
├── tailwind.config.ts      # Tailwind CSS theme extension
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## Requirements

Ensure you have the following installed on your machine before running the project:

- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x`)
- **npm**: `v9.0.0` or higher (or `yarn` / `pnpm` / `bun`)
- **Git**: For version control management

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Tejaswini-2006/career-connect-hub.git
   cd career-connect-hub
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

---

## Environment Variables

Copy `.env.example` to create a `.env` file for local environment configurations:

```bash
cp .env.example .env
```

### Sample `.env.example` Configuration:
```env
# Application Information
VITE_APP_NAME="Career Connect Hub"
VITE_APP_DESCRIPTION="Modern Job & Recruitment Platform"
VITE_APP_URL="http://localhost:8080"

# API Base URL (For REST/GraphQL backend connection)
VITE_API_BASE_URL="http://localhost:5000/api/v1"

# Feature Flags
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_ANALYTICS=false
```

> ⚠️ **Security Warning**: Never commit real API secrets, database credentials, or auth keys to Git repositories.

---

## How to Run

Start the local Vite development server:

```bash
npm run dev
```

The application will be available at: `http://localhost:8080` (or `http://localhost:5173`).

---

## How to Build

To create an optimized production build:

```bash
npm run build
```

The compiled output will be generated inside the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## How to Test

Run the Vitest test suite:

```bash
npm run test
```

To run linting checks:

```bash
npm run lint
```

To perform TypeScript type verification:

```bash
npx tsc --noEmit
```

---

## Database Setup

Currently, **Career Connect Hub** operates with local state management (`JobContext` and `AuthContext`) with persistent client-side storage via `localStorage`.

If integrating a SQL/NoSQL database (e.g., PostgreSQL, MongoDB, or Supabase):
1. Configure database connection parameters in `.env`.
2. Run database migrations using your chosen ORM (Prisma / Drizzle / TypeORM).
3. Seed initial positions using the structured schema from `src/data/mockData.ts`.

---

## API Documentation

When connected to a backend REST service, Career Connect Hub interacts with the following endpoint schemas:

### Authentication
- `POST /api/v1/auth/register` — Register new candidate or recruiter.
- `POST /api/v1/auth/login` — Authenticate user and issue JWT token.

### Jobs API
- `GET /api/v1/jobs` — Retrieve job listings with support for query parameters (`?q=`, `?category=`, `?location=`, `?type=`).
- `GET /api/v1/jobs/:id` — Get detailed job specifications by ID.
- `POST /api/v1/jobs` — Create a new job posting (Requires Recruiter authentication).
- `DELETE /api/v1/jobs/:id` — Delete a job listing (Requires Recruiter/Admin authorization).

### Applications API
- `POST /api/v1/applications` — Submit a candidate application.
- `GET /api/v1/applications/user` — Fetch all applications submitted by the current job seeker.

---

## Screenshots

*(Place screenshot images here after capturing UI preview)*

| Home Page | Job Catalog |
| :---: | :---: |
| ![Home Page Placeholder](https://via.placeholder.com/600x350?text=Career+Connect+Hub+Home) | ![Jobs Catalog Placeholder](https://via.placeholder.com/600x350?text=Job+Catalog+and+Filters) |

| Candidate Dashboard | Recruiter Job Posting |
| :---: | :---: |
| ![Dashboard Placeholder](https://via.placeholder.com/600x350?text=Applicant+Dashboard) | ![Job Post Placeholder](https://via.placeholder.com/600x350?text=Recruiter+Post+Job) |

---

## Troubleshooting

### 1. CSS `@import` Build Warnings
- **Cause**: Placement of `@import` after `@tailwind` directives in CSS.
- **Solution**: Ensure `@import url(...)` is placed at the top of `src/index.css`.

### 2. Node Version Incompatibility
- **Cause**: Using older Node.js versions (< 18.0.0).
- **Solution**: Upgrade to Node.js v18 LTS or v20 LTS using `nvm use 20`.

### 3. Missing Dependencies Error
- **Cause**: Incomplete installation or package lock mismatch.
- **Solution**: Delete `node_modules` and run `npm install`.

---

## Future Improvements

- [ ] **Backend Integration**: Connect to Node.js/Express REST API or Supabase backend.
- [ ] **Resume File Upload**: Support PDF/DOCX file uploads for candidate applications using AWS S3 / Cloudinary.
- [ ] **AI Resume Matcher**: Automated scoring and matching of candidate resumes against job descriptions.
- [ ] **Email Notifications**: Automated email alerts for job application status changes.

---

## Author

**Tejaswini Rakhunde**  
- GitHub: [@Tejaswini-2006](https://github.com/Tejaswini-2006)  
- Project Repository: [career-connect-hub](https://github.com/Tejaswini-2006/career-connect-hub)
