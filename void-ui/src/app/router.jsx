import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protected from "./Protected";
import Shell from "../components/layout/Shell";

import Dashboard from "../pages/dashboard/Dashboard";
import Labs from "../pages/labs/Labs";
import Workspace from "../pages/workspace/Workspace";
import Author from "../pages/author/author";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Writeups from "../pages/writeups/Writeups";
import WriteupView from "../pages/writeups/WriteupView";

function AppShell({ children }) {
  return (
    <Protected>
      <Shell>{children}</Shell>
    </Protected>
  );
}


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Protected */}
        <Route path="/app" element={<AppShell><Dashboard /></AppShell>} />
        <Route path="/app/labs" element={<AppShell><Labs /></AppShell>} />
        <Route path="/app/workspace/:id" element={<AppShell><Workspace /></AppShell>} />
        <Route path="/app/author" element={<AppShell><Author /></AppShell>} />

        <Route path="/app/writeups" element={<Writeups />} />
        <Route path="/app/writeups/:id" element={<WriteupView />} />

        {/* Default */}
        <Route path="*" element={<Navigate to="/app" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

