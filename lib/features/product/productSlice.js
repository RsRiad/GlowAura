import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk('/product/fetchProducts', async (storeId, thunkApi) => {

    try {
        const { data } = await axios.get(`/api/products` + (typeof storeId === 'string' ? `?storeId=${storeId}` : ""))
        return data.products
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data)
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        clearProduct: (state) => {
            state.list = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.list = action.payload
        })
    }
})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer