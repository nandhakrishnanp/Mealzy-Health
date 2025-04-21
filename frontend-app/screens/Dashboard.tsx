import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dash from './dashboard/Dash';
import Meal from './dashboard/Meal';
import Scan from './dashboard/Scan';
import Wellness from './dashboard/Wellness';
import Profile from './dashboard/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'date-fns';

const Dashboard = ({navigation , route}:any) => {
  const tab = createBottomTabNavigator();


  return (
    <tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {},
      }}>
      <tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://www.v0.app/api/image/bxs-dashboard-icon.png?id=eyJmbiI6ImdldEljb25IZXJvSW1hZ2UiLCJhcmdzIjp7Imljb25TZXRTbHVnIjoiYnhzIiwiaWNvblNsdWciOiJkYXNoYm9hcmQifX0',
              }}
              style={{
                width: 30,
                height: 30,
              }}
            />
          ),
        }}
        name="Dashboard"
        component={Dash}
      />
      <tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdkA-pOR1l5lRdCAtAAA2XSt2qg-WxQcg5A&s',
              }}
              style={{
                width: 30,
                height: 30,
              }}
            />
          ),
        }}
        name="Meal"
        component={Meal}
      />
      <tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpHqAGPfWEjOhAVmRCvY-t0oP1hFuRoklbxQ&s',
              }}
              style={{
                width: 30,
                height: 30,
              }}
            />
          ),
        }}
        name="Scan"
        component={Scan}
      />
      <tab.Screen options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (  
        <Image 
        source={{uri:"https://cdn2.iconfinder.com/data/icons/spa-solid-icons-1/48/41-512.png"}}
        style={{
            width: 30,
            height: 30,
        }}
         />
    ),
      }}  name="Wellness" component={Wellness} />
      <tab.Screen options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => (  
        <Image 
        source={{uri:"https://static-00.iconduck.com/assets.00/user-icon-254x256-okqahdkq.png"}}
        style={{
            width: 30,
            height: 30,
        }}
         />
    ),
      }}  name="Profile" component={Profile} />
    </tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
