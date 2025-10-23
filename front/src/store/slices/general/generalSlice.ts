import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchStatuses } from './thunks/general.thunks';

export interface Status {
    id: string;
    name: string;
    parent_id: string | null;
    order: number;
}

interface GeneralState {
    statuses: Status[];
    loading: boolean;
    error: string | null;
}

const initialState: GeneralState = {
    statuses: [],
    loading: false,
    error: null,
};


const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setStatuses: (state, action: PayloadAction<Status[]>) => {
            state.statuses = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatuses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStatuses.fulfilled, (state, action) => {
                state.loading = false;
                state.statuses = action.payload;
            })
            .addCase(fetchStatuses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch statuses';
            });
    },
});

export const { clearError, setStatuses } = generalSlice.actions;
export default generalSlice.reducer;