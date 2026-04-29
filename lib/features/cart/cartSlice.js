import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let debounceTimer;

export const uploadCart = createAsyncThunk('cart/uploadCart', async ({getToken, cartItems}, thunkAPI) => {
    try {
        const token = await getToken();
        const response = await axios.post('/api/cart', {
            cart: cartItems
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Cart synced to DB:', response.data);
        return response.data;
    } catch (error) {
        console.error('Cart sync error:', error.response?.data?.message || error.message);
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async ({getToken},thunkAPI) => {
    try {

        const token = await getToken()
        const {data} = await axios.get('/api/cart',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message)

    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        total: 0,
        cartItems: {},
        isCartLoaded: false,
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId } = action.payload
            if (state.cartItems[productId]) {
                state.cartItems[productId]++
            } else {
                state.cartItems[productId] = 1
            }
            state.total += 1
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload
            if (state.cartItems[productId]) {
                state.cartItems[productId]--
                if (state.cartItems[productId] === 0) {
                    delete state.cartItems[productId]
                }
            }
            state.total -= 1
        },
        deleteItemFromCart: (state, action) => {
            const { productId } = action.payload
            state.total -= state.cartItems[productId] ? state.cartItems[productId] : 0
            delete state.cartItems[productId]
        },
        clearCart: (state) => {
            state.cartItems = {}
            state.total = 0
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchCart.fulfilled, (state, action) => {
            const cart = action.payload?.cart;
            if (cart) {
                state.cartItems = cart;
                state.total = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);
            }
            state.isCartLoaded = true;
        })
        .addCase(fetchCart.rejected, (state) => {
            state.isCartLoaded = true;
        })
    }
})

export const { addToCart, removeFromCart, clearCart, deleteItemFromCart } = cartSlice.actions

export default cartSlice.reducer
