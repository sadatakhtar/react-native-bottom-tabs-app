import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Correspondence = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Correspondence</Text>
    </View>
  )
}

export default Correspondence

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