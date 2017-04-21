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
import Skeleton from './app/components'

export default class raus_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "os":"android"
    }
  }

  render() {
    return (
      <Skeleton os={this.state.os}></Skeleton>
    );
  }
}

AppRegistry.registerComponent('raus_mobile', () => raus_mobile);
