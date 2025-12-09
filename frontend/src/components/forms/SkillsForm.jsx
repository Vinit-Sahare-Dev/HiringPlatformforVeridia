import React, { useState } from 'react'
import { Code, Plus, X } from 'lucide-react'
import '../../styles/Applications.css'

const SkillsForm = ({ skills, onChange, errors }) => {
  const [newSkill, setNewSkill] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Code className="w-4 h-4 inline mr-2" />
          Technical Skills *
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add a skill (e.g., JavaScript, React, Python)"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        
        {skills.length === 0 ? (
          <p className="text-gray-500 text-sm">No skills added yet. Add your technical skills above.</p>
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

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-2">Popular Skills</h4>
        <div className="flex flex-wrap gap-2">
          {['JavaScript', 'React', 'Python', 'Java', 'Node.js', 'TypeScript', 'HTML/CSS', 'SQL', 'MongoDB', 'Docker'].map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => {
                if (!skills.includes(skill)) {
                  onChange([...skills, skill])
                }
              }}
              className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors"
              disabled={skills.includes(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsForm
