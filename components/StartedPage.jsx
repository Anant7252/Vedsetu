import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';

const slides = [
  { key: 1, image: require('../assets/images/page1.png') },
  { key: 2, image: require('../assets/images/page2.png') },
  { key: 3, image: require('../assets/images/page3.png') },
  { key: 4, image: require('../assets/images/page4.png') },
];

const StartedPage = () => {
  const navigation=useNavigation();

  const [pagenumber, setpagenumber] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const pagetransfer = () => {
    if (pagenumber < 4) {
      setpagenumber(pagenumber + 1);
    }
    else{
      navigation.navigate('Login');
    }
  };

  if (!loaded) return null;

  return (
    <View className="relative flex-1 items-center p-10">
      {slides.map((item) =>
        item.key === pagenumber ? (
          <MotiView
            key={`page-${item.key}-${pagenumber}`} 
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing' }}
          >
            <View className="w-screen h-screen">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </MotiView>
        ) : null
      )}

      <TouchableOpacity
        onPress={pagetransfer}
        className="absolute bottom-14 w-full flex items-center justify-center rounded-full p-3"
        style={{
          backgroundColor: pagenumber < 4 ? '#374151' : 'green',
        }}
      >
        <Text className="text-3xl font-bold text-white">
          {pagenumber < 4 ? 'Next' : 'Get Started'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartedPage;
