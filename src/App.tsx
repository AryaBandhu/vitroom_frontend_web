import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import { AuthProvider } from "@/context/auth-context"
import { ThemeProvider } from "@/context/theme-context"
import { ProtectedRoute } from "@/components/protected-route"
import { LandingPage } from "@/pages/landing"
import { LoginPage } from "@/pages/login"
import { SignupPage } from "@/pages/signup"
import { AboutPage } from "@/pages/about"
import { PrivacyPage } from "@/pages/privacy"
import { TermsPage } from "@/pages/terms"
import { ContactPage } from "@/pages/contact"
import { DashboardPage } from "@/pages/dashboard"
import { GeneratePage } from "@/pages/generate"
import { HistoryPage } from "@/pages/history"
import { HistoryDetailPage } from "@/pages/history-detail"
import { PricingPage } from "@/pages/pricing"
import { PublicPricingPage } from "@/pages/public-pricing"
import { ProfilePage } from "@/pages/profile"

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/plans" element={<PublicPricingPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/generate" element={<GeneratePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/history/:id" element={<HistoryDetailPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster richColors position="top-center" />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
