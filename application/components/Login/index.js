'use strict'
import React, { Component } from 'react';

import { Item, Form, Footer, FooterTab, StyleProvider,Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';

import localStore from '../../utilities/localStore'
import api from '../../utilities/api'
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'2000319',
      password:'qikCloud2017',
      errorMessage:'',
      token:''
    }
  }

  navigate(routeName){
    this.props.navigator.push({
      name: routeName,
    });
  }

  login(){
    if(this.state.email === ''){
      this.setState({errorMessage:'Please enter a valid Email'})
      return
    }
    else if(this.state.password === ''){
      this.setState({errorMessage:'Please enter a Password'})
      return
    }
    else{
      api.login(this.state.email, this.state.password).then((res) => {
        if (typeof res.token != 'undefined'){
          localStore.deleteToken()
          localStore.setToken(res.token)
          this.setState({errorMessage:''})
          this.setState({token:res.token})
          this.navigate("Dashboard")
        }
        else{
          this.setState({errorMessage:res.message})
        }
      })
    }
  }

  componentWillMount(){
    localStore.getToken().then((res)=>{this.setState({token:res})})
  }

  render() {
    return (
      <Container style={{backgroundColor:'white'}}>

        <Header provider>
          <Body>
            <Title>Login</Title>
          </Body>
        </Header>


        <Form>
          <Item>
            <Input placeholder="Email" onChangeText={(emailInput) => this.setState({email:emailInput})}/>
          </Item>
          <Item last>
            <Input placeholder="Password" onChangeText={(password) => this.setState({password:password})}/>
          </Item>
        </Form>

        <Button full style={{marginBottom:15, marginTop:15}} onPress={this.login.bind(this)}>
          <Text style={{color:'white', fontSize:17}}>Login</Text>
        </Button>

        <Button full success onPress={this.navigate.bind(this, "CreateAccount")}>
          <Text style={{color:'white', fontSize:17}}>Create an account</Text>
        </Button>
        <Text>{this.state.errorMessage}</Text>

        {/* <Text>Email {this.state.email}</Text>
        <Text>Password {this.state.password}</Text>
        <Text>Token {this.state.token}</Text> */}

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    backgroundColor: 'rgba(0, 77, 0, 0.6)',
    // alignItems:'center',
    // justifyContent:'center'
  }
});

module.exports = Login;
