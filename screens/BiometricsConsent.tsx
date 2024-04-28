import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {setBiometricEncryptionKey, setBiometricsConsent} from '../src/features/state/encryptionSlice';
import { useSelector, useDispatch} from 'react-redux';
import { CONSENT_DECLINED, CONSENT_GRANTED, ENCRYPTION_DATA, generateEncryptionKey, storeBiometricProtectedValue, storeUnprotectedValue } from '../biometrics/biometricStorage';
import { BIOMETRICS_CONSENT_KEY } from '../network/authentication';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const BiometricsConsent = (props: Props) => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();

  const handleConsentBtn = () => {
    // dispatch(setBiometricsConsent(CONSENT_GRANTED))
    // navigation.navigate("Select Customer")
    generateEncryptionKey()
    .then(key => storeBiometricProtectedValue(ENCRYPTION_DATA, key))
    .then(key => {
      dispatch(setBiometricEncryptionKey(key))
    })
    .then(() => storeUnprotectedValue(BIOMETRICS_CONSENT_KEY, CONSENT_GRANTED))
    .then(() => dispatch(setBiometricsConsent(CONSENT_GRANTED)))
    .then(() => navigation.navigate("Select Customer"))
    .catch(err => console.log(`Failed to generate and save encryption key: ${JSON.stringify(err, null, 2)}`))
  };

  const handleDeclineBtn = async() => {
    storeUnprotectedValue(BIOMETRICS_CONSENT_KEY, CONSENT_DECLINED)
    .then(() => setBiometricsConsent(CONSENT_DECLINED))
    navigation.navigate("Login")

  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.titleWrapper}>
        <Text style={styles.textTitle}>Biometrics Consent Screen</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.subheadingWrapper}>
          <Text style={styles.subheading}>Sign in faster with biometrics</Text>
        </View>

        <View>
          <Text style={styles.text}>
            Next time you use this app you can sign in securely using biometrics
            instead of your credentials. Depending on the device you are using
            this could be either fingerprint or face ID.
          </Text>
        </View>
        <View style={styles.btnWrapper}>
          <Button title="Consent to biometrics" onPress={handleConsentBtn} />
        </View>
        <View style={styles.btnWrapper}>
          <Button title="Decline biometrics" onPress={handleDeclineBtn} />
        </View>
      </View>
    </View>
  );
};

export default BiometricsConsent;

const styles = StyleSheet.create({
  container: {},
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'black',
    height: 50,
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    borderWidth: 2,
    borderColor: 'gray',
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
  btnWrapper: {
    marginVertical: 20,
  },
  subheadingWrapper: {
    marginVertical: 20,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
