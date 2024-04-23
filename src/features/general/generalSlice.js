import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 100,
};

export const generalSlice = createSlice({
    name: "general",
    initialState,
    reducers : {
        setValue: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const {
    setValue,
} = generalSlice.actions;

export const getValue = (state) => state.generalSlice.value;

export default generalSlice.reducer;