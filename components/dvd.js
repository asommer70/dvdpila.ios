import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
var store = require('react-native-simple-store');
// var VideoPlayer = require('react-native-videoplayer');
// import VideoPlayer from 'react-native-videoplayer';
// <VideoPlayer style={styles.video} url={'http://localhost:8080/shirt_creation.mp4'} />
import Video from 'react-native-video';

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
        <ScrollView style={[styles.scroll]} automaticallyAdjustContentInsets={true} scrollEventThrottle={200}>

        <Button text={'Back'} onPress={this.back.bind(this)} buttonStyle={styles.navButton} textStyle={styles.navText} />

        <View style={styles.dvd}>
          <View style={styles.header}>
            <Image style={styles.poster} source={{uri: dvd.image_url}} />

            <View style={styles.text}>
              <Text style={styles.title}>{dvd.title}</Text>
            </View>

            <View style={styles.vid}>
              <Video source={{uri: 'http://videos/AFTER_EARTH.mp4'}} // Can be a URL or a local file.
                     rate={1.0}                   // 0 is paused, 1 is normal.
                     volume={1.0}                 // 0 is muted, 1 is normal.
                     controls={true}
                     muted={false}                // Mutes the audio entirely.
                     paused={false}               // Pauses playback entirely.
                     resizeMode="cover"           // Fill the whole screen at aspect ratio.
                     repeat={true}                // Repeat forever.
                     onLoadStart={this.loadStart} // Callback when video starts to load
                     onLoad={this.setDuration}    // Callback when video loads
                     onProgress={this.setTime}    // Callback every ~250ms with currentTime
                     onEnd={this.onEnd}           // Callback when playback finishes
                     onError={this.videoError}    // Callback when video cannot be loaded
                     style={styles.vid} />

            </View>

            <View style={styles.abstract}>
              <Text>{dvd.abstract_txt}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },

  scroll: {
    height: 600
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
  },

  vid: {
    height: 200,
    width: 300,
    marginTop: 20
  },

  video: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },

  abstract: {
    marginTop: 30
  }
});

export default Dvd;
