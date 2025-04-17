# 💰 Personal Finance Visualizer – Full Stack App

A full-stack web application to manage personal finances, track expenses, visualize spending habits, and set monthly budgets.

---

## 🌐 Live Demo

- **Frontend**: [https://personal-finance-visualizer-frontend-woad.vercel.app](https://personal-finance-visualizer-frontend-woad.vercel.app)
- **Backend API**: [https://personalfinancialanalyzer-backend.onrender.com/api/v1/](https://personalfinancialanalyzer-backend.onrender.com/api/v1/)

---

## ✨ Features

- 💸 Add, edit, delete transactions (amount, date, category, description)
- 📊 Visualize expenses by month and category (bar/pie charts)
- 🗕️ Set monthly budgets and track against actual spending
- 🔍 Dashboard insights: totals, category breakdown, recent activity
- 🧠 Form validation, error handling, and clean UI

---

## 🛠 Tech Stack

### 🔹 Frontend

- React (with Vite)
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com)
- Redux Toolkit
- React Router v7
- Recharts (for charts)
- Deployed on Vercel

### 🔹 Backend

- Node.js + Express.js
- MongoDB + Mongoose
- RESTful API structure
- Centralized error handling
- Hosted on Render

---

## 📁 Folder Structure

### 🌐 Frontend (React – `/client` folder)

`src/` contains:

- `assets/` – Static images and icons  
- `components/` – Reusable UI components  
- `layout.jsx` – Shared layout wrapper (header/sidebar)  
- `lazycomponents.js` – Lazy-loaded route components  
- `pages/` – All routed views:
  - `dashboard/` – Charts & summaries
  - `transaction/` – Add/view/edit transactions
  - `budget/` – Budget setting and tracking
- `redux/` – Redux store & slices  
- `appconstants.js` – Centralized config (e.g., API base URL)  
- `main.tsx` – App entry point

### 🔧 Backend (Express – `/server` folder)

- `routes/` – API routes (transaction, budget, etc.)  
- `controllers/` – Business logic  
- `models/` – Mongoose schemas/models  
- `config/` – DB connection & middleware  
- `utils/` – Error handling and helpers  
- `server.js` – Main app entry

---

## 🚀 Getting Started

### 1. Clone the Repos

```bash
# Clone both repos separately
git clone https://github.com/dhakshayani-0202/PersonalFinanceVisualizerFrontend.git
git clone https://github.com/dhakshayani-0202/PersonalFinancialAnalyzer-Backend.git
```

👤 Author

Dhakshayani
GitHub
LinkedIn