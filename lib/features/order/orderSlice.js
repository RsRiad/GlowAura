import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchOrders = createAsyncThunk('order/fetchOrders', async ({ getToken }, thunkAPI) => {
    try {
        const token = await getToken()
        const { data } = await axios.get('/api/order', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data.orders
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)
    }
})

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default orderSlice.reducer
