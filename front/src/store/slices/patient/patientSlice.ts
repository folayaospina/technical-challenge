import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { initialState, type Patient } from './patient.types'
import { createPatient, fetchPatientById, fetchPatients, updatePatientStatus, fetchPatientStatuses } from './thunks/patient.thunks'

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    clearSelectedPatient: (state) => {
      state.selectedPatient = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all patients
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.loading = false
        state.patients = action.payload
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar pacientes'
      })
      // Fetch patient by ID
      .addCase(fetchPatientById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatientById.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false
        state.selectedPatient = action.payload
      })
      .addCase(fetchPatientById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar paciente'
      })
      // Create patient
      .addCase(createPatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false
        state.patients.push(action.payload)
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al crear paciente'
      })
      // Update patient status
      .addCase(updatePatientStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePatientStatus.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.loading = false
        state.selectedPatient = action.payload
        const index = state.patients.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.patients[index] = action.payload
        }
      })
      .addCase(updatePatientStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al actualizar estado'
      })
  },
})

export const { clearSelectedPatient, clearError } = patientSlice.actions
export default patientSlice.reducer