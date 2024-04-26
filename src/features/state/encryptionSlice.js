import {createSlice, Slice} from '@reduxjs/toolkit';

const initialState = {
  biometrics: undefined,
  deviceBiometricsDetected: undefined,
  biometricsConsent: undefined,
};

export const encryptionSlice = createSlice({
  name: 'encryption',
  initialState,
  reducers: {
    setBiometricEncryptionKey: (state, action) => {
      state.biometrics = action.payload;
    },
    setDeviceBiometricsDetected: (state, action) => {
        state.deviceBiometricsDetected = action.payload;
    },
    setDeviceBiometricsConsent: (state, action) => {
        state.deviceBiometricsConsent = action.payload;
    }

  },
});

export const {
   setBiometricEncryptionKey,
   setDeviceBiometricsDetected,
   setDeviceBiometricsConsent,

} = encryptionSlice.actions;

export const getBiometricEncryptionKey = (state) => state.encryptionSlice.biometrics;
export const getDeviceBiometricsDetected = (state) => state.encryptionSlice.deviceBiometricsDetected;
export const getDeviceBiometricsConsent= (state) => state.encryptionSlice.deviceBiometricsConsent;

export default encryptionSlice.reducer;
