import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBar
} from 'react-native';

import Dvds from './components/dvds';
import Dvd from './components/dvd';
import Settings from './components/settings';

var ROUTES = {
  dvds: Dvds,
  dvd: Dvd,
  settings: Settings
};

class dvdpila_ios extends Component {

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'dvds'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('dvdpila_ios', () => dvdpila_ios);
