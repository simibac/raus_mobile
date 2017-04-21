'use strict'
import React, { Component } from 'react';

import { Icon, FooterTab, Button, Title, Header, Footer, Container, Content, InputGroup, Input } from 'native-base';

import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';

import Dashboard from './Dashboard'
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
      AppComponent = Dashboard
    } else {
      AppComponent = Settings
    }

    return (
      <Container>
        <AppComponent os={this.props.os}/>
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
