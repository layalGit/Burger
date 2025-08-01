import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register } from '../actions/authorizationActions.ts';

type User = {
	email: string;
	name?: string;
};
type initialState = {
	user: User | null;
	isAuthChecked: boolean | null;
};
export const initialState: initialState = {
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
			state.isAuthChecked = action.payload as boolean;
		},
	},
	selectors: {
		getIsAuthChecked: (state) => state.isAuthChecked,
		getUser: (state) => state.user,
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			state.user = action.payload as User;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.user = action.payload as User;
		});
		builder.addCase(logout.fulfilled, (state) => {
			state.user = null;
		});
	},
});
export const { setUser, setIsAuthChecked } = userSlice.actions;
export const { getIsAuthChecked, getUser } = userSlice.selectors;
export default userSlice.reducer;
