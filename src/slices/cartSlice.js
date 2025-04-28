import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
	cart: localStorage.getItem('cart')
		? JSON.parse(localStorage.getItem('cart'))
		: [],
	total: localStorage.getItem('total')
		? JSON.parse(localStorage.getItem('total'))
		: 0,
	totalItems: localStorage.getItem('totalItems')
		? JSON.parse(localStorage.getItem('totalItems'))
		: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		setTotalItems(state, action) {
			state.token = action.payload;
		},
		// add to cart
		// remove from cart
		// reset cart
	},
});

export const { setUser } = cartSlice.actions;
export default cartSlice.reducer;
