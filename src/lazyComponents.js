import { lazy } from "react";

// Lazy Load Components
export const Transaction = lazy(() => import("./pages/transaction/Transaction"));
export const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
export const BudgetForm = lazy(() => import("./pages/budget/BudgetForm"));
