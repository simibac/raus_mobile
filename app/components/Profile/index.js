'use strict'
import React, { Component } from 'react';

import { Header, Left, Body, Right, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';

class Profile extends Component {

  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Container>
          <Text style={styles.title}>Dashboard</Text>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    fontSize: 20
  }
});

module.exports = Profile;
