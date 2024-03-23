import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Profile</Text>
    </View>
  )
}

export default Profile

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