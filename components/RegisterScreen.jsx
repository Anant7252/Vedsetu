import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please enter email and password');
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    }
  };

  return (
    <View className="flex-1 p-10 items-center justify-center bg-white">
      <View
        style={{
          boxShadow:'0px 0px 50px 35px #fbbf24aa',
        }}
        className="w-72 h-72 rounded-full border-8 border-[#fbbf24aa] shadow-lg shadow-cyan-500/50 overflow-hidden mb-10"
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
        onPress={handleRegister}
        className="w-full p-4 bg-zinc-800 rounded-full items-center"
      >
        <Text className="text-xl text-white font-bold">Register</Text>
      </TouchableOpacity>
    </View>
  );
}
