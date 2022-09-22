import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    user: {},
};

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        save(state, action) {
            state.user = action.payload;
        },
        reset(state) {
            state.user = {};
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
