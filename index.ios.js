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
  View
} from 'react-native';
//import Entry from './app/components/index.js';
//import Skeleton from './app/components'
import Home from './application/navigator.js'

// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
//   GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;

export default class raus_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "os": "ios"
    }
  }

  render() {
    return (
      //<Skeleton os={this.state.os}></Skeleton>
      <Home></Home>
    );
  }
}

AppRegistry.registerComponent('raus_mobile', () => raus_mobile);
