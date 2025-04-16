import "./index.css";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./Layout.jsx";
import NotFound from "./components/NotFound";
import store from "./redux/store.jsx";
import {
  Transaction,
  Dashboard,
  BudgetForm
} from "./lazyComponents.js";
import { Toaster } from "./components/ui/toaster";
import Loader from "./components/Loader/Loader.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/transaction" replace />,
      },
      {
        path: "transaction",
        element: (
          <Suspense fallback={<Loader />}>
            <Transaction />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "budgetForm",
        element: (
          <Suspense fallback={<Loader />}>
            <BudgetForm />
          </Suspense>
        ),
      },
    ],
    errorElement: <NotFound />,
  },

]);

// Render App
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
