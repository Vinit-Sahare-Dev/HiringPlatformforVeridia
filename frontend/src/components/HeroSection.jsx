import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ArrowRight, Play, Sparkles, Zap, Shield, Globe } from 'lucide-react'
import '../styles/HeroSection.css'

const HeroSection = () => {
  const { isAuthenticated, isCandidate } = useAuth()

  return (
    <section className="hero-section">
      {/* Animated Background Elements */}
      <div className="hero-background">
        <div className="hero-bg-circle-1"></div>
        <div className="hero-bg-circle-2"></div>
        <div className="hero-bg-circle-3"></div>
      </div>

      {/* Grid Pattern */}
      <div className="hero-grid-pattern"></div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-inner">
          {/* Badge */}
          <div className="hero-badge">
            <Sparkles className="hero-badge-icon" />
            AI-Powered Hiring Platform
            <Sparkles className="hero-badge-icon" />
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            <span className="hero-title-gradient">
              Transform Your
            </span>
            <br />
            <span className="hero-title-normal">Career Journey</span>
          </h1>

          {/* Subheading */}
          <p className="hero-subtitle">
            Join thousands of professionals who found their dream jobs through our intelligent matching system. 
            Apply once, get matched with perfect opportunities.
          </p>

          {/* Stats Bar */}
          <div className="hero-stats">
            {[
              { number: "10K+", label: "Active Candidates", icon: <Globe className="hero-stat-icon" /> },
              { number: "500+", label: "Partner Companies", icon: <Zap className="hero-stat-icon" /> },
              { number: "95%", label: "Success Rate", icon: <Shield className="hero-stat-icon" /> }
            ].map((stat, index) => (
              <div key={index} className="hero-stat">
                <div className="hero-stat-number">
                  {stat.icon}
                  <span>{stat.number}</span>
                </div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="hero-primary-button"
                >
                  Start Your Journey
                  <ArrowRight className="hero-button-icon" />
                </Link>
                <Link
                  to="/careers"
                  className="hero-secondary-button"
                >
                  Browse Opportunities
                  <Play className="hero-button-icon" />
                </Link>
              </>
            ) : isCandidate ? (
              <Link
                to="/candidate/dashboard"
                className="hero-primary-button"
              >
                Go to Dashboard
                <ArrowRight className="hero-button-icon" />
              </Link>
            ) : (
              <Link
                to="/admin/dashboard"
                className="hero-primary-button"
              >
                Go to Dashboard
                <ArrowRight className="hero-button-icon" />
              </Link>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="hero-trust">
            <div className="hero-trust-item">
              <Shield className="hero-trust-icon secure" />
              Secure Platform
            </div>
            <div className="hero-trust-item">
              <Zap className="hero-trust-icon instant" />
              Instant Matches
            </div>
            <div className="hero-trust-item">
              <Globe className="hero-trust-icon global" />
              Global Opportunities
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
