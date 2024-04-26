import {SecureStorOptions} from 'expo-secure-store/src/SecureStore';
import {WHEN_UNLOCKED, WHEN_UNLOCKED_THIS_DEVICE_ONLY} from 'expo-secure-store';
import * as SecureStore from 'expo-secure-store';
import Aes from 'react-native-aes-crypto';

export const ENCRYPTION_DATA = 'encryptionData';
export const CONSENT_GRANTED = 'granted';
export const CONSENT_DECLINED = 'declined';

const nonBiometricSettings = {
  requireAuthentication: false,
  authenticationPrompt: undefined,
  keyChainAccessible: WHEN_UNLOCKED,
};

const biometricSettings = {
  requireAuthentication: true,
  authenticationPrompt: undefined,
  keyChainAccessible: WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

export const retrieveUnprotectedValue = async name => {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(name, nonBiometricSettings)
      .then(it => resolve(it))
      .catch(err => {
        console.log(`Failed to retrieve unprotected value: ${name}: ${err}`);
        reject(err);
      });
  });
};

export const storeUnprotectedValue = (name, value) => {
  const data = typeof value === 'string' ? value : JSON.stringify(value);

  return new Promise((resolve, reject) => {
    SecureStore.setItemAsync(name, data, nonBiometricSettings)
      .then(it => resolve(value))
      .catch(err => {
        console.log(
          `Failed to store unprotected value: ${name}: ${JSON.stringify(
            err,
            null,
            2,
          )}`,
        );
        reject(err);
      });
  });
};

export const retrieveBiometricProtectedValue = async name => {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(name, biometricSettings)
      .then(it => resolve(it))
      .catch(err => {
        console.log(
          `Failed to retrieve protected value: ${name}: ${JSON.stringify(
            err,
            null,
            2,
          )}`,
        );
        reject(err);
      });
  });
};

export const storeBiometricProtectedValue = (name, value) => {
  const data = typeof value === 'string' ? value : JSON.stringify(value);

  return new Promise((resolve, reject) => {
    SecureStore.setItemAsync(name, data, biometricSettings)
      .then(it => resolve(value))
      .catch(err => {
        console.log(
          `Failed to store protected value: ${name}: ${JSON.stringify(
            err,
            null,
            2,
          )}`,
        );
        reject(err);
      });
  });
};

export const decrypt = (encryptionData, encrypted) => {
  return new Promise((resolve, reject) => {
    Aes.decrypt(encrypted, encryptionData.key, encryptionData.iv, 'aes-256-cbc')
      .then(it => resolve(it))
      .catch(err => reject(err));
  });
};

export const encrypt = (encryptionData, decrypted) => {
  return new Promise((resolve, reject) => {
    Aes.encrypt(decrypted, encryptionData.key, encryptionData.iv, 'aes-256-cbc')
      .then(it => resolve(it))
      .catch(err => reject(err));
  });
};

export const clearStoredValue = name => {
  return new Promise((resolve, reject) => {
    SecureStore.deleteItemAsync(name, {})
      .then(() => resolve())
      .catch(err => reject(err));
  });
};

export const generateEncryptionKey = () => {
  const encryptionData = {
    key: '',
    iv: '',
  };

  return new Promise((resolve, reject) => {
    Aes.randomKey(64)
      .then(it => encryptionData.key)
      .then(key => Aes.pbkdf2(key, new Date().toString(), 5000, 256, 'sha256'))
      .then(key => (encryptionData.key = key))
      .then(_ => Aes.randomKey(16))
      .then(iv => {
        encryptionData.iv = iv;
        resolve(encryptionData);
      })
      .catch(err => reject(err));
  });
};
