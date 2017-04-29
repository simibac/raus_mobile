'use strict'
import React, { Component } from 'react';

import {Switch, CheckBox, Separator, Form, List, Item, ListItem, Label,  Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';

import Language from '../../../language.json'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      animals:[],
      numSelected:0
    }
  }
  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    });
  }


    pop(){
      this.props.navigator.pop()
    }
  componentWillMount(){
    // get cows from api
    var cows = this.props.cows
    var newCows = []
    for (var i = cows.length - 1; i >= 0; i--) {
      var newCow = {
        tvd:cows[i].tvd,
        categories:cows[i].categories,
        selected:false,
      }
      newCows.push(newCow)
    }
    this.setState({
      animals:newCows
    })
  }
  countSelectedCows(){
    let counter = 0
    for (var i = this.state.animals.length - 1; i >= 0; i--) {
      var toCompare = this.state.animals[i].selected
      if(toCompare == true){
        counter = counter + 1
      }
    }
    this.setState({
      numSelected:counter
    })
  }
  selectAll(option){
    let newRelevantCows = this.state.relevantCows
    for (var i = newRelevantCows.length - 1; i >= 0; i--) {
      newRelevantCows[i].selected = option
      this.setState({
        relevantCows: newRelevantCows
      })
    }
    this.countSelectedCows.bind(this)(this)
  }


  selectCow(tvd){
    var cows = this.state.animals
    for (var i = cows.length - 1; i >= 0; i--) {
      if(cows[i].tvd === tvd){
        cows[i].selected = !cows[i].selected
      }
    }
    this.setState({
      animals: cows
    })
    this.countSelectedCows.bind(this)(this)
  }

  render() {
    return (
      <Container style={{backgroundColor:'white'}}>
        <Header provider>
          <Left>
            <Button transparent onPress={this.pop.bind(this)}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>Kat. erstellen</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.navigate.bind(this, "CreateCategory")}>
              <Text>Fertig</Text>
            </Button>
          </Right>
        </Header>

        <Form>
          <Item floatingLabel last >
            <Label>Kategorienamen</Label>
            <Input onChangeText={(text) => this.setState({categoryName:text})}/>
          </Item>
        </Form>
        <View style={styles.separator}>
          <Text style={styles.separatorText}>KÜHE: {this.state.numSelected}/{this.state.animals.length}</Text>
        </View>

        <Content>
          {this.state.animals.map(cow =>
            <ListItem icon key={cow.tvd}>
              <Left>
                <CheckBox checked={cow.selected} onPress={this.selectCow.bind(this, cow.tvd)}/>
              </Left>
              <Body>
                <Text>  {cow.tvd}</Text>
              </Body>
            </ListItem>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    marginTop:20,
    backgroundColor: 'rgb(242, 242, 242)',
    height:40,
    paddingLeft:15,
    justifyContent: 'center',
  },
  separatorText: {
    color: 'rgb(140, 140, 140)',
  },
});

module.exports = Categories;
