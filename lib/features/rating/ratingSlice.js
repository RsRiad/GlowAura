import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchRatings = createAsyncThunk('rating/fetchRatings', async ({ getToken }, thunkAPI) => {
    try {
        const token = await getToken()
        const { data } = await axios.get('/api/rating', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.ratings
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
    }
})

export const saveRating = createAsyncThunk('rating/saveRating', async ({ getToken, ratingData }, thunkAPI) => {
    try {
        const token = await getToken()
        const { data } = await axios.post('/api/rating', ratingData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.rating
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.error || error.message)
    }
})

const ratingSlice = createSlice({
    name: 'rating',
    initialState: {
        ratings: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRatings.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchRatings.fulfilled, (state, action) => {
                state.loading = false
                state.ratings = action.payload
            })
            .addCase(fetchRatings.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(saveRating.fulfilled, (state, action) => {
                state.ratings.push(action.payload)
            })
    }
})

export default ratingSlice.reducer