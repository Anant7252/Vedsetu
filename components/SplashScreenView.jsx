import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';

const SplashScreenView = ({ onFinish }) => {
  const [splash,setsplash]=useState(true);
  useEffect(() => {

    const spalshtimer =setTimeout(()=>{
      setsplash(false);
    },1000)
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(spalshtimer);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={splash ? require('../assets/splash.gif') : require('../assets/images/splash.png')}
        style={styles.image}
        contentFit="cover"
        transition={300} 
      />
    </View>
  );
};

export default SplashScreenView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
  },
});
