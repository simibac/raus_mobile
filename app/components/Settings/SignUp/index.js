'use strict'
import React, { Component } from 'react';

import { Picker, Form, Item, Label, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: undefined,
      selected1: 'key1',
      results: {
        items: []
      },
      username: undefined,
      password: undefined,
      role: "farmer"

    }
  }

  onValueChange (value: string) {
    this.setState({
      selected1 : value
    });
  }

  render() {
    return (
      <Container>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel >
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Picker
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}>
            <Item label="Wallet" value="key0" />
            <Item label="ATM Card" value="key1" />
            <Item label="Credit Card" value="key2" />
            <Item label="Debit Card" value="key3" />
          </Picker>
          <InputGroup>
            <Icon name='ios-home-outline'/>
            <Input placeholder='Farm Id'/>
            <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>
          </InputGroup>
          <InputGroup>
            <Icon name='ios-mail-outline'/>
            <Input placeholder='Email'/>
            <Icon name='ios-checkmark-circle' style={{color:'#00C497'}}/>
          </InputGroup>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    fontSize: 20
  },
  outline:{
    padding:5
  }
});

module.exports = SignUp;
