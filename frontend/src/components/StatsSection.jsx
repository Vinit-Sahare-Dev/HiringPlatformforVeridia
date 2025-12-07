import React from 'react'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Award,
  Star,
  ArrowRight,
  Target,
  Zap,
  Shield,
  Globe,
  Clock,
  CheckCircle
} from 'lucide-react'
import '../styles/StatsSection.css'

const StatsSection = () => {
  const stats = [
    { 
      number: "10K+", 
      label: "Active Candidates", 
      icon: <Users className="stats-icon" />,
      description: "Professionals trust our platform"
    },
    { 
      number: "500+", 
      label: "Partner Companies", 
      icon: <Briefcase className="stats-icon" />,
      description: "Top employers hiring now"
    },
    { 
      number: "95%", 
      label: "Success Rate", 
      icon: <Target className="stats-icon" />,
      description: "Candidates find their match"
    },
    { 
      number: "24h", 
      label: "Avg Response Time", 
      icon: <Clock className="stats-icon" />,
      description: "Quick application processing"
    }
  ]

  return (
    <section className="stats-section">
      {/* Background Pattern */}
      <div className="stats-grid-pattern"></div>
      
      <div className="stats-container">
        <div className="stats-header">
          <div className="stats-badge">
            <TrendingUp className="stats-badge-icon" />
            Platform Statistics
          </div>
          <h2 className="stats-title">
            Numbers That <span className="gradient-text">Speak</span>
          </h2>
          <p className="stats-subtitle">
            Join thousands who've already transformed their careers through our platform
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card">
              <div className="stats-card-gradient"></div>
              
              <div className="stats-card-content">
                <div className="stats-icon-container">
                  {stat.icon}
                </div>
                <div className="stats-number">{stat.number}</div>
                <div className="stats-label">{stat.label}</div>
                <p className="stats-description">{stat.description}</p>
              </div>

              {/* Decorative Elements */}
              <div className="stats-card-dot-1"></div>
              <div className="stats-card-dot-2"></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="stats-trust">
          <div className="stats-trust-badge">
            <Shield className="stats-trust-icon-1" />
            <span className="stats-trust-text">Trusted by leading companies worldwide</span>
            <Globe className="stats-trust-icon-2" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
