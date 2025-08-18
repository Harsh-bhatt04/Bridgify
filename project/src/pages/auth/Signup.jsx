import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   })
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     // In a real app, you would handle signup logic here
//     console.log('Signup submitted:', formData)
    
//     // Mock successful signup and redirect
//     navigate('/feed')
//   }

//   return (
//     <motion.div 
//       className="w-full max-w-md"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="card p-8">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-bold mb-2">Create your account</h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Join the developer community on Brigify
//           </p>
//         </div>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium mb-1">
//               Full Name
//             </label>
//             <div className="relative">
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="input pl-10"
//                 placeholder="John Doe"
//               />
//               <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>
          
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-1">
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="input pl-10"
//                 placeholder="you@example.com"
//               />
//               <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>
          
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="input pl-10"
//                 placeholder="Min. 8 characters"
//               />
//               <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//             <p className="mt-1 text-xs text-gray-500">
//               Password must be at least 8 characters and include a letter and a number
//             </p>
//           </div>
          
//           <div className="flex items-center">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               required
//               className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
//             />
//             <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
//               I agree to the{' '}
//               <a href="#" className="text-primary-600 hover:text-primary-500">
//                 Terms of Service
//               </a>{' '}
//               and{' '}
//               <a href="#" className="text-primary-600 hover:text-primary-500">
//                 Privacy Policy
//               </a>
//             </label>
//           </div>
          
//           <button
//             type="submit"
//             className="btn btn-primary w-full py-2.5"
//           >
//             Sign up
//           </button>
//         </form>
        
//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
//                 Or continue with
//               </span>
//             </div>
//           </div>
          
//           <button
//             type="button"
//             className="mt-4 btn btn-outline w-full flex items-center justify-center gap-2"
//           >
//             <Github size={18} />
//             <span>GitHub</span>
//           </button>
//         </div>
        
//         <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
//             Log in
//           </Link>
//         </p>
//       </div>
//     </motion.div>
//   )
// }

// export default Signup


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic client-side validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signup successful:', data);
        navigate('/login');
      } else {
        setError(data.error || 'Signup failed. Please try again.');
        console.error('Signup error:', data);
      }
    } catch (err) {
      setError('An error occurred. Please check your network connection.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join the developer community on Brigify
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="input pl-10"
                placeholder="John Doe"
              />
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input pl-10"
                placeholder="you@example.com"
              />
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                className="input pl-10"
                placeholder="Min. 8 characters"
              />
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Password must be at least 8 characters and include a letter and a number
            </p>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary w-full py-2.5"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <Github size={18} />
            <span>GitHub</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
