import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import SplashScreenView from './components/SplashScreenView';
import Login from './components/Login';
import './global.css';

import { onAuthStateChanged, User, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import StartedPage from 'components/StartedPage';
import RegisterScreen from 'components/RegisterScreen';
import TabLayout from 'components/(tabs)/_layout';
import Pdfviewer from 'components/(tabs)/Pdfviewer';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const handleFinishSplash = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');


      if (userData) {
      const { email, password } = JSON.parse(userData);
      console.log('Auto-login with email:', email, password);

      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
        setInitialRoute('Home');
      } else {
        setInitialRoute('Start');
      }
    } else {
      setInitialRoute('Start');
    }
    } catch (error) {
      console.log('Auto-login failed:', error);
      setInitialRoute('Start');
    } finally {
      setAppReady(true);
    }
  };

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady || initialRoute === null) {
    return <SplashScreenView onFinish={handleFinishSplash} />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartedPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={TabLayout} />
        <Stack.Screen name="Pdfviewer" component={Pdfviewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
