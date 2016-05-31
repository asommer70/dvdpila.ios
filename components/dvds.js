import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from './button';

const showHideTransitions = [
  'fade',
  'slide',
];

function getValue<T>(values: Array<T>, index: number): T {
  return values[index % values.length];
}

class Dvds extends Component {
  constructor(props) {
    super(props);
  }

  settings() {
    this.props.navigator.push({name: 'settings'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text={'Settings'} onPress={this.settings.bind(this)} />
        <Text>Dvds...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
});

export default Dvds;
