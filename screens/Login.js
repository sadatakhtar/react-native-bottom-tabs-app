import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
//const crypto = require('crypto');
//import {Crypto} from 'expo-crypto';


const Login = () => {
  const [isBioSupported, setIsBioSupported] = useState(false);
  const navigate = useNavigation();

  // const sampleKey = crypto.randomBytes(32).toString('base64');
  // const sampleIv = crypto.randomBytes(16).toString('base64');

  // console.log('key:', sampleKey)
  // console.log('Iv: ', sampleIv)
  // Check if hardware supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBioSupported(compatible);
    })();
  });

  const handleBioAuth = async() => {
    try {
      const {success} = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with your fingerprint',
      });
      if(success){
        Alert.alert('Authentication successful');
      } else {
        Alert.alert('Athentication failed');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Biometric authentication error');
    }
  }
  // // NB: incase there is no biometric record saved on device
  // const handleBiometricAuth1 = async () => {
  //   const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
  //   if (!savedBiometrics)
  //     return Alert.alert(
  //       'Biometric record not found',
  //       'Please verify your identity with your password',
  //       'OK',
  //       () => fallBackToDefaultAuth(),
  //     );
  // };

  
  // const handleBiometricAuth2 = async () => {  
  //   const biometricAuth = await LocalAuthentication.authenticateAsync({
  //         promptMessage: 'Login with Biometrics',
  //         disableDeviceFallback: true,
  //       });
  //   console.log('-------------->>>', biometricAuth);
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
      <Text
        onPress={() => navigate.navigate('Main')}
        style={{marginVertical: 20}}>
        Goto Main screen
      </Text>
      <Text onPress={() => navigate.navigate('Select Customer')}>
        Goto Main Select Customer screen
      </Text>

      <View
        style={{
          padding: 10,
          borderWidth: 2,
          borderColor: 'red',
          marginVertical: 20,
        }}>
        <Text style={{fontSize: 20}}>
          {isBioSupported
            ? 'Your device is compatible with Biometrics'
            : 'Face or Fingerprint scanner is unavailable on this device'}
        </Text>
      </View>

      <View>
        <Button title='Authenticate' onPress={handleBioAuth}/>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  titleText: {
    fontSize: 25,
    color: 'blue',
    paddingBottom: 20,
  },
});
