import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PublicRoute, PrivateRoute, AdminRoute } from './components/ProtectedRoute'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'
import './styles/Professional.css'

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'))
const Careers = lazy(() => import('./pages/Careers'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

// Candidate Pages
const CandidateDashboard = lazy(() => import('./pages/candidate/Dashboard'))
const CandidateProfile = lazy(() => import('./pages/candidate/Profile'))
const ApplicationForm = lazy(() => import('./pages/candidate/ApplicationForm'))
const CandidateNotifications = lazy(() => import('./pages/candidate/Notifications'))

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminLoginDebug = lazy(() => import('./pages/admin/LoginDebug'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminApplications = lazy(() => import('./pages/admin/Applications'))

// Layout Components
const MainLayout = ({ children }) => (
  <div className="app-layout">
    <Navbar />
    <main className="app-main">
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </main>
    <Footer />
  </div>
)

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <div className="auth-container">
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </div>
  </div>
)

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <Navbar />
    <main className="admin-main">
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </main>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Public Routes with Main Layout */}
            <Route path="/" element={
              <MainLayout>
                <Home />
              </MainLayout>
            } />
            
            <Route path="/careers" element={
              <MainLayout>
                <Careers />
              </MainLayout>
            } />

            {/* Authentication Routes with Auth Layout */}
            <Route path="/login" element={
              <AuthLayout>
                <PublicRoute>
                  <Login />
                </PublicRoute>
              </AuthLayout>
            } />
            
            <Route path="/register" element={
              <AuthLayout>
                <PublicRoute>
                  <Register />
                </PublicRoute>
              </AuthLayout>
            } />

            {/* Admin Authentication Routes */}
            <Route path="/admin/login" element={
              <AuthLayout>
                <AdminLogin />
              </AuthLayout>
            } />
            
            <Route path="/admin/login-debug" element={
              <AuthLayout>
                <AdminLoginDebug />
              </AuthLayout>
            } />

            {/* Candidate Routes with Main Layout */}
            <Route path="/candidate/dashboard" element={
              <MainLayout>
                <PrivateRoute>
                  <CandidateDashboard />
                </PrivateRoute>
              </MainLayout>
            } />
            
            <Route path="/candidate/profile" element={
              <MainLayout>
                <PrivateRoute>
                  <CandidateProfile />
                </PrivateRoute>
              </MainLayout>
            } />
            
            <Route path="/candidate/apply" element={
              <MainLayout>
                <PrivateRoute>
                  <ApplicationForm />
                </PrivateRoute>
              </MainLayout>
            } />
            
            <Route path="/candidate/notifications" element={
              <MainLayout>
                <PrivateRoute>
                  <CandidateNotifications />
                </PrivateRoute>
              </MainLayout>
            } />

            {/* Admin Routes with Admin Layout */}
            <Route path="/admin/dashboard" element={
              <AdminLayout>
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              </AdminLayout>
            } />
            
            <Route path="/admin/applications" element={
              <AdminLayout>
                <AdminRoute>
                  <AdminApplications />
                </AdminRoute>
              </AdminLayout>
            } />

            {/* Fallback Route */}
            <Route path="*" element={
              <MainLayout>
                <div className="error-page">
                  <div className="error-container">
                    <h1 className="error-title">404</h1>
                    <h2 className="error-subtitle">Page Not Found</h2>
                    <p className="error-description">
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                    <Navigate to="/" className="error-home-link">
                      Return Home
                    </Navigate>
                  </div>
                </div>
              </MainLayout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
