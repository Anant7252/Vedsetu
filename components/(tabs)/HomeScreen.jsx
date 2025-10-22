import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const navigation=useNavigation()
  return (
    <View className='pt-40 flex-1 items-center flex flex-row flex-wrap justify-between '>
      <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Pdfviewer',{name:'Ramayan'})}
        >
          <Image
            source={require('../../assets/images/ramayan.png')}
            style={{ width: 150, height: 150 }}
          />
          <Text className='text-center mt-10 text-xl font-bold'>Ramayan</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
        onPress={() => navigation.navigate('Pdfviewer',{name:'gita'})}
        >
          <Image
            source={require('../../assets/images/gita.png')}
            style={{ width: 150, height: 150 }}
          />
          <Text className='text-center mt-10 text-xl font-bold'>Gita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
