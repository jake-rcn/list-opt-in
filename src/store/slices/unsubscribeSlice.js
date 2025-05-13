import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: "",
    success: false
};

export const unsubscribeUser = createAsyncThunk(
    'user/unsubscribe',
    async (email) => {
        let url = "http://localhost:3000/unsubscribe";
        let options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: email})
        }
        const response = fetch(url, options);
        
        if (response.ok) {
            const data = (await response).json()
            return data;
        } else {
            throw new Error("There was an error unsubscribing the user.")
        }
    }
)

const unsubscribeSlice = createSlice({
    name: 'unsubscribe',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(unsubscribeUser.pending, (state) => {
            state.loading = true;
            state.error = "";
        })
        builder.addCase(unsubscribeUser.rejected, (state, action) => {
            const {error} = action;
            state.loading = false;
            state.error = error.message;
        })
        builder.addCase(unsubscribeUser.fulfilled, state => {
            state.success = true;
            state.loading = false;
            state.error = "";
        })
    }
})

export default unsubscribeSlice;