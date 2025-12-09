import React from 'react'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'
import '../../styles/Applications.css'

const FileUploadForm = ({ resumeFile, coverLetterFile, onResumeChange, onCoverLetterChange, errors }) => {
  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      if (type === 'resume') {
        onResumeChange(file)
      } else {
        onCoverLetterChange(file)
      }
    }
  }

  const removeFile = (type) => {
    if (type === 'resume') {
      onResumeChange(null)
    } else {
      onCoverLetterChange(null)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4 inline mr-2" />
          Resume *
        </label>
        
        {!resumeFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'resume')}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PDF, DOC, DOCX up to 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">{resumeFile.name}</p>
                  <p className="text-sm text-green-700">{formatFileSize(resumeFile.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile('resume')}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {errors?.resume && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.resume}
          </p>
        )}
      </div>

      {/* Cover Letter Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Letter (Optional)
        </label>
        
        {!coverLetterFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
            <div className="text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, 'coverLetter')}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PDF, DOC, DOCX up to 10MB
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">{coverLetterFile.name}</p>
                  <p className="text-sm text-blue-700">{formatFileSize(coverLetterFile.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile('coverLetter')}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        
        {errors?.coverLetter && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.coverLetter}
          </p>
        )}
      </div>

      {/* File Guidelines */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">File Guidelines</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Accepted formats: PDF, DOC, DOCX</li>
          <li>• Maximum file size: 10MB</li>
          <li>• Resume is required for all applications</li>
          <li>• Cover letter is optional but recommended</li>
          <li>• Ensure files are clearly named and organized</li>
        </ul>
      </div>
    </div>
  )
}

export default FileUploadForm
