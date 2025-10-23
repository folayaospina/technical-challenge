import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './slices/patient/patientSlice'
import providerReducer from './slices/provider/providerSlice'
import generalSlice from './slices/general/generalSlice'
import statusHistorySlice from './slices/status-history/statushSlice'

export const store = configureStore({
  reducer: {
    statusHistory: statusHistorySlice,
    general: generalSlice,
    patients: patientReducer,
    providers: providerReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch