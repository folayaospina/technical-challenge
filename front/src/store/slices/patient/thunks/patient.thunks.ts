import { createAsyncThunk } from "@reduxjs/toolkit"

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Async thunks
export const fetchPatients = createAsyncThunk(
  'patients/fetchAll',
  async () => {
    const response = await fetch(`${API_URL}/patient`)
    return await response.json()
  }
)

export const fetchPatientStatuses = createAsyncThunk(
  'status-history/fetchAll',
  async (id: string) => {
    const response = await fetch(`${API_URL}/status-history/${id}`)
    return await response.json()
  }
)

export const fetchPatientById = createAsyncThunk(
  'patients/fetchById',
  async (id: string) => {
    const response = await fetch(`${API_URL}/patient/${id}`)
    return await response.json()
  }
)

export const createPatient = createAsyncThunk(
  'patients/create',
  async (patientData: {
    full_name: string
    email: string
    phone: string
    provider_id: string
    status_id: string
  }) => {
    const response = await fetch(`${API_URL}/patient`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    })
    return await response.json()
  }
)

export const updatePatientStatus = createAsyncThunk(
  'patients/updateStatus',
  async ({ id, status_id }: { id: string; status_id: string }) => {
    const response = await fetch(`${API_URL}/patient/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status_id: status_id
       }),
    })
    await fetch(`${API_URL}/status-history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        patient_id: id,
        status_id: status_id,
       }),
    })
    return await response.json()
  }
)