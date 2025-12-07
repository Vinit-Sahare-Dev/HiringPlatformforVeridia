import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Briefcase, 
  Menu, 
  X, 
  LogOut, 
  User, 
  FileText,
  Building,
  ChevronDown 
} from 'lucide-react'
import '../../styles/Navbar.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsProfileOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div>
            <Link to="/" className="navbar-logo">
              <div className="navbar-logo-icon">
                <Briefcase className="navbar-icon-md" style={{ color: 'white' }} />
              </div>
              <span className="navbar-logo-text">Veridia</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {isAuthenticated && (
              <>
                <Link
                  to="/careers"
                  className={`navbar-link ${isActive('/careers') ? 'active' : ''}`}
                >
                  Careers
                </Link>
                
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    className={`navbar-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                  >
                    <div className="navbar-link-with-icon">
                      <Building className="navbar-icon-sm" />
                      <span>Admin</span>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/candidate/dashboard"
                    className={`navbar-link ${isActive('/candidate/dashboard') ? 'active' : ''}`}
                  >
                    <div className="navbar-link-with-icon">
                      <FileText className="navbar-icon-sm" />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Desktop User Menu */}
          <div className="navbar-user">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="navbar-user-button"
                >
                  <div className="navbar-user-avatar">
                    <User className="navbar-icon-sm" style={{ color: 'white' }} />
                  </div>
                  <span className="navbar-user-name">{user?.name}</span>
                  <ChevronDown className="navbar-icon-sm" />
                </button>

                {isProfileOpen && (
                  <div className="navbar-dropdown">
                    <div className="navbar-dropdown-header">
                      <p className="navbar-dropdown-name">{user?.name}</p>
                      <p className="navbar-dropdown-email">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="navbar-dropdown-item"
                    >
                      <LogOut className="navbar-icon-sm" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-auth-buttons">
                <Link to="/login" className="navbar-login-button">
                  Login
                </Link>
                <Link to="/register" className="navbar-signup-button">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="navbar-mobile-button">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="navbar-mobile-button"
            >
              {isMenuOpen ? <X className="navbar-icon-md" /> : <Menu className="navbar-icon-md" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-nav">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/careers"
                    className={`navbar-mobile-link ${isActive('/careers') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Careers
                  </Link>
                   
                  {isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      className={`navbar-mobile-link ${isActive('/admin/dashboard') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/candidate/dashboard"
                      className={`navbar-mobile-link ${isActive('/candidate/dashboard') ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <div className="navbar-mobile-user">
                    <div className="navbar-mobile-user-info">
                      <p className="navbar-mobile-user-name">{user?.name}</p>
                      <p className="navbar-mobile-user-email">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="navbar-mobile-logout"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="navbar-mobile-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="navbar-mobile-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
