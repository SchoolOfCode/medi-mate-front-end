import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Auth0 from '../LandingPage/Auth0/Auth0';

export default function App() {
  return (
    <View style={styles.container}>
      <Auth0></Auth0>
      <landingPage></landingPage> // for when
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
