'use strict'
import React, { Component } from 'react';

import { Icon, FooterTab, Button, Title, Header, Footer, Container, Content, InputGroup, Input } from 'native-base';

import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';



class MenuDrawer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  render() {
    return (
      <Container>
        <Text>Drawer</Text>
      </Container>
    )
  }
}

module.exports = MenuDrawer;
