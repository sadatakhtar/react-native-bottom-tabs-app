import React, {useState, useEffect} from 'react';
import {
  getDeviceBiometricsDetected,
  setDeviceBiometricsDetected,
  getBiometricsConsent,
  setBiometricsConsent,
  getBiometricEncryptionKey,
  setBiometricEncryptionKey,
  setConfiguredEncryptionKey,
  getConfiguredEncryptionKey
} from '../src/features/state/encryptionSlice';
import {useDispatch, useSelector} from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import {CONSENT_GRANTED, ENCRYPTION_DATA, decrypt, retrieveBiometricProtectedValue, retrieveUnprotectedValue} from '../biometrics/biometricStorage';
import {BIOMETRICS_CONSENT_KEY, REFRESH_TOKEN_KEY} from '../network/authentication';
import BiometricsConsent from '../screens/BiometricsConsent';

const Appconfiguration = ({children}) => {
  const [configuredBioCapability, setConfiguredBioCapability] = useState(false);
  const [configureBioConsent, setConfiguredBioConsent] = useState(false);

  const deviceBiometricsDetected = useSelector(getDeviceBiometricsDetected);
  const biometricsConsent = useSelector(getBiometricsConsent);
  const bioEncryptionKey = useSelector(getBiometricEncryptionKey);
  const configuredEncryptionKey = useSelector(getConfiguredEncryptionKey)

  const dispatch = useDispatch();

  console.log(`BBBBBBBBBBBBBBBBBBBBBBBB ${biometricsConsent}`)

  useEffect(() => {
    // NB: if biometric capability is not checked on device
    if (!configuredBioCapability) {
      LocalAuthentication.isEnrolledAsync()
        .then(enrolled => {
          console.log('Got biometrics enrolled status: ', enrolled);
          setDeviceBiometricsDetected(enrolled);
        })
        .catch(err => {
          console.error(`${JSON.stringify(err, null, 2)}`);
          dispatch(setDeviceBiometricsDetected(false));
        })
        .finally(() => {
          setConfiguredBioCapability(true);
        });
    }
  }, []);

  useEffect(() => {
    if (configuredBioCapability && !configureBioConsent) {
      if (deviceBiometricsDetected) {
        retrieveUnprotectedValue(BIOMETRICS_CONSENT_KEY)
          .then(value => {
            console.log(`Got consent status: ${value}`);
            dispatch(setBiometricsConsent(value === null ? undefined : value));
          })
          .catch(err => {
            dispatch(setBiometricsConsent(undefined));
          })
          .finally(() => {
            setConfiguredBioConsent(true);
          });
      } else {
        console.log(`No biometrics capability detected on this device`);
        // NB: set to true as we dont want to see the consent screen.
        setConfiguredBioConsent(true);
      }
    }
  }, [configuredBioCapability, deviceBiometricsDetected]);

  useEffect(() => {
    if(biometricsConsent !== undefined){
      setConfiguredBioConsent(true);
    }
  },[biometricsConsent])

  useEffect(() => {
    if(configureBioConsent && !bioEncryptionKey){
      if(biometricsConsent === CONSENT_GRANTED){
        retrieveBiometricProtectedValue(ENCRYPTION_DATA)
          .then(it => {
            console.log(`Got encryption key status: ${JSON.stringify(it, null, 2)}`)
            if(typeof it === 'string'){
              const biometricKey = JSON.parse(it);
              console.log(`Parsed key: ${JSON.stringify(biometricKey, null, 2)}`);
              dispatch(setBiometricEncryptionKey(biometricKey))
            } else {
              console.log(`Its not a string`)
              dispatch(setBiometricEncryptionKey(undefined))

            }
          })
          .catch(err => {
            console.log(`Failed to setting encryption key: ${JSON.stringify(err, null, 2)}`)
            dispatch(setBiometricEncryptionKey(undefined));
          })
          .finally(() => dispatch(setConfiguredEncryptionKey(true)))
        
      } else {
        console.log(`No consent given for biometrics`)
        dispatch(setConfiguredEncryptionKey(true));
        console.log(`DDDDDDDDDDDDDDDDDDDDDD ${biometricsConsent}`)
      } 
  }
  },[configureBioConsent, biometricsConsent, configuredEncryptionKey])

 useEffect(() => {
  if(configuredEncryptionKey) {
    if(biometricsConsent === CONSENT_GRANTED && !bioEncryptionKey !== undefined){
      const storedToken = {
        refresh: '',
      };
      console.log(`No refresh token stored, requestingfrom secure storage`);
      retrieveUnprotectedValue(REFRESH_TOKEN_KEY)
        .then((value) => decrypt(bioEncryptionKey, value ?? ''))
        .then((token) => {
          storedToken.refresh = token;
          // TODO: dispatch setRefreshToken when created
          console.log(`dispatch setRefreshToken when created`)
        })
        .then(() => console.log(`dispatch setToken when created`))
        .then(() => console.log(`dispatch setConfiguredRefreshToken when created`))
        .catch(err => {
          console.log(`Failed to get and refresh token: ${JSON.stringify(err, null, 2)}`)
          // TODO: dispatch setRefreshToken(undefined) and setConfiguredRefreshToken(true)
        })
    }else {
      console.log(`Not retrieving refresh token from store .`)
      // tODO: dispatch setConfiguredRefreshToken(true)
    }
  }
 },[configuredEncryptionKey, biometricsConsent, bioEncryptionKey])

  return (
    <>
    {!configureBioConsent && biometricsConsent === undefined && <BiometricsConsent />}
    {configureBioConsent && children}
    </>
  )
};

export default Appconfiguration;
