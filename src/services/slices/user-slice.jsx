import { createSlice } from '@reduxjs/toolkit';
import {
	forgotPassword,
	login,
	logout,
	register,
	resetPassword,
} from '@/services/actions/authorizationActions.jsx';

const initialState = {
	user: null,
	isAuthChecked: false,
};
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getIsAuthChecked: (state) => state.isAuthChecked,
		getUser: (state) => state.user,
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(forgotPassword.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			state.user = action.payload;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.user = null;
		});
	},
});
export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getIsAuthChecked, getUser } = userSlice.selectors;
export default userSlice.reducer;
