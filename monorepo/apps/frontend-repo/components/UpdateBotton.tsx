import React from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { updateUserData } from '../store/slices/userSlice';

interface UpdateButtonProps {
    userData: {
        name?: string;
        phoneNumber?: string;
    };
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({ userData }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.user);

    const handleUpdate = async () => {
        dispatch(updateUserData(userData));
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                disabled={loading}
                sx={{ mt: 2 }}
            >
                {loading ? <CircularProgress size={24} /> : 'Update Profile'}
            </Button>

            {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
        </>
    );
};