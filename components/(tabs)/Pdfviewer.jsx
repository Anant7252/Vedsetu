import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const Pdfviewer = () => {
  const route = useRoute();
  const { name } = route.params;

  const pdfUrl =
    name === 'Ramayan'
      ? 'https://drive.google.com/file/d/13liOpHTvVobPwohLuNpLJFx0ZgIKAgDS/view?usp=sharing'
      : 'https://drive.google.com/file/d/1b7w0dKNmEDNedOh2YJqYMh1xHjVH3UQN/view?usp=sharing';

  return (
    <View style={styles.container}>
      <WebView source={{ uri: pdfUrl }} style={styles.webview} />
    </View>
  );
};

export default Pdfviewer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  webview: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
