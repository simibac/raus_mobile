'use strict'
import React, { Component } from 'react';

import { Header, Left, Right, Button, Icon, Body, Title, Subtitle, Container, Content, ListItem, Text, CheckBox } from 'native-base';

import {
  StyleSheet,
  Navigator,
  View,
} from 'react-native';

import Settings from '../Settings'
import Dashboard from './Dashboard.js'
import Time from './AddJournalEntry/Time'
import Categories from './AddJournalEntry/Categories'
import SelectCows from './AddJournalEntry/Categories/SelectCows.js'


class Home extends Component {

  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    if(route.name == 'Dashboard') {
      return (
        <Container>
          <Dashboard os={this.props.os}
            navigator={navigator}></Dashboard>
        </Container>)
      }
      if(route.name == 'Settings') {
        return (
          <Container>
            <Settings os={this.props.os}
              navigator={navigator}></Settings>
          </Container>)
        }
      if(route.name == 'AddJournalEntry'){
        return (
          <Container>
            <Time os={this.props.os}
              navigator={navigator}></Time>
          </Container>)
      }
      if(route.name == 'Categories'){
        return (
          <Container>
            <Categories os={this.props.os}
              navigator={navigator}></Categories>
          </Container>)
      }
      if(route.name == 'SelectCows'){
        return (
          <Container>
            <SelectCows os={this.props.os}
              navigator={navigator}></SelectCows>
          </Container>)
      }
    }

  render() {
    return (
        <Container>
          <Navigator
            initialRoute={{name: 'Dashboard'}}
            renderScene={this.renderScene.bind(this)}
          />
        </Container>
    )
  }
}

module.exports = Home;
