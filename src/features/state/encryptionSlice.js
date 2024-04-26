import {createSlice, Slice} from '@reduxjs/toolkit';

const initialState = {
  biometrics: undefined,
};

export const encryptionSlice = createSlice({
  name: 'encryption',
  initialState,
  reducers: {
    setBiometricEncryptionKey: (state, action) => {
      state.biometrics = action.payload;
    },
  },
});

export const {
   setBiometricEncryptionKey,

} = encryptionSlice.actions;

export const getBiometricEncryptionKey = (state) => state.encryptionSlice.biometrics;
export default encryptionSlice.reducer;
