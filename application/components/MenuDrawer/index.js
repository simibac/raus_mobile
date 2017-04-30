'use strict'
import React, { Component } from 'react';

import {Separator, Left, Right, Body, List, ListItem, Icon, FooterTab, Button, Title, Header, Footer, Container, Content, InputGroup, Input } from 'native-base';

import {
  StyleSheet,
  Navigator,
  Text,
  View,
  StatusBar,
  Platform,

} from 'react-native';



class MenuDrawer extends Component {

  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    });
  }

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  render() {
    return (
      <Container style={{backgroundColor:'white'}}>
        {Platform.OS === 'ios' && <View style={{height:20}}/>}
        <Text style={styles.loggedIn}>Sie sind eingeloggt als:</Text>
        <Text style={styles.username}>Simon Bachmann</Text>
        <Text style={styles.farmId}>#1234287467</Text>

        <List>
          <Separator bordered/>
          <ListItem icon button  onPress={this.navigate.bind(this, "Settings")}>
            <Left>
              <Icon name="ios-person-outline" />
            </Left>
            <Body>
              <Text>Mein Profil</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem last icon onPress={this.navigate.bind(this, "Categories")}>
            <Left>
              <Icon name="ios-pricetags-outline" />
            </Left>
            <Body>
              <Text>Meine Kategorien</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>



          <Separator bordered/>

          <ListItem last icon onPress={this.navigate.bind(this, "Language")}>
            <Left>
              <Icon name="ios-globe-outline" />
            </Left>
            <Body>
              <Text>Sprache</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>

          <Separator bordered/>
          <ListItem last icon button>
            <Text style={styles.logOut}>Logout</Text>
          </ListItem>
        </List>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  username: {
    fontSize:20,
    marginLeft:15,
    marginTop:10,
  },
  loggedIn: {
    fontSize:12,
    marginTop:10,
    marginLeft:15,
  },
  farmId:{
    fontSize:12,
    marginLeft:15,
    marginBottom:10

  },
  logOut:{
    color:'red'
  }
});

module.exports = MenuDrawer;
