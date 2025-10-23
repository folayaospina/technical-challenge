import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { createProvider, fetchProviders } from './thunks/provider.thunks'

interface Provider {
  id: string
  full_name: string
  specialty: string
}

interface ProviderState {
  providers: Provider[]
  loading: boolean
  error: string | null
}

const initialState: ProviderState = {
  providers: [],
  loading: false,
  error: null,
}

const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all providers
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProviders.fulfilled, (state, action: PayloadAction<Provider[]>) => {
        state.loading = false
        state.providers = action.payload
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al cargar proveedores'
      })
      // Create provider
      .addCase(createProvider.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProvider.fulfilled, (state, action: PayloadAction<Provider>) => {
        state.loading = false
        state.providers.push(action.payload)
      })
      .addCase(createProvider.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error al crear proveedor'
      })
  },
})

export const { clearError } = providerSlice.actions
export default providerSlice.reducer