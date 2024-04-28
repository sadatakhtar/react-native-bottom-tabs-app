import React, {useEffect} from 'react';
import { getDeviceBiometricsDetected, getBiometricsConsent } from '../src/features/state/encryptionSlice';
import { CONSENT_GRANTED } from '../biometrics/biometricStorage'; 
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const LaunchPad = (props: Props) => {
    const deviceBioDetected = useSelector(getDeviceBiometricsDetected);
    const biometricsConsent = useSelector(getBiometricsConsent);
    const navigation: any = useNavigation();

    useEffect(() => {
        if(deviceBioDetected && biometricsConsent === CONSENT_GRANTED){
            navigation.navigate("Select Customer");
        } else {
            navigation.navigate("Login")
        }
    },[])
  return <></>;
};

export default LaunchPad;
