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

export const addNewIgloo = createAsyncThunk('igloos/addNewIgloo', async igloo => {
    const res = await fetch(`${API_URL}/api/Igloos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(igloo),
    })

    if(!res.ok){
        const errorMessage = await res.text()
        console.log(errorMessage)
        throw new Error('Failed to add igloo')
    }

    const data = await res.json()

    return data
})

export const editIgloo = createAsyncThunk('igloos/editIgloo', async ({id, igloo}) => {
    console.log('editing igloo with id:', id)
    console.log('igloo data:', igloo)

    const iglooData = {id: id, ...igloo}

    const res = await fetch(`${API_URL}/api/Igloos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(iglooData),
    })

    if(!res.ok){
        const errorMessage = await res.text()
        console.log(errorMessage)
        throw new Error('Failed to edit igloo')
    }

    const text = await res.text()

    return text ? JSON.parse(text) : {}
})

export const deleteIgloo = createAsyncThunk('igloos/deleteIgloo', async id => {
    const res = await fetch(`${API_URL}/api/Igloos/${id}`, {
        method: 'DELETE',
    })

    if(!res.ok){
        const errorMessage = await res.text()
        console.log(errorMessage)
        throw new Error('Failed to delete igloo')
    }

    const text = await res.text()

    return text ? JSON.parse(text) : {}
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

            .addCase(addNewIgloo.pending, state => {
                state.isLoading = true
                state.error = null
                console.log('adding new igloo...')
            })
            .addCase(addNewIgloo.fulfilled, (state, action) => {
                state.isLoading = false
                state.igloos.push(action.payload)
                state.error = null
                console.log('igloo fulfilled')
            })
            .addCase(addNewIgloo.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
                console.log('igloo rejected')
            })

            .addCase(editIgloo.pending, state => {
                state.isLoading = true
                state.error = null
                console.log('editin igloo pending')
            })
            .addCase(editIgloo.fulfilled, (state, action) => {
                state.isLoading = false
                const index = state.igloos.findIndex(igloo => igloo.id === action.payload.id)
                state.igloos[index] = action.payload
                state.error = null
                console.log('igloo fulfilled')
            })
            .addCase(editIgloo.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
                console.log('igloo rejected')
            })

            .addCase(deleteIgloo.pending, state => {
                state.isLoading = true
                state.error = null
                console.log('delete igloo pending')
            })
            .addCase(deleteIgloo.fulfilled, (state, action) => {
                state.isLoading = false
                state.igloos = state.igloos.filter(igloo => igloo.id !== action.payload.id)
                state.error = null
                console.log('igloo fulfilled')
            })
            .addCase(deleteIgloo.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
                console.log('igloo rejected')
            })
    }
})

export default igloosSlice.reducer