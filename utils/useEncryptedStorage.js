import {useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';
import Aes from 'react-native-aes-crypto';

const ENCRYPTION_DATA = 'encryptionData';

const useEncryptedStorage = () => {
  useEffect(() => {
    getEncryptionCredentials('Authenticate to encrypt data');
  }, []);

  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptionIv, setEncryptionIv] = useState('');

  const getEncryptionCredentials = async prompt => {
    try {
      let cipherPropString = await SecureStore.getItemAsync(ENCRYPTION_DATA, {
        requireAuthentication: true,
        authenticationPrompt: prompt,
      });

      if (!cipherPropString) {
        const key = await Aes.randomKey(64);
        const derivedKey = await Aes.pbkdf2(
          key,
          new Date().toString(),
          5000,
          256,
          'sha256',
        );
        setEncryptionKey(derivedKey);

        const iv = await Aes.randomKey(16);
        setEncryptionIv(iv);
      }
    } catch (error) {
      console.error(`Failed to get authentication credentials ${error}`);
    }
  };

  const storeProtectedValue = async (name, value, prompt) => {
    try {
      await getEncryptionCredentials(prompt);
      const encrypted = await Aes.encrypt(
        value,
        encryptionKey,
        encryptionIv,
        'aes-256-cbc',
      );
      await SecureStore.setItemAsync(name, encrypted, {
        requireAuthentication: true,
      });
    } catch (error) {
      await clearValue();
      console.error(`Failed to store protected value`);
    }
  };

  const retrieveProtectedValue = async (name, prompt) => {
    try {
      await getEncryptionCredentials(prompt);
      const encrypted = await SecureStore.getItemAsync(name, {
        requireAuthentication: true,
      });
      const decrypted = await Aes.decrypt(
        encrypted,
        encryptionKey,
        encryptionIv,
        'aes-256-cbc',
      );
      return decrypted;
    } catch (error) {
      console.error(`Failed to retieve protected value ${error}`);
    }
  };

  const clearValue = async name => {
    try {
      await SecureStore.deleteItemAsync(name);
    } catch (error) {
      console.error(`Failed to clear value ${error}`);
    }
  };

  const clearEncryptionKey = async () => {
    try {
      setEncryptionKey('');
      setEncryptionIv('');
      await SecureStore.deleteItemAsync(ENCRYPTION_DATA);
    } catch (error) {
      console.error(`Failed to clear encryption key ${error}`);
    }
  };

  const storeUnprotectedValue = async (name, value) => {
    try {
      await SecureStore.setItemAsync(name, value, {
        requireAuthentication: false,
      });
    } catch (error) {
      console.error(`Failed to store unprotected value ${error}`);
    }
  };

  const retrieveUnprotectedValue = async(name) => {
    try {
      const value = await SecureStore.getItemAsync(name, {
        requireAuthentication: true
      });
      return value;
    } catch (error) {
        console.error(`Failed to retrieve unprotected value ${error}`);
        return null;
    }
  }

  const isEncrypted = (value) => {
    return value.startsWith("ENC:");
  }

  return {
    storeProtectedValue,
    storeUnprotectedValue,
    retrieveProtectedValue,
    retrieveUnprotectedValue,
    clearEncryptionKey,
    clearValue,
    isEncrypted,
  }
};

export default useEncryptedStorage;