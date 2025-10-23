import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProviders } from '../store/slices/provider/thunks/provider.thunks'
import { createPatient } from '../store/slices/patient/thunks/patient.thunks'

function CreatePatient() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { providers } = useAppSelector((state) => state.providers)
  const {statuses} = useAppSelector((state) => state.general)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    provider_id: '',
    status_id: statuses[0]?.id
  })

  useEffect(() => {
    dispatch(fetchProviders())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        console.log("Submit Patient: ", formData);
        
      await dispatch(createPatient(formData)).unwrap()
      alert('Paciente creado exitosamente')
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear paciente')
    }
  }


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Map form field names to formData properties
    const fieldMap: { [key: string]: string } = {
        full_name: 'full_name',
        email: 'email',
        phone: 'phone',
        providerId: 'provider_id'
    }
    
    const fieldName = fieldMap[name] || name
    
    setFormData({
        ...formData,
        [fieldName]: value
    })
}

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Crear Nuevo Paciente</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Nombre completo:</label>
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
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Proveedor Asignado:</label>
          <select
            name="providerId"
            value={formData.provider_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Seleccionar proveedor</option>
            {providers.map(provider => (
              <option key={provider.id} value={provider.id}>
                {provider.full_name} - {provider.specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 mt-8">
          <button 
            type="submit" 
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Crear Paciente
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/')}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePatient