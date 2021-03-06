import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { fromRight } from 'react-navigation-transitions';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator  initialRouteName="Signup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
