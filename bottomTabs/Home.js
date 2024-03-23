import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Home = () => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Home</Text>
      <Text onPress={() => navigate.navigate("Correspondence")}>Go to Correspondence screen</Text>
    </View>
  )
}

export default Home

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