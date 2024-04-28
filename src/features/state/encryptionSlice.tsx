import {createSlice, Slice} from '@reduxjs/toolkit';

export interface EncryptionData {
  key: string;
  iv: string;
}

export interface EncryptionState {
  biometrics: EncryptionData | undefined;
}

const initialState = {
  biometrics: undefined,
  deviceBiometricsDetected: undefined,
  biometricsConsent: undefined,
  configuredEncryptionKey: false,
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
    setBiometricsConsent: (state, action) => {
        state.biometricsConsent = action.payload;
    },
    setConfiguredEncryptionKey: (state, action) => {
      state.configuredEncryptionKey = action.payload;
  }

  },
});

export const {
   setBiometricEncryptionKey,
   setDeviceBiometricsDetected,
   setBiometricsConsent,
   setConfiguredEncryptionKey,

} = encryptionSlice.actions;

export const getBiometricEncryptionKey = (state: { encryptionSlice: { biometrics: any; }; }) => state.encryptionSlice.biometrics;
export const getDeviceBiometricsDetected = (state: { encryptionSlice: { deviceBiometricsDetected: any; }; }) => state.encryptionSlice.deviceBiometricsDetected;
export const getBiometricsConsent= (state: { encryptionSlice: { biometricsConsent: any; }; }) => state.encryptionSlice.biometricsConsent;
export const getConfiguredEncryptionKey = (state: { encryptionSlice: { configuredEncryptionKey: any; }; }) => state.encryptionSlice.configuredEncryptionKey;

export default encryptionSlice.reducer;
