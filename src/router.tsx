import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";                // renders AppShell
import AppIndexRedirect from "./routes/AppIndexRedirect";
import LoginPage from "@/pages/LoginPage";
import NoServerPrompt from "./pages/noServers";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/app", element: <AppIndexRedirect /> },   // ← auto-create + redirect
  { path: "/app/:serverId", element: <App /> },      // ← main app for a server
  { path: "/app/blank", element: <NoServerPrompt /> },
  { path: "*", loader: () => redirect("/app") },
]);
