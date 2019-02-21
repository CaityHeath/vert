import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Form from './components/form.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Form />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
