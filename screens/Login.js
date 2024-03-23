import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Login</Text>
      <Text onPress={() => navigate.navigate("Main")} style={{marginVertical: 20}}>Goto Main screen</Text>
      <Text onPress={() => navigate.navigate("Select Customer")}>Goto Main Select Customer screen</Text>
    </View>
  )
}

export default Login

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