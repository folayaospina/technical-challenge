import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { createProvider } from '../store/slices/provider/thunks/provider.thunks'

function CreateProvider() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    full_name: '',
    specialty: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await dispatch(createProvider(formData)).unwrap()
      alert('Proveedor creado exitosamente')
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear proveedor')
    }
  }
  console.log("Render CreateProvider with formData: ", formData);
  

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    const fieldMap: { [key: string]: string } = {
        full_name: 'full_name',
        specialty: 'specialty'
    }
    
    const fieldName = fieldMap[name] || name
    
    setFormData({
        ...formData,
        [fieldName]: value
    })
}
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create new provider</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Full Name:</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Specialty:</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            type="submit" 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Create Provider          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProvider