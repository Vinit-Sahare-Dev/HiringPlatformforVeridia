import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, Briefcase, Shield, ArrowRight } from 'lucide-react'
import { healthAPI } from '../services/api'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      // Clear the message from location state
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      // Attempt login directly without testing backend first
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        navigate('/candidate/dashboard')
      } else {
        setError(result.error)
      }
    } catch (error) {
      console.error('Login submission error:', error)
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        setError('Cannot connect to server. Please make sure the backend is running on port 8080.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    }
    
    setLoading(false)
  }

  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* Background Elements */}
        <div className="auth-background">
          <div className="auth-pattern"></div>
        </div>
        
        {/* Login Card */}
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <Briefcase className="w-8 h-8" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">
              Sign in to your Veridia account to continue your career journey
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {successMessage && (
              <div className="auth-alert auth-alert-success">
                <Shield className="w-4 h-4" />
                {successMessage}
              </div>
            )}
            
            {error && (
              <div className="auth-alert auth-alert-error">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">
                Email Address
              </label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="auth-form-group">
              <div className="auth-label-row">
                <label htmlFor="password" className="auth-label">
                  Password
                </label>
                <Link to="/forgot-password" className="auth-link">
                  Forgot password?
                </Link>
              </div>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="auth-checkbox-group">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="auth-checkbox"
                />
                <span className="auth-checkbox-text">Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="auth-button"
            >
              {loading ? (
                <>
                  <div className="auth-spinner"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line"></div>
            <span className="auth-divider-text">or continue with</span>
            <div className="auth-divider-line"></div>
          </div>

          {/* Social Login */}
          <div className="auth-social">
            <button className="auth-social-button">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Footer Links */}
          <div className="auth-footer">
            <div className="auth-footer-section">
              <p className="auth-footer-text">
                Are you an administrator?{' '}
                <Link to="/admin/login" className="auth-footer-link">
                  Admin Login
                </Link>
              </p>
            </div>
            
            <div className="auth-footer-section">
              <p className="auth-footer-text">
                Don't have an account?{' '}
                <Link to="/register" className="auth-footer-link">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Side Content */}
        <div className="auth-side-content">
          <div className="auth-side-content-inner">
            <h2 className="auth-side-title">
              Start Your Career Journey with Veridia
            </h2>
            <p className="auth-side-description">
              Join thousands of professionals who have found their dream jobs through our platform.
            </p>
            
            <div className="auth-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="auth-feature-title">500+ Companies</h3>
                  <p className="auth-feature-description">Top companies hiring talent</p>
                </div>
              </div>
              
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="auth-feature-title">Secure Platform</h3>
                  <p className="auth-feature-description">Your data is protected</p>
                </div>
              </div>
              
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="auth-feature-title">Easy Apply</h3>
                  <p className="auth-feature-description">One-click applications</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
