import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.mainText}>Coronavirus Dashboard Application</Text>
        <Text style={styles.subText}>This app gathers data from rapidAPI.com.</Text>
        <Text style={styles.subText}>All links are provided in the github repository</Text>
      </View>

      <View style={styles.tabBarInfoContainer}>
      <a href="https://github.com/seansisson/covid-dash">Link to Github</a>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  mainText: {
    textAlign: "center",
    backgroundColor: '#fafafa',
    fontSize: 30,
    padding: '1em',
  },
  subText: {
    textAlign: "center",
    padding: '1em',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
