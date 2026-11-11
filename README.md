<div align="center">

  <h1>🎬 StudioSpace</h1>
  <p><strong>Peer-to-Peer Creative Production & Studio Workspace Marketplace</strong></p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15_App_Router-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
    <a href="https://www.mongodb.com"><img src="https://img.shields.io/badge/MongoDB-Atlas_Cloud-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" /></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel" alt="Vercel" /></a>
  </p>

  <h4>
    <a href="#-core-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-system-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-endpoints">API Routes</a>
  </h4>

</div>

---

## 📌 Project Overview

**StudioSpace** is a modern, high-performance peer-to-peer marketplace engineered for creators, filmmakers, musicians, and podcasters across Dhaka. It connects studio hosts offering state-of-the-art production environments with content creators needing flexible, hourly bookings without tedious paperwork.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **MongoDB Atlas**, StudioSpace ensures near-instant page transitions, zero hydration mismatches, and responsive ergonomics across desktop and mobile devices.

---

## ✨ Core Features

- 🔎 **Dynamic Studio Discovery:** Real-time multi-criteria filtering by category (Cinema & Video, Audio & Podcast, Photo Studio, Green Screen), price tier, and capacity.
- ⚡ **Instant Hourly Booking:** Instant pricing calculator with transparent breakdown, no hidden fees, and zero unprompted redirects.
- 📊 **Dedicated Creator Dashboard:** Manage active studio sessions, inspect booking histories, and cancel reservations with instant UI feedback.
- 🧭 **Fluid Navbar & Glider:** Custom navigation bar equipped with dynamic route-following indicator tabs and mobile drawer.
- 🛡️ **Robust Validation & Hydration Safe:** Client-side error boundaries with React Suspense integration, custom secure auth patterns, and zero-script dark theme styling.
- 🌱 **Database Seeding Engine:** Built-in seed endpoints (`/api/studios/seed`) providing verified creative spaces with high-res galleries and amenities lists.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router), React 19 |
| **Language** | TypeScript (Strict Mode) |
| **Styling & Icons** | Tailwind CSS, Lucide React, DaisyUI |
| **State & Notifications** | React Hot Toast, Native Hooks |
| **Database** | MongoDB Atlas (Native Node Driver / Mongoose) |
| **Deployment** | Vercel / Netlify |

---

## 🏗️ Project Architecture (Monorepo)

```text
studiospace/
├── client/                      # Next.js Frontend Application
│   ├── public/                  # Static assets & brand imagery
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/             # Studio & booking endpoint handlers
│   │   │   ├── studios/         # Browse & [id] detail views
│   │   │   ├── dashboard/       # Creator booking management
│   │   │   ├── how-it-works/    # Marketplace guide
│   │   │   └── about-us/        # Mission & vision
│   │   ├── components/          # Reusable UI (Nav, Cards, Theme)
│   │   └── lib/                 # MongoDB connection & shared helpers
│   ├── package.json
│   └── tailwind.config.ts
├── server/                      # Dedicated Backend / Microservices (Optional)
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md


