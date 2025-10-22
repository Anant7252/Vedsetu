import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        return (
          <AnimatedTab
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={() => {
              const event = navigation.emit({ type: 'tabPress', target: route.key });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
          />
        );
      })}
    </View>
  );
}

function AnimatedTab({ route, isFocused, onPress }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isFocused ? -10 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const icon = getIcon(route.name, isFocused);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.tab,
          isFocused && styles.activeTab,
          { transform: [{ translateY }] },
          route.name === 'Ai' && styles.aiTab,
        ]}
      >
        {icon}
      </Animated.View>
    </TouchableOpacity>
  );
}

const getIcon = (name, focused) => {
  const color = focused ? '#f97316' : 'gray';
  switch (name) {
    case 'GHome':
      return <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />;
    case 'Ai':
      return <FontAwesome5 name="magic" size={24} color={color} />;
    case 'Setting':
      return <Ionicons name="settings" size={24} color={color} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 70,
    marginBottom: 50,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  tab: {
    padding: 10,
    borderRadius: 30,
  },
  activeTab: {

    padding: 12,
  },
  aiTab:{
    transform:[{translateY:-20},{scale:1.2}],
    backgroundColor:'#fbbf24aa',
    borderWidth: 6,
    borderColor: 'white',
    borderRadius: 999,
  }
});
