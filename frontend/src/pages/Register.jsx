import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Shield, ArrowRight, Check } from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    setErrors({})
    
    const result = await register(formData.name, formData.email, formData.password)
    
    if (result.success) {
      // Redirect to login page with success message
      navigate('/login', { 
        state: { message: result.message || 'Registration successful! Please login with your credentials.' }
      })
    } else {
      setErrors({ general: result.error })
    }
    
    setLoading(false)
  }

  const passwordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '' }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    
    const levels = [
      { text: 'Very Weak', color: 'text-red-500' },
      { text: 'Weak', color: 'text-orange-500' },
      { text: 'Fair', color: 'text-yellow-500' },
      { text: 'Good', color: 'text-blue-500' },
      { text: 'Strong', color: 'text-green-500' }
    ]
    
    return { strength, ...levels[strength] }
  }

  const strength = passwordStrength(formData.password)

  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* Background Elements */}
        <div className="auth-background">
          <div className="auth-pattern"></div>
        </div>
        
        {/* Register Card */}
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <Briefcase className="w-8 h-8" />
            </div>
            <h1 className="auth-title">Create Your Account</h1>
            <p className="auth-subtitle">
              Join Veridia and start your career journey with thousands of opportunities
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="auth-alert auth-alert-error">
                {errors.general}
              </div>
            )}

            {/* Name Field */}
            <div className="auth-form-group">
              <label htmlFor="name" className="auth-label">
                Full Name
              </label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`auth-input ${errors.name ? 'auth-input-error' : ''}`}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </div>
              {errors.name && (
                <p className="auth-error-text">{errors.name}</p>
              )}
            </div>

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
                  className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="auth-error-text">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="auth-form-group">
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="auth-password-strength">
                  <div className="auth-password-strength-bar">
                    <div 
                      className={`auth-password-strength-fill ${strength.color.replace('text-', 'bg-')}`}
                      style={{ width: `${(strength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className={`auth-password-strength-text ${strength.color}`}>
                    Password strength: {strength.text}
                  </span>
                </div>
              )}
              
              {/* Password Requirements */}
              <div className="auth-password-requirements">
                <div className={`auth-requirement ${formData.password.length >= 8 ? 'auth-requirement-met' : ''}`}>
                  <Check className="w-3 h-3" />
                  At least 8 characters
                </div>
                <div className={`auth-requirement ${/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? 'auth-requirement-met' : ''}`}>
                  <Check className="w-3 h-3" />
                  Uppercase and lowercase
                </div>
                <div className={`auth-requirement ${/\d/.test(formData.password) ? 'auth-requirement-met' : ''}`}>
                  <Check className="w-3 h-3" />
                  At least one number
                </div>
              </div>
              
              {errors.password && (
                <p className="auth-error-text">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="auth-form-group">
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm Password
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`auth-input ${errors.confirmPassword ? 'auth-input-error' : ''}`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-password-toggle"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="auth-error-text">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="auth-checkbox-group">
              <label className="auth-checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="auth-checkbox"
                />
                <span className="auth-checkbox-text">
                  I agree to the{' '}
                  <Link to="/terms" className="auth-link">
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="auth-link">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="auth-error-text">{errors.terms}</p>
              )}
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line"></div>
            <span className="auth-divider-text">or sign up with</span>
            <div className="auth-divider-line"></div>
          </div>

          {/* Social Signup */}
          <div className="auth-social">
            <button className="auth-social-button">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Footer Links */}
          <div className="auth-footer">
            <div className="auth-footer-section">
              <p className="auth-footer-text">
                Already have an account?{' '}
                <Link to="/login" className="auth-footer-link">
                  Sign in
                </Link>
              </p>
            </div>
            
            <div className="auth-footer-section">
              <p className="auth-footer-text">
                Are you an administrator?{' '}
                <Link to="/admin/login" className="auth-footer-link">
                  Admin Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Side Content */}
        <div className="auth-side-content">
          <div className="auth-side-content-inner">
            <h2 className="auth-side-title">
              Join Thousands of Professionals on Veridia
            </h2>
            <p className="auth-side-description">
              Create your account today and access exclusive job opportunities, career resources, and professional networking.
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
                  <p className="auth-feature-description">Your data is protected with encryption</p>
                </div>
              </div>
              
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="auth-feature-title">Easy Apply</h3>
                  <p className="auth-feature-description">One-click applications to dream jobs</p>
                </div>
              </div>
              
              <div className="auth-feature">
                <div className="auth-feature-icon">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="auth-feature-title">Free Account</h3>
                  <p className="auth-feature-description">No hidden fees or charges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
