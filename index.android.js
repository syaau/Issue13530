/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';


const scaleValue = new Animated.Value(1)
const rotateValue = new Animated.Value(0)
const rotateValueDegrees = rotateValue.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
})

export default class NativeAnimTest extends Component {
  componentDidMount() {
    // Crashes:

    Animated.timing(scaleValue, {
      toValue: 1.3,
      duration: 5000,
      useNativeDriver: true,
    }).start()


    // Works:

    // Animated.parallel([
    //   Animated.timing(rotateValue, {
    //     toValue: 0,
    //     duration: 0,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(scaleValue, {
    //     toValue: 1.3,
    //     duration: 5000,
    //     useNativeDriver: true,
    //   }),
    // ]).start()


    // Also works:

    // Animated.timing(rotateValue, {
    //   toValue: 0,
    //   duration: 0,
    //   useNativeDriver: true,
    // }).start()

    // Animated.timing(scaleValue, {
    //   toValue: 1.3,
    //   duration: 5000,
    //   useNativeDriver: true,
    // }).start()
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Text style={styles.welcome}>
          Welcome to React Native!
        </Animated.Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    transform: [
      { scale: scaleValue },
      { rotate: rotateValueDegrees },
    ],
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Issue13530', () => NativeAnimTest);
