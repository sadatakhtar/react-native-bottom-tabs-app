import {configureStore} from '@reduxjs/toolkit';
import generalReducer from '../features/general/generalSlice';
import encryptionReducer from '../features/state/encryptionSlice';

export const store = configureStore({
  reducer: {
    generalSlice: generalReducer,
    encryptionSlice: encryptionReducer,
  },
});
