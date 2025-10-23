import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Status } from "../generalSlice";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'


export const fetchStatuses = createAsyncThunk(
    'general/fetchStatuses',
    async () => {
        const response = await fetch( `${API_URL}/status` );
        if (!response.ok) {
            throw new Error('Failed to fetch statuses');
        }
        const data = await response.json();
        return data as Status[];
    }
);
