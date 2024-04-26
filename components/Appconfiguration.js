import React, {useState} from 'react';
import {
  getDeviceBiometricsDetected,
  setDeviceBiometricsDetected,
  getDeviceBiometricsConsent,
} from '../src/features/state/encryptionSlice';
import {useSelector} from 'react-redux';

const Appconfiguration = () => {
  const [configuredBioCapability, setConfiguredBioCapability] = useState(false);
  const [configureBioConsent, setConfiguredBioConsent] = useState(false);

  const deviceBiometricsDetected = useSelector(getDeviceBiometricsDetected);
  const biometricsConsent = useSelector(getDeviceBiometricsConsent);


  useEffect(() => {
    // TODO: add logic here
  },[])
};

export default Appconfiguration;
