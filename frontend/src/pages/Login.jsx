import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, Briefcase } from 'lucide-react'
import { healthAPI } from '../services/api'
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
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="login-logo">
            <Briefcase style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>
          <h2 className="login-title">
            Welcome Back
          </h2>
          <p className="login-subtitle">
            Sign in to your Veridia account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {successMessage && (
            <div className="login-alert login-alert-success">
              {successMessage}
            </div>
          )}
          
          {error && (
            <div className="login-alert login-alert-error">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">
              Email Address
            </label>
            <div className="login-input-wrapper">
              <Mail className="login-input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="login-input"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="login-input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
              >
                {showPassword ? (
                  <EyeOff style={{ width: '20px', height: '20px' }} />
                ) : (
                  <Eye style={{ width: '20px', height: '20px' }} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-button"
          >
            {loading ? (
              <>
                <div className="login-spinner"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Admin Login Link */}
        <div className="login-footer">
          <p className="login-footer-text">
            Are you an administrator?{' '}
            <Link
              to="/admin/login"
              className="login-footer-link"
            >
              Admin Login
            </Link>
          </p>
        </div>

        {/* Register Link */}
        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="login-footer-link"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
