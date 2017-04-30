'use strict'
import React, { Component } from 'react';
import { Drawer, StyleProvider,Container,Thumbnail, Icon, Switch, Header,ListItem, Left, Right, Body, Title, Button, Content, Form, Item, Input, Label, Fab, View } from 'native-base';
import {
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import MenuDrawer from '../MenuDrawer';

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

  closeDrawer(){
    this.drawer._root.close()
  };

  openDrawer(){
    this.drawer._root.open()
  };

  render() {

    return (
      <StyleProvider style={getTheme(platform)}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<MenuDrawer navigator={this.props.navigator} closeDrawer={this.closeDrawer.bind(this)}/>}
          onClose={() => this.closeDrawer.bind(this)}
          >
          <Container >
            <Header provider>
              <Left>
                <Button transparent onPress={this.openDrawer.bind(this)}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Dashboard</Title>
              </Body>
              <Right>
                <Button transparent onPress={this.navigate.bind(this, "DayPicker")}>
                  <Icon name='ios-create-outline' />
                </Button>
              </Right>
            </Header>
            {/* <Fab
              position="bottomRight"
              style={{ backgroundColor: '#006622' }}
              onPress={this.navigate.bind(this, "SelectCategories")}>
              <Icon name="md-add" />
            </Fab> */}
          </Container>
        </Drawer>
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
