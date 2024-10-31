import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {userApi} from '../../apis/userApi';
import type {User} from '../../types/user';

interface UserState {
    data: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (_, {rejectWithValue}) => {
        try {
            const response = await userApi.fetchUserData();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch user data');
        }
    }
);

export const updateUserData = createAsyncThunk(
    'user/updateUserData',
    async (userData: Partial<User>, {rejectWithValue}) => {
        try {
            const response = await userApi.updateUserData(userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update user data');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserData: (state) => {
            state.data = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(updateUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const {clearUserData} = userSlice.actions;
export default userSlice.reducer;