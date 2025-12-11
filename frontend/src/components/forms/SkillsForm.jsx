import React, { useState } from 'react'
import { Code, Plus, X } from 'lucide-react'
import '../../styles/Applications.css'

const SkillsForm = ({ skills, onChange, errors }) => {
  const [showSkillsModal, setShowSkillsModal] = useState(false)

  const availableSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular',
    'Node.js', 'Express.js', 'Python', 'Java', 'C++',
    'C#', 'PHP', 'Ruby', 'Go', 'Rust',
    'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'Bootstrap',
    'MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Docker',
    'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Git',
    'Jest', 'Cypress', 'Webpack', 'GraphQL', 'REST API'
  ]

  const handleSkillToggle = (skill) => {
    if (skills.includes(skill)) {
      onChange(skills.filter(s => s !== skill))
    } else {
      onChange([...skills, skill])
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove))
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3 flex items-center">
          <Code className="w-5 h-5 mr-2 text-blue-600" />
          Technical Skills *
        </label>
        
        {/* Add Skills Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowSkillsModal(true)}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skills
          </button>
        </div>
        
        {/* Selected Skills Display */}
        {skills.length === 0 ? (
          <p className="text-gray-500 text-sm">No skills added yet. Click "Add Skills" to select your technical skills.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-blue-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        
        {errors?.skills && (
          <p className="mt-2 text-sm text-red-600">{errors.skills}</p>
        )}
      </div>

      {/* Skills Modal */}
      {showSkillsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Select Your Technical Skills
              </h3>
              <button
                type="button"
                onClick={() => setShowSkillsModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Skills Grid */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      skills.includes(skill)
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <div className="text-sm text-gray-600">
                {skills.length} skill{skills.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSkillsModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowSkillsModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SkillsForm
