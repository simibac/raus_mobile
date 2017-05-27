'use strict'
import React, { Component } from 'react';

import {Spinner,Separator, Left, Right, Body, List, ListItem, Icon, FooterTab, Button, Title, Header, Footer, Container, Content, InputGroup, Input } from 'native-base';

import {
  StyleSheet,
  Navigator,
  Text,
  View,
  StatusBar,
  Platform,

} from 'react-native';

import localStore from '../../utilities/localStore'
import api from '../../utilities/api'

import Navigation from '../../navigator.js'


class MenuDrawer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready:false,
      user:{
        First_name:'',
        Last_name:'',
        Farm_id:''
      },
      token: '',
    }
  }

  componentWillMount(){
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      console.log(res);
      api.getUser(res).then((res2) => {
        console.log(res2);
        if(typeof res2.error === 'undefined'){
          this.setState({user:res2.user})
          this.setState({ready:true})
          console.log(this.state.user);
        }
        else{
          localStore.deleteToken()
          this.props.navigator.resetTo({
            name:"Login"
          })
        }
      })
    });
  }



navigate(routeName){
  this.props.navigator.push({
    name:routeName,
    passProps: {
      user: this.state.user
    }
  })
}

logout(){
  localStore.deleteToken()
  this.props.navigator.resetTo({
    name:"Login"
  })
}

render() {
  while (!this.state.ready){
    return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
  }
  return (
    <Container style={{backgroundColor:'white'}}>
      {Platform.OS === 'ios' && <View style={{height:20}}/>}
      <Text style={styles.loggedIn}>Sie sind eingeloggt als:</Text>
      <Text style={styles.username}>{this.state.user.agateDetails.postAddress.firstName} {this.state.user.agateDetails.postAddress.lastName}</Text>
      <Text style={styles.farmId}>Agate-Nummer: {this.state.user.agateNumber}</Text>

      <List>
        <Separator bordered/>
        <ListItem icon button onPress={this.navigate.bind(this, "Settings")}>
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

        <Separator bordered />
        <ListItem last icon onPress={this.logout.bind(this)}>
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
