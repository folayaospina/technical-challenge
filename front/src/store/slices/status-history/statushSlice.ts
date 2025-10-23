import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface StatusHistoryItem {
    id: string;
    status_id: string;
    patient_id: string;
    changed_at: string;
}

interface StatusHistoryState {
    statusList: StatusHistoryItem[];
    loading: boolean;
    error: string | null;
}

const initialState: StatusHistoryState = {
    statusList: [],
    loading: false,
    error: null,
};
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const fetchStatusHistory = createAsyncThunk(
    'statusHistory/fetchStatusHistory',
    async (patientId: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API_URL}/status-history/${patientId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch status history');
            }
            const data = await response.json();
            console.log("data", data);
            
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);


const statusHistorySlice = createSlice({
    name: 'statusHistory',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setStatusHistory: (state, action: PayloadAction<StatusHistoryItem[]>) => {
            state.statusList = action.payload;
            state.loading = false;
            state.error = null;
        },
        addStatusHistoryItem: (state, action: PayloadAction<StatusHistoryItem>) => {
            state.statusList.unshift(action.payload);
        },
        updateStatusHistoryItem: (state, action: PayloadAction<{ id: string; updates: Partial<StatusHistoryItem> }>) => {
            const index = state.statusList.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.statusList[index] = { ...state.statusList[index], ...action.payload.updates };
            }
        },
        removeStatusHistoryItem: (state, action: PayloadAction<string>) => {
            state.statusList = state.statusList.filter(item => item.id !== action.payload);
        },
        clearStatusHistory: (state) => {
            state.statusList = [];
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setError,
    setStatusHistory,
    addStatusHistoryItem,
    updateStatusHistoryItem,
    removeStatusHistoryItem,
    clearStatusHistory,
} = statusHistorySlice.actions;

export default statusHistorySlice.reducer;