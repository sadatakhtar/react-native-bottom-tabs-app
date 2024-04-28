import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

type Props = {}

const BiometricsConsent = (props: Props) => {
  return (
    <View>
      <Text>BiometricsConsent</Text>
      <View>
        <Button title="Consent to biometrics"/>
        <Button title="Decline biometrics"/>
      </View>
    </View>
  )
}

export default BiometricsConsent

const styles = StyleSheet.create({})