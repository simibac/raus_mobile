'use strict'
import React, { Component } from 'react';
import { StyleProvider,Container,Thumbnail, Icon, Switch, Header,ListItem, Left, Right, Body, Title, Button, Content, Form, Item, Input, Label, Fab, View } from 'native-base';
import {
  StyleSheet,
  Text
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';


class Dashboard extends Component {
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
      <Container >
        <Header provider>
            <Left/>
            <Body>
                <Title>Dashboard</Title>
            </Body>
            <Right>
                <Button transparent onPress={this.navigate.bind(this, "Settings")}>
                    <Icon name='settings' />
                </Button>
            </Right>
        </Header>
          <Fab
            position="bottomRight"
            style={{ backgroundColor: '#006622' }}
            onPress={this.navigate.bind(this, "AddJournalEntry")}>
              <Icon name="md-add" />
            </Fab>
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

module.exports = Dashboard;
