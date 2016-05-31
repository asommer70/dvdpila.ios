import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
var store = require('react-native-simple-store');

import Button from './button';
import PilaAPI from '../lib/pila_api';

var api = new PilaAPI();


class Dvd extends Component {
  constructor(props) {
    super(props);
    // this.props = props;

    store.get('settings').then((data) => {
      if (data === null) {
        data = {};
      }
      this.setState({settings: data}, () => {
        api.getDvd(this.state.settings.url, this.props.navigator.dvdId, (dvd) => {
          console.log('dvd:', dvd);
          this.setState({dvd: dvd});
        })
      });
    });

    this.state = {
      settings: {url: ''},
      dvd: {}
    }
  }

  back() {
    this.props.navigator.pop();
  }

  render() {
    var dvd = this.state.dvd;
    return (
      <View style={styles.container}>
        <Button text={'Back'} onPress={this.back.bind(this)} buttonStyle={styles.navButton} textStyle={styles.navText} />

        <View style={styles.dvd}>
          <View style={styles.header}>
            <Image style={styles.poster} source={{uri: dvd.image_url}} />

            <View style={styles.text}>
              <Text style={styles.title}>{dvd.title}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },

  navButton: {
    marginLeft: 5,
    alignSelf: 'flex-start',
  },

  navText: {
    fontSize: 14
  },

  dvd: {
    marginTop: 20,
    padding: 10
  },

  header: {
    // flexDirection: 'row',
    alignSelf: 'center',
  },

  poster: {
    width: 150,
    height: 200
  },

  text: {
    flex: 1,
    marginLeft: 10
  },

  title: {
    marginTop: 20,
    fontSize: 20
  }
});

export default Dvd;
