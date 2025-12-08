import React, { useState, useEffect } from 'react'
import { applicationAPI } from '../../services/api'
import { 
  Bell, 
  Star, 
  CheckCircle, 
  Calendar, 
  Mail, 
  X,
  Info,
  AlertCircle
} from 'lucide-react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For now, we'll simulate notifications based on application status
    // In a real app, this would come from a notifications API
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await applicationAPI.getMyApplication()
      const application = response.data
      
      if (application) {
        const notifs = generateNotificationsFromStatus(application)
        setNotifications(notifs)
      }
    } catch (error) {
      console.log('No application found')
    } finally {
      setLoading(false)
    }
  }

  const generateNotificationsFromStatus = (application) => {
    const notifs = []
    const now = new Date()
    
    // Application submitted notification
    notifs.push({
      id: 1,
      type: 'info',
      title: 'Application Submitted',
      message: 'Your application has been successfully submitted and is under review.',
      timestamp: application.createdAt,
      icon: <Info className="w-5 h-5" />,
      read: true
    })

    // Status-based notifications
    if (application.status === 'SHORTLISTED') {
      notifs.push({
        id: 2,
        type: 'success',
        title: 'Congratulations! You are Shortlisted',
        message: 'You have been shortlisted for the next round of interviews. Our HR team will contact you soon.',
        timestamp: application.updatedAt,
        icon: <Star className="w-5 h-5" />,
        read: false
      })
    } else if (application.status === 'UNDER_REVIEW') {
      notifs.push({
        id: 3,
        type: 'info',
        title: 'Application Under Review',
        message: 'Your application is currently being reviewed by our hiring team.',
        timestamp: application.updatedAt,
        icon: <AlertCircle className="w-5 h-5" />,
        read: false
      })
    } else if (application.status === 'ACCEPTED') {
      notifs.push({
        id: 4,
        type: 'success',
        title: 'Congratulations! You are Accepted',
        message: 'You have been selected for the position! Welcome to Veridia!',
        timestamp: application.updatedAt,
        icon: <CheckCircle className="w-5 h-5" />,
        read: false
      })
    } else if (application.status === 'REJECTED') {
      notifs.push({
        id: 5,
        type: 'error',
        title: 'Application Status Update',
        message: 'Your application was not selected at this time. We encourage you to apply for future positions.',
        timestamp: application.updatedAt,
        icon: <X className="w-5 h-5" />,
        read: false
      })
    }

    return notifs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800'
      case 'error': return 'bg-red-50 border-red-200 text-red-800'
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default: return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      default: return 'text-blue-600'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">Notifications</h1>
            <p className="text-secondary-600">
              Stay updated on your application status and important announcements
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="btn-secondary"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Unread Count */}
      {unreadCount > 0 && (
        <div className="card bg-primary-50 border-primary-200 mb-6">
          <div className="p-4 flex items-center">
            <Bell className="w-5 h-5 text-primary-600 mr-3" />
            <span className="text-primary-800 font-medium">
              You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
              <Bell className="w-8 h-8 text-secondary-400" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No notifications</h3>
            <p className="text-secondary-600">
              You don't have any notifications yet. We'll notify you when there are updates to your application.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`card border-l-4 transition-all duration-200 ${
                notification.read ? 'opacity-75' : 'shadow-md'
              } ${getNotificationColor(notification.type)}`}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 ${getIconColor(notification.type)}`}>
                    {notification.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-secondary-900">
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-secondary-500">
                          {formatDate(notification.timestamp)}
                        </span>
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-secondary-400 hover:text-secondary-600"
                            title="Mark as read"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-secondary-700">
                      {notification.message}
                    </p>
                    {!notification.read && (
                      <div className="mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white bg-opacity-60">
                          <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
                          New
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tips Section */}
      <div className="card mt-8 bg-secondary-50">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Notifications
          </h3>
          <p className="text-secondary-600 mb-4">
            You'll also receive email notifications for important updates to your application status. 
            Make sure to check your email regularly, including your spam folder.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-purple-600 mr-2" />
              <span>Shortlisted candidates receive interview details</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
              <span>Accepted candidates receive offer information</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
