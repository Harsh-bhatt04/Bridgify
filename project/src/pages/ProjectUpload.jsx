import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, Link, Github, Image as ImageIcon, X, Plus, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useProjects } from '../context/ProjectContext'

const techStackOptions = [
  "React", "Vue.js", "Angular", "Node.js", "Python", "Django",
  "Flask", "Express", "MongoDB", "PostgreSQL", "MySQL", "Firebase",
  "AWS", "Docker", "Kubernetes", "TensorFlow", "PyTorch", "Next.js",
  "TypeScript", "JavaScript", "Java", "Spring Boot", "Go", "Rust"
]

const categories = [
  "Web Development", "Mobile App", "Machine Learning", "Data Science",
  "DevOps", "Blockchain", "Game Development", "IoT", "Cybersecurity",
  "Cloud Computing", "AR/VR", "UI/UX Design"
]

const ProjectUpload = () => {
  const navigate = useNavigate()
  const { addNotification } = useApp()
  const { addProject } = useProjects()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'In Progress',
    techStack: [],
    githubUrl: '',
    demoUrl: '',
    collaborators: [],
    image: null,
    imagePreview: null
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleTechStackChange = (tech) => {
    setFormData(prev => {
      const updatedTechStack = prev.techStack.includes(tech)
        ? prev.techStack.filter(t => t !== tech)
        : [...prev.techStack, tech]
      return {
        ...prev,
        techStack: updatedTechStack
      }
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        addNotification('Image size should be less than 5MB', 'error')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    if (formData.techStack.length === 0) {
      newErrors.techStack = 'Select at least one technology'
    }
    if (formData.githubUrl && !formData.githubUrl.includes('github.com')) {
      newErrors.githubUrl = 'Enter a valid GitHub URL'
    }
    if (formData.demoUrl && !formData.demoUrl.startsWith('http')) {
      newErrors.demoUrl = 'Enter a valid URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      addNotification('Please fill in all required fields', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // Add project to context
      addProject(formData)
      
      addNotification('Project uploaded successfully!', 'success')
      navigate('/dashboard')
    } catch (error) {
      addNotification('Failed to upload project. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Upload Your Project</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your project with the community and get feedback from other developers.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Image Upload */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Project Image</h2>
          <div className="flex items-center justify-center">
            {formData.imagePreview ? (
              <div className="relative">
                <img
                  src={formData.imagePreview}
                  alt="Project preview"
                  className="w-full max-w-xl rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="w-full max-w-xl aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                <ImageIcon size={48} className="text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload project image
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`input w-full ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter project title"
              />
              {errors.title && (
                <span className="text-sm text-red-500">{errors.title}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className={`input w-full resize-none ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Describe your project..."
              />
              {errors.description && (
                <span className="text-sm text-red-500">{errors.description}</span>
              )}
            </div>

            <div className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg'>
              <label className="block text-sm font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`select w-full bg-transparent ${errors.category ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category} className="bg-transparent  dark:bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-sm text-red-500">{errors.category}</span>
              )}
            </div>

            <div>
              <label className="block bg-transparent text-sm font-medium mb-1">
                Project Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="select w-full bg-transparent text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Open to Collaborate">Open to Collaborate</option>
                <option value="Looking for Feedback">Looking for Feedback</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStackOptions.map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => handleTechStackChange(tech)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.techStack.includes(tech)
                    ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
          {errors.techStack && (
            <span className="text-sm text-red-500 block mt-2">{errors.techStack}</span>
          )}
        </div>

        {/* Links */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Project Links</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                GitHub Repository
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className={`input w-full pl-10 ${errors.githubUrl ? 'border-red-500' : ''}`}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              {errors.githubUrl && (
                <span className="text-sm text-red-500">{errors.githubUrl}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Live Demo URL
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="url"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleInputChange}
                  className={`input w-full pl-10 ${errors.demoUrl ? 'border-red-500' : ''}`}
                  placeholder="https://your-demo-url.com"
                />
              </div>
              {errors.demoUrl && (
                <span className="text-sm text-red-500">{errors.demoUrl}</span>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={20} />
                <span>Upload Project</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectUpload