import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image
} from 'react-native';
var store = require('react-native-simple-store');

import Button from './button';
import PilaAPI from '../lib/pila_api';

var api = new PilaAPI();

class Dvds extends Component {
  constructor(props) {
    super(props);
    // this.props = props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    store.get('settings').then((data) => {
      if (data === null) {
        data = {};
      }
      this.setState({settings: data}, () => {
        api.getDvds(this.state.settings.url, (dvds) => {
          this.setState({dvds: dvds.dvds, dataSource: ds.cloneWithRows(dvds.dvds)});
        })
      });
    });

    this.state = {
      settings: {url: ''},
      dataSource: ds.cloneWithRows([]),
      dvds: []
    }
  }

  settings() {
    this.props.navigator.push({name: 'settings'});
  }

  goToDvd(rowID: number) {
    console.log('rowID:', rowID);
    console.log('DVD id:', this.state.dvds[rowID].id, 'title:', this.state.dvds[rowID].title);
    this.props.navigator.dvdId = this.state.dvds[rowID].id;
    this.props.navigator.push({name: 'dvd'});
  }

  _renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => this.goToDvd(rowID)}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: rowData.image_url}} />

            <View style={styles.title}>
              <Text style={styles.text}>
                {rowData.title}
              </Text>
            </View>

          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text={'Settings'} onPress={this.settings.bind(this)} buttonStyle={styles.settingsButton} textStyle={styles.settingsText} />
        <ListView
          style={styles.dvdList}
          dataSource={this.state.dataSource}
          enableEmptySections={true}
          renderRow={this._renderRow.bind(this)}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator}/>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },

  settingsButton: {
    marginRight: 5,
    alignSelf: 'flex-end',
  },

  settingsText: {
    fontSize: 14
  },

  dvdList: {
    marginTop: 10,
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },

  separator: {
    height: 1,
    backgroundColor: '#DBDEE3',
  },

  thumb: {
    width: 64,
    height: 84,
    marginRight: 10
  },

  title: {
    flex: 1,
    alignSelf: 'center'
  },

  text: {
    fontSize: 18
  },
});

export default Dvds;
