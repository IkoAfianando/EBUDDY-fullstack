import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {authApi} from '../../apis/userApi'

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, {rejectWithValue}) => {
        try {
            const response = await authApi.login(credentials);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to login');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await authApi.logout();
            return;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to logout');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthState: (state) => {
            state.token = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.token = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {clearAuthState} = authSlice.actions;
export default authSlice.reducer;