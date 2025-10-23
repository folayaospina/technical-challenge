import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'


// Async thunks
export const fetchProviders = createAsyncThunk(
  'providers/fetchAll',
  async () => {
    const response = await fetch(`${API_URL}/provider`)
    return await response.json()
  }
)

export const createProvider = createAsyncThunk(
  'providers/create',
  async (providerData: {
    full_name: string
    specialty: string
  }) => {
    const response = await fetch(`${API_URL}/provider`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(providerData),
    })
    return await response.json()
  }
)