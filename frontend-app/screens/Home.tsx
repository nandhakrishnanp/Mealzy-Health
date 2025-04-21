import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Login'
import Dashboard from './Dashboard'

const Home = () => {
    const stack = createNativeStackNavigator()
  return (
    <stack.Navigator screenOptions={{
        headerShown: false,
    }}>
      <stack.Screen   name='Login' component={Login} />
        <stack.Screen name='Dashboard' component={Dashboard} />
    </stack.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})