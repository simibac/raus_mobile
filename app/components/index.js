'use strict'
import React, { Component } from 'react';

import { Icon, FooterTab, Button, Title, Header, Footer, Container, Content, InputGroup, Input } from 'native-base';

import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';

import Profile from './Profile'
import Settings from './Settings'

class Skeleton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
    //this.setState({index: 0}) // default screen index
  }

  switchScreen(index) {
    this.setState({index: index})
  }

  render() {
    let AppComponent = null;

    if (this.state.index == 0) {
      AppComponent = Profile
    } else {
      AppComponent = Settings
    }

    return (
      <Container>
        <AppComponent/>
          <Footer >
            <FooterTab>
              <Button onPress={() => this.switchScreen(0)}>
                <Icon name="apps" />
              </Button>
              <Button onPress={() => this.switchScreen(1)}>
                <Icon name="person" />
              </Button>
            </FooterTab>
          </Footer>
      </Container>
    )
  }
}

module.exports = Skeleton;
