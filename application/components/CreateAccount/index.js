'use strict'
import React, { Component } from 'react';

import { Picker, Item, Form, Footer, FooterTab, StyleProvider,Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
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

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      farmId:'',
      language:'de',
      errorMessage:'',
      token:''
    }
  }

  navigate(routeName){
    this.props.navigator.push({
      name: routeName,
    });
  }

  back(){
    this.props.navigator.pop()
  }

  signup(){
    if(this.state.firstName === ''){
      this.setState({errorMessage:'Please enter a first name'})
      return
    }
    else if(this.state.lastName === ''){
      this.setState({errorMessage:'Please enter a last name'})
      return
    }
    else if(this.state.email === ''){
      this.setState({errorMessage:'Please enter a valid Email'})
      return
    }
    else if(this.state.farmId === ''){
      this.setState({errorMessage:'Please enter a valid FarmId'})
      return
    }
    else if(this.state.password === ''){
      this.setState({errorMessage:'Please enter a password'})
      return
    }
    else{
      this.setState({errorMessage:''})
      api.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.farmId, this.state.password, this.state.language , this.state.password).then((res) => {
        console.log(res);
        if(typeof res.token != 'undefined'){
          this.setState({errorMessage:'success'})
          localStore.setToken(res.token)
          this.navigate("Dashboard")
        }
        else{
          this.setState({errorMessage:res.error.Detail})
        }
        // if (typeof res.token != 'undefined'){
        //   localStore.setToken(res.token)
        //   this.setState({errorMessage:''})
        //   this.setState({token:res.token})
        //   this.navigate("Dashboard")
        // }
        // else{
        //   this.setState({errorMessage:res.message})
        // }
      })
    }
  }

  componentWillMount(){
    //localStore.getToken().then((res)=>{this.setState({token:res})})
  }

  render() {
    return (
      <Container style={{backgroundColor:'white'}}>

        <Header provider>
          <Left>
          <Button transparent onPress={this.back.bind(this)}>
            <Icon name={'arrow-back'}/>
          </Button>
          </Left>
          <Body>
            <Title>Create Account</Title>
          </Body>
          <Right/>
        </Header>

        <Content>
          <Form>
            <Item>
              <Input placeholder="First Name" onChangeText={(firstName) => this.setState({firstName:firstName})}/>
            </Item>
            <Item >
              <Input placeholder="Last Name" onChangeText={(lastName) => this.setState({lastName:lastName})}/>
            </Item>
            <Item>
              <Icon active name='ios-at-outline' />
              <Input placeholder="Email" onChangeText={(emailInput) => this.setState({email:emailInput})}/>
            </Item>
            <Item>
              <Icon active name='ios-home-outline'/>
              <Input placeholder='Farm ID' onChangeText={(farmId) => this.setState({farmId:farmId})}/>
            </Item>
          <Item >
            <Left style={{flexDirection:'row', alignItems:'center'}}>
              <Icon active name='ios-globe-outline' style={{fontSize:24}}/>
              <Text style={{marginLeft:13, fontSize:17,color:'#000'}}>Language </Text>
            </Left>
            <Right>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.language}
                onValueChange={(value) => {this.setState({language:value})}}>
                <Item label="Deutsch" value="de" />
                <Item label="English" value="en" />
                <Item label="Français" value="fr" />
                <Item label="Italiano" value="it" />
              </Picker>
            </Right>
          </Item>
          <Item >
            <Icon active name='ios-lock-outline' />
            <Input placeholder="Password" onChangeText={(password) => this.setState({password:password})}/>
          </Item>
          <Text>{this.state.errorMessage}</Text>
        </Form>

        </Content>
        <Footer>
          <FooterTab>
            <Button full success onPress={this.signup.bind(this)}>
              <Text style={{color:'white', fontSize:17}}>Create</Text>
            </Button>
          </FooterTab>
        </Footer>
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

module.exports = CreateAccount;
