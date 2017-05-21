'use strict'
import React, { Component } from 'react';
import { Radio, Drawer, StyleProvider,Container,Thumbnail, Icon, Switch, Header,ListItem, Left, Right, Body, Title, Button, Content, Form, Item, Input, Label, Fab, View } from 'native-base';
import {
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';

class Language extends Component {
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
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white'}}>

          <Header provider>
            <Left>
              <Button transparent onPress={this.pop.bind(this)}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Dashboard</Title>
            </Body>
            <Right>
              <Text>Übernehmen</Text>
            </Right>
          </Header>

          <Content>
            <ListItem>
              <Left>
                <Text>Deutsch</Text>
              </Left>
              <Right>
                <Radio selected={false} />
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>English</Text>
              </Left>
              <Right>
                <Radio selected={true} />
              </Right>
            </ListItem>
          </Content>

        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    fontSize: 20
  }
});

module.exports = Language;
