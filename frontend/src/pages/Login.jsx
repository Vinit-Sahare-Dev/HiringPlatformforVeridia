import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Briefcase, Shield, ArrowRight } from 'lucide-react'
import { authAPI } from '../services/api'
import '../styles/Login.css'

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

  const navigate = useNavigate()
  const location = useLocation()

  // show success message after registration redirect
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await authAPI.login(formData)

      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }

      setSuccessMessage('Login successful! Redirecting...')

      setTimeout(() => {
        navigate('/candidate/dashboard')
      }, 1500)
    } catch (err) {
      console.error('Login Error:', err)

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Cannot connect to server. Please ensure backend is running on port 8080.')
      }
    }

    setLoading(false)
  }

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-card">

          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <Briefcase size={30} />
            </div>

            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to continue your journey</p>
          </div>

          {/* Alert Messages */}
          {successMessage && (
            <div className="auth-alert auth-alert-success">
              <Shield size={16} /> {successMessage}
            </div>
          )}

          {error && (
            <div className="auth-alert auth-alert-error">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">

            {/* Email */}
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-form-group">
              <div className="auth-label-row">
                <label className="auth-label">Password</label>
                <Link className="auth-link" to="/forgot-password">Forgot Password?</Link>
              </div>

              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="auth-checkbox"
              />
              Remember me for 30 days
            </label>

            {/* Submit Button */}
            <button className="auth-button" disabled={loading} type="submit">
              {loading ? (
                <>
                  <div className="auth-spinner"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>Are you an admin? <Link className="auth-footer-link" to="/admin/login">Admin Login</Link></p>
            <p>Don't have an account? <Link className="auth-footer-link" to="/register">Create an account</Link></p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
