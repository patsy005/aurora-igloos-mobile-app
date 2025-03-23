import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL } from "../constants/consts"

const initialState = {
    igloos: [],
    isLoading: false,
    error: null,
}

export const fetchIgloos = createAsyncThunk('igloos/fetchIgloos', async () => {
    const response = await fetch(`${API_URL}/api/Igloos`)

    if(!response.ok){
        throw new Error('Failed to fetch igloos')
    }

    const data = await response.json()
    return data
})

export const igloosSlice = createSlice({
    name: 'igloos',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchIgloos.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchIgloos.fulfilled, (state, action) => {
                state.isLoading = false
                state.igloos = action.payload
                state.error = null
            })
            .addCase(fetchIgloos.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

export default igloosSlice.reducer