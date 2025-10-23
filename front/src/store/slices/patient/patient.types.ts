
export interface Patient {
  id: string
  full_name: string
  email: string
  phone: string
  status_id: string
  provider_id?: string
}


export interface PatientState {
  patients: Patient[]
  selectedPatient: Patient | null
  loading: boolean
  error: string | null
}

export const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
}
