import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './CustomTabBar';
import HomeScreen from './HomeScreen';
import Ai from './Ai';
import Setting from './Setting';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
   <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="GHome" component={HomeScreen} />
      <Tab.Screen name="Ai" component={Ai} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}
