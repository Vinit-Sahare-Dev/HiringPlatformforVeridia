import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Shield, AlertCircle, Briefcase } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import '../../styles/auth.css'


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  
  const { login, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // Check if user is admin
        if (result.user.role === 'ADMIN') {
          navigate('/admin/dashboard')
        } else {
          setError('Access denied. Admin credentials required.')
        }
      } else {
        setError(result.error)
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-card">
          {/* Header Section */}
          <div className="auth-header">
            <div className="auth-logo">
              <Shield className="w-12 h-12" />
            </div>
            <h1 className="auth-title">Admin Portal</h1>
            <p className="auth-subtitle">Sign in to admin dashboard</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Error Message */}
            {error && (
              <div className="auth-alert auth-alert-error">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter admin email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter admin password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-password-toggle"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
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
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In as Admin'
              )}
            </button>
          </form>

          {/* Quick Links */}
          <div className="auth-quick-links">
            <div className="auth-link-item">
              <Link to="/login" className="auth-link-primary">
                <Briefcase className="w-4 h-4" />
                Candidate Login
              </Link>
            </div>
            <div className="auth-link-item">
              <Link to="/register" className="auth-link-secondary">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
