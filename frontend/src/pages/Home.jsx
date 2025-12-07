import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Briefcase, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Star,
  TrendingUp,
  Award,
  Target,
  Zap,
  Shield,
  Globe,
  Upload,
  User
} from 'lucide-react'
import '../styles/Home.css'

const Home = () => {
  const { isAuthenticated, isCandidate } = useAuth()

  const features = [
    {
      icon: <Briefcase className="icon-md" />,
      title: "Easy Application Process",
      description: "Submit your application with just a few clicks. Upload your resume and fill out the form seamlessly."
    },
    {
      icon: <Users className="icon-md" />,
      title: "Real-time Status Tracking",
      description: "Track your application status in real-time. Get notified instantly when your status changes."
    },
    {
      icon: <CheckCircle className="icon-md" />,
      title: "Professional Review",
      description: "Your applications are reviewed by our professional HR team with years of experience."
    }
  ]

  const stats = [
    { number: "500+", label: "Applications Processed", icon: <TrendingUp className="icon-sm" /> },
    { number: "50+", label: "Candidates Hired", icon: <Users className="icon-sm" /> },
    { number: "95%", label: "Satisfaction Rate", icon: <Star className="icon-sm" /> },
    { number: "24h", label: "Average Response Time", icon: <Target className="icon-sm" /> }
  ]

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', backgroundColor: '#f9fafb' }}>
      {/* Hero Section */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #dbeafe, #fef3c7)' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>
          Welcome to Veridia
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Transform your career journey with our AI-powered hiring platform
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link 
            to="/register" 
            style={{ 
              padding: '12px 24px', 
              background: 'linear-gradient(to right, #2563eb, #1d4ed8)', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            Get Started
          </Link>
          <Link 
            to="/careers" 
            style={{ 
              padding: '12px 24px', 
              backgroundColor: 'white', 
              color: '#374151', 
              textDecoration: 'none', 
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontWeight: '600'
            }}
          >
            Browse Jobs
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">
              Why Choose <span className="gradient-text">Veridia</span>
            </h2>
            <p className="features-subtitle">
              Experience a modern hiring platform designed for both candidates and employers
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="process-container">
          <div className="process-header">
            <h2 className="process-title">
              How It Works
            </h2>
            <p className="process-subtitle">
              Get started in minutes with our streamlined application process.
            </p>
          </div>
          <div className="process-grid">
            {[
              { step: "1", title: "Register", description: "Create your account in seconds", icon: <User className="icon-md" /> },
              { step: "2", title: "Apply", description: "Fill out the application form", icon: <Briefcase className="icon-md" /> },
              { step: "3", title: "Upload", description: "Attach your resume and documents", icon: <Upload className="icon-md" /> },
              { step: "4", title: "Track", description: "Monitor your application progress", icon: <TrendingUp className="icon-md" /> }
            ].map((item, index) => (
              <div key={index} className="process-step">
                <div className="process-icon-container">
                  {item.icon}
                </div>
                <div className="process-step-number">{item.step}</div>
                <h3 className="process-step-title">{item.title}</h3>
                <p className="process-step-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Start Your Journey?</h2>
          <p className="cta-subtitle">
            Join thousands of professionals who've found their dream jobs through Veridia.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-primary-button">
              Get Started Now
              <ArrowRight className="cta-button-icon" />
            </Link>
            <Link to="/careers" className="cta-secondary-button">
              View Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
