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
    })

    this.state = {
      settings: {url: ''},
    }
  }

  saveSettings() {
    console.log('this.state:', this.state);
    store.save('settings', this.state.settings);

    // Empty habits get data from server.
    fetch(this.state.settings.url + '/dvds.json')
      .then((response) => response.text())
      .then((responseText) => {
        console.log('responseText:', responseText);

        // var habits = JSON.parse(responseText).habits;
        // store.save('habits', habits);
        //
        // // Tell the Habit component on Main that we have some Habits, and all the other components.
        // this.props.events.emit('got-server-habits', habits);
        // this.props.events.emit('got-habits', habits);
      })
      .catch((error) => {
        AlertIOS.prompt()
        Alert.alert('Unable to Save Settings', 'Problem with the URL you entered could not get data.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
        )
      });

    Alert.alert('Settings Saved', 'DVD Pila! URL: ' + this.state.settings.url,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text={'Back'} onPress={this.back.bind(this)} />

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

          <Button style={styles.saveButton} text={'Save'} onPress={this.saveSettings.bind(this)} textStyle={styles.saveText} />
        </View>
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

  wrapper: {
    marginTop: 40,
    justifyContent: 'center',
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
    margin: 5,
    width: 200,
    alignSelf: 'flex-end',
    color: '#424242'
  },

  saveText: {
    fontSize: 16,
  }

});

export default Settings;
