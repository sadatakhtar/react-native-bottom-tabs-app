import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Settings</Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },
  titleText: {
    fontSize: 25,
    color: 'blue',
    paddingBottom: 20
  }
})