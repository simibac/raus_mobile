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
import Home from './application/navigator.js'

const _XHR = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest

XMLHttpRequest = _XHR


export default class raus_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "os":"android"
    }
  }

  render() {
    return (
      <Home></Home>
    );
  }
}

AppRegistry.registerComponent('raus_mobile', () => raus_mobile);
