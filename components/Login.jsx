import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please enter email and password');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

       await AsyncStorage.setItem(
      'user',
      JSON.stringify({ email: user.email, password: password, uid: user.uid })
    );

      navigation.replace('Home');
    } catch (err) {
      Alert.alert('Login failed', err.message);
    }
  };

  return (
    <View className="flex-1 p-10 items-center justify-center bg-white">
      <View
        style={{ boxShadow: '0px 0px 50px 35px #fbbf24aa' }}
        className="w-72 h-72 rounded-full border-8 border-[#fbbf24aa] shadow-lg shadow-cyan-500/50 overflow-hidden mb-10 flex flex-col gap-2"
      >
        <Image
          source={require('../assets/icon.png')}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full px-4 py-3 border border-gray-300 rounded-full mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="w-full px-4 py-3 border border-gray-300 rounded-full mb-6"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full p-4 bg-zinc-800 rounded-full items-center"
      >
        <Text className="text-xl text-white font-bold">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        className="w-full p-4 bg-blue-800 mt-5 rounded-full items-center"
      >
        <Text className="text-xl text-white font-bold">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
