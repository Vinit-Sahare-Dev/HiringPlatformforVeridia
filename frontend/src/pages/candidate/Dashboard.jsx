import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { applicationAPI } from '../../services/api'
import Confetti from '../../components/Confetti'
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Upload,
  User,
  Briefcase,
  ExternalLink,
  MapPin,
  DollarSign,
  Heart,
  Zap,
  Target,
  Award,
  TrendingUp,
  Star,
  Users,
  Bell,
  ArrowRight
} from 'lucide-react'
import '../../styles/Applications.css'

const Dashboard = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  // Trigger confetti when any application is accepted
  useEffect(() => {
    const hasAccepted = applications.some(app => app.status === 'ACCEPTED')
    if (hasAccepted) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [applications])

  const fetchApplications = async () => {
    try {
      const response = await applicationAPI.getMyApplications()
      setApplications(response.data)
    } catch (error) {
      console.error('Error fetching applications:', error)
      // Check for local storage backup
      const localApplication = localStorage.getItem('applicationSubmitted')
      if (localApplication === 'true') {
        const localData = localStorage.getItem('applicationData')
        if (localData) {
          const parsedData = JSON.parse(localData)
          setApplications([{
            ...parsedData,
            status: 'PENDING',
            candidateEmail: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : 'candidate@example.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            resumeUrl: 'Resume uploaded locally'
          }])
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="w-5 h-5" />
      case 'UNDER_REVIEW':
        return <AlertCircle className="w-5 h-5" />
      case 'SHORTLISTED':
        return <Star className="w-5 h-5" />
      case 'ACCEPTED':
        return <CheckCircle className="w-5 h-5" />
      case 'REJECTED':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'UNDER_REVIEW':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'SHORTLISTED':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Confetti trigger={showConfetti} duration={3000} />
      
      {/* Full Width Header */}
      <div className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
        <div className="w-full px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                Welcome to Your Dashboard
              </h1>
              <p className="text-blue-100 text-xl">
                Manage your job applications and track your career journey
              </p>
            </div>
            <div className="flex space-x-6">
              <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">{applications.length}</div>
                <div className="text-base text-blue-100 font-semibold">Applications</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">{applications.filter(app => app.status === 'ACCEPTED').length}</div>
                <div className="text-base text-blue-100 font-semibold">Accepted</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl">
                <div className="text-4xl font-bold text-white mb-2">{applications.filter(app => app.status === 'SHORTLISTED').length}</div>
                <div className="text-base text-blue-100 font-semibold">Shortlisted</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="w-full px-6 py-8">

      {applications.length === 0 ? (
        /* No Application Yet - Enhanced Design */
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8">
          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
                <Briefcase className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Start Your Career Journey
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Ready to take the next step? Join our amazing team and build your future at Veridia.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">1000+</div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">35%</div>
                  <div className="text-sm text-gray-600">Growth Rate</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <Heart className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-800">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/candidate/apply"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Start Application
                </Link>
                <Link
                  to="/careers"
                  className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Browse Positions
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Why Join Veridia?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Quick Process</h3>
                <p className="text-gray-600">Streamlined application process with quick response times.</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Growth Opportunities</h3>
                <p className="text-gray-600">Continuous learning and clear career advancement paths.</p>
              </div>
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Great Culture</h3>
                <p className="text-gray-600">Inclusive environment and work-life balance.</p>
              </div>
            </div>
          </div>

          {/* Simple Features */}
          <div className="w-full bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Career Tools</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Career Path Finder</h4>
                <p className="text-gray-600 text-sm">Discover your ideal career path</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Salary Calculator</h4>
                <p className="text-gray-600 text-sm">Estimate your potential earnings</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Skill Assessment</h4>
                <p className="text-gray-600 text-sm">Test your skills and improve</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Multiple Applications - Full Width Cards View */
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 lg:mb-0">Your Applications</h2>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white Chelsea/30">
                <span classNameedImage text-blue-200">Total: </span>
                <span className="font-bold text-white text-lg">{applications.length} application{applications.length !== 1 ? 's' : ''}</span>
              </div>
              <Link
                to="/                className emotional: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:ching-blue-700 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Browse More Jobs
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border border-white/20 overflow-hidden group hover:bg-white/15 hover:scale-105" 
                   onClick={() => setSelectedApplication(selectedApplication?.id === app.id ? null : app)}>
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${getStatusColor(app.status).replace('text-', 'bg-').replace('-800', '-900')} shadow-lg border border-white/20`}>
                        {getStatusIcon(app.status)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg leading-tight">
                          {app.jobTitle || 'General Application'}
                        </h3>
                        <p className="text-sm text-blue-200 font-medium">
                          {app.firstName} {app.lastName}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(app.status)} shadow-lg bg-white/10`}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1.5">{app.status}</span>
                    </span>
                    {app.jobDepartment && (
                      <span className="text-xs text-blue-200 bg-white/10 px-2 py-1 rounded-full border border-white/20">
                        {app.jobDepartment}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Job Details */}
                  {app.jobLocation && (
                    <div className="flex items-center text-sm text-blue-200">
                      <MapPin className="w-4 h-4 mr-2 text-blue-300" />
                      <span>{app.jobLocation}</span>
                    </div>
                  )}
                  
                  {app.jobType && (
                    <div className="flex items-center text-sm text-blue-200">
                      <Clock className="w-4 h-4 mr-2 text-blue-300" />
                      <span>{app.jobType}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-blue-200">
                    <Calendar className="w-4 h-4 mr-2 text-blue-300" />
                    <span>Applied: {formatDate(app.submittedAt || app.createdAt)}</span>
                  </div>

                  {/* Skills Preview */}
                  {app.skills && (
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-start">
                        <Briefcase className="w-4 h-4 mr-2 mt-0.5 text-blue-300" />
                        <div className="flex flex-wrap gap-1">
                          {app.skills.split(',').slice(0, 2).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-100 rounded text-xs font-medium border border-blue-400/30">
                              {skill.trim()}
                            </span>
                          ))}
                          {app.skills.split(',').length > 2 && (
                            <span className="px-2 py-1 bg-white/10 text-blue-200 rounded text-xs font-medium border border-white/20">
                              +{app.skills.split(',').length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Resume Indicator */}
                  {app.resumeUrl && (
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex items-center text-sm text-green-400 bg-green-500/10 px-3 py-2 rounded-lg border border-green-400/30">
                        <FileText className="w-4 h-4 mr-2" />
                        <span className="font-medium">Resume attached</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Click to view hint */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex items-center justify-center text-xs text-blue-300 group-hover:text-white transition-colors">
                      <span>Click to view details</span>
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed View Modal - Full Screen */}
          {selectedApplication && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-50">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl border border-white/20">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-8 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl`}>
                        {getStatusIcon(selectedApplication.status)}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          {selectedApplication.jobTitle || 'General Application'}
                        </h3>
                        <p className="text-blue-100 text-lg">
                          {selectedApplication.firstName} {selectedApplication.lastName}
                        </p>
                        {selectedApplication.jobDepartment && (
                          <p className="text-blue-200 text-sm mt-1">{selectedApplication.jobDepartment}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedApplication(null)}
                      className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl p-3 transition-all transform hover:scale-110"
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8 max-h-[70vh] overflow-y-auto">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Status */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h4 className="font-bold text-white text-xl mb-4">Application Status</h4>
                        <div className="flex items-center justify-between">
                          <span className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold border ${getStatusColor(selectedApplication.status)} bg-white/10 shadow-lg`}>
                            {getStatusIcon(selectedApplication.status)}
                            <span className="ml-3">{selectedApplication.status}</span>
                          </span>
                          <span className="text-blue-200 text-lg">
                            Updated: {formatDate(selectedApplication.updatedAt)}
                          </span>
                        </div>
                      </div>

                      {/* Personal Info */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h4 className="font-bold text-white text-xl mb-4">Personal Information</h4>
                        <div className="space-y-4 text-lg">
                          <div className="flex justify-between">
                            <span className="text-blue-200">Name:</span>
                            <span className="font-medium text-white">{selectedApplication.firstName} {selectedApplication.lastName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-200">Email:</span>
                            <span className="font-medium text-white">{selectedApplication.email}</span>
                          </div>
                          {selectedApplication.phone && (
                            <div className="flex justify-between">
                              <span className="text-blue-200">Phone:</span>
                              <span className="font-medium text-white">{selectedApplication.phone}</span>
                            </div>
                          )}
                          {selectedApplication.location && (
                            <div className="flex justify-between">
                              <span className="text-blue-200">Location:</span>
                              <span className="font-medium text-white">{selectedApplication.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                        <h4 className="font-bold text-white text-xl mb-4">Job Details</h4>
                        <div className="space-y-4 text-lg">
                          {selectedApplication.jobDepartment && (
                            <div className="flex justify-between">
                              <span className="text-blue-200">Department:</span>
                              <span className="font-medium text-white">{selectedApplication.jobDepartment}</span>
                            </div>
                          )}
                          {selectedApplication.jobLocation && (
                            <div className="flex justify-between">
                              <span className="text-blue-200">Location:</span>
                              <span className="font-medium text-white">{selectedApplication.jobLocation}</span>
                            </div>
                          )}
                          {selectedApplication.jobType && (
                            <div className="flex justify-between">
                              <span className="text-blue-200">Type:</span>
                              <span className="font-medium text-white">{selectedApplication.jobType}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Skills */}
                      {selectedApplication.skills && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h4 className="font-bold text-white text-xl mb-4">Skills</h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedApplication.skills.split(',').map((skill, index) => (
                              <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-white rounded-full text-sm font-bold border border-blue-400/50 shadow-lg">
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Experience */}
                      {selectedApplication.experience && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h4 className="font-bold text-white text-xl mb-4">Experience</h4>
                          <p className="text-white whitespace-pre-wrap leading-relaxed text-lg">{selectedApplication.experience}</p>
                        </div>
                      )}

                      {/* Education */}
                      {selectedApplication.education && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <h4 className="font-bold text-white text-xl mb-4">Education</h4>
                          <p className="text-white whitespace-pre-wrap leading-relaxed text-lg">{selectedApplication.education}</p>
                        </div>
                      )}

                      {/* Links */}
                      <div className="space-y-4">
                        {selectedApplication.portfolioLink && (
                          <a
                            href={selectedApplication.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-2xl text-lg font-bold"
                          >
                            <ExternalLink className="w-5 h-5 mr-3" />
                            View Portfolio
                          </a>
                        )}
                        
                        {selectedApplication.resumeUrl && (
                          <div className="flex items-center justify-center w-full bg-green-500/20 text-green-400 px-6 py-4 rounded-2xl border border-green-400/30 backdrop-blur-md">
                            <FileText className="w-5 h-5 mr-3" />
                            <span className="font-bold text-lg">Resume attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

export default Dashboard
