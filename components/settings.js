import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert
} from 'react-native';
var store = require('react-native-simple-store');

import Button from './button';

class Settings extends Component {
  back() {
    this.props.navigator.pop();
  }

  constructor(props) {
    super(props);

    store.get('settings').then((data) => {
      if (data === null) {
        data = {};
      }
      this.setState({settings: data});
    });

    this.state = {
      settings: {url: ''},
    }
  }

  badUrl() {
    Alert.alert('Unable to Save Settings', 'Problem with the URL you entered could not get data.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
    )
  }

  saveSettings() {
    // Empty habits get data from server.
    fetch(this.state.settings.url + '/dvds.json')
      .then((response) => response.text())
      .then((responseText) => {
        var dvds = JSON.parse(responseText);
        console.log('dvds:', dvds);

        if (!dvds) {
          this.badUrl();
          return;
        }
        store.save('settings', this.state.settings);


        Alert.alert('Settings Saved', 'DVD Pila! URL: ' + this.state.settings.url,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
        )
      })
      .catch((error) => {
        this.badUrl();
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text={'Back'} onPress={this.back.bind(this)} buttonStyle={styles.navButton} textStyle={styles.navText} />

        <View style={styles.wrapper}>
          <View style={styles.formWrapper}>

            <View style={styles.formElement}>
              <Text style={styles.label}>DVD Pila! URL:</Text>
              <TextInput
                style={styles.input}
                onChangeText={ (text) => this.setState({ settings: {url: text} }) }
                value={this.state.settings.url ? this.state.settings.url : ''} />
            </View>
          </View>

          <Button
            style={styles.saveButton}
            text={'Save'}
            onPress={this.saveSettings.bind(this)}
            textStyle={styles.saveText}
            buttonStyle={styles.saveButton} />
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

  wrapper: {
    marginTop: 40,
    alignSelf: 'center',
    flex: 1,
  },

  formWrapper: {
    backgroundColor: '#ffffff'
  },

  input: {
    padding: 4,
    height: 40,
    borderWidth: 1,
    borderColor: '#424242',
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    alignSelf: 'flex-end',
    color: '#424242'
  },

  saveButton: {
    width: 200
  },

  saveText: {
    fontSize: 16,
  },

  navButton: {
    marginLeft: 5,
    alignSelf: 'flex-start',
  },

  navText: {
    fontSize: 14
  }

});

export default Settings;
