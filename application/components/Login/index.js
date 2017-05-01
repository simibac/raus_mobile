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
import api from '../../utilities/api'
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      errorMessage:'',
      token:''
    }
  }

  navigate(routeName, selectedCategory){
    this.props.navigator.push({
      name: routeName,
      selectedCategory: selectedCategory
    });
  }

  async setToken(token){
    try{
      await AsyncStorage.setItem("token", token)
    }catch(error){
      console.log(error)
    }
  }

  async getToken(){
    try{
      const token = await AsyncStorage.getItem("token");
      if (token != null){
        console.log(token);
        this.setState({token:token})
      }
      return token
      }catch(error){
        console.log(error)
      }
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
            this.setToken(res.token)
            this.setState({errorMessage:''})
            this.setState({token:res.token})
          }
          else{
            this.setState({errorMessage:res.message})
          }
        })
      }
    }

    componentWillMount(){
      this.getToken()
    }

    render() {
      return (
        <Container>

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

          <Button full success>
            <Text style={{color:'white', fontSize:17}}>Create an account</Text>
          </Button>
          <Text>{this.state.errorMessage}</Text>

          <Text>Email {this.state.email}</Text>
          <Text>Password {this.state.password}</Text>
          <Text>Token {this.state.token}</Text>




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
