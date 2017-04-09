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
import Api from './app/utilities/api';
//import Entry from './app/components/index.js';
import Profile from './app/components/Profile'
import Skeleton from './app/components'



export default class raus_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: true
    }
  }

  render() {
    return (
      <Skeleton></Skeleton>
    );
  }
}

AppRegistry.registerComponent('raus_mobile', () => raus_mobile);
