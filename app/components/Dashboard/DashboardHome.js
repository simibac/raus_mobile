'use strict'
import React, { Component } from 'react';
import { Container,Thumbnail, Icon, Switch, Header,ListItem, Left, Right, Body, Title, Button, Content, Form, Item, Input, Label, Fab, View } from 'native-base';
import {
  StyleSheet,
  Text
} from 'react-native';


class DashboardHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }
  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    });
  }
  pop(){
    this.props.navigator.pop()
  }
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
          <Text style={styles.title}>{this.props.os}</Text>
          <Fab
            position="bottomRight"
            onPress={this.navigate.bind(this, "AddJournal")}>
              <Icon name="md-add" />
            </Fab>
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

module.exports = DashboardHome;
