import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './bottomTabs/Home';
import Profile from './bottomTabs/Profile';
import Settings from './bottomTabs/Settings';
import Correspondence from './stack/Correspondence';
import Login from './screens/Login';
import SelectCustomer from './screens/SelectCustomer';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import BiometricsConsent from './screens/BiometricsConsent';
import Appconfiguration from './components/Appconfiguration';
import LaunchPad from './screens/LaunchPad';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name='Login' component={Login}/> */}
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Correspondence" component={Correspondence} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={StackNavigator} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Appconfiguration>
            <RootNavigator />
          </Appconfiguration>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Biometrics Consent">
      <Stack.Screen name="LaunchPad" component={LaunchPad} />
      <Stack.Screen
        name="Biometrics Consent"
        component={BiometricsConsent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Select Customer" component={SelectCustomer} />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  return <TabNavigator />;
};
