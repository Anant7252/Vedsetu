import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { auth } from '../../firebase'; 
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Setting</Text>
      <Button title="Logout" onPress={handleLogout} color="#f87171" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Setting;
