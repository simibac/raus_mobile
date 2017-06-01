'use strict'
import React, { Component } from 'react';

import {CheckBox, Text, Spinner, ListItem, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  View,
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import localStore from '../../utilities/localStore'
import api from '../../utilities/api.js'
import Language from '../../utilities/language.json'

function getName(name, tvd){
  if(name != ""){
    return name
  }
  else{
    return tvd
  }
}

class AddAnimalToCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: []
    }
  }
  componentWillMount(){
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      api.getCows(res).then((res) => {
        var cows = []
        for(var i = res.cows.length - 1; i >= 0; i--){
          //if(!res.cows[i].categories.includes(this.props.selectedCategory)){
            var cow = res.cows[i]
            cow.selected = false
            cows.push(cow)
          //}
        }
        this.setState({cows:cows})
        this.setState({ready:true})
      });
    })
  }

  navigate(routeName, selectedCategory){
    this.props.navigator.push({
      name:routeName
    });
  }

  pop(){
    this.props.navigator.pop()
  }

  selectCow(tvd){
    var cows = this.state.cows
    for (var i = cows.length - 1; i >= 0; i--) {
      if(cows[i].tvd === tvd){
        cows[i].selected = !cows[i].selected
      }
    }
    this.setState({
      cows: cows
    })
  }

  createString(categories){
    var string = ''
    if(typeof categories != 'undefined'){
      for(var i = 0; i < categories.length; i++){
        string = string.concat(categories[i].category)
        if(string.length > 20){
          string = string.concat("...")
          break
        }
        else if(i != categories.length-1){
          string = string.concat(", ")
        }
      }
    }
    else{
      string = 'keine'
    }
    return string
  }

  finish(){
    var selectedTvds = []
    for(var i = 0; i < this.state.cows.length; i++){
      if(this.state.cows[i].selected)
        selectedTvds.push(this.state.cows[i].tvd)
    }
    localStore.getToken().then((res)=>{
      api.updateCategory(res, selectedTvds, this.props.selectedCategory).then((res2) => {
        console.log(res2);
        this.props.rerender()
        var routes = this.props.navigator.state.routeStack;
        for (var i = routes.length - 1; i >= 0; i--) {
          if(routes[i].name === "Categories"){
            var destinationRoute = this.props.navigator.getCurrentRoutes()[i]
            this.props.navigator.popToRoute(destinationRoute);
          }
        }
      });
    })
  }

  render() {
    console.log(this.state.cows);
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    console.log(this.props);
    return (

      <Container style={{backgroundColor:'white'}}>
        <Header provider>
          <Left>
            <Button transparent onPress={this.pop.bind(this)}>
              <Icon name='close'/>
            </Button>
          </Left>
          <Body>
            <Title>{this.props.selectedCategory}</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.finish.bind(this)}>
              <Text>Anwenden</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          {this.state.cows.map(cow =>
            <ListItem key={cow.tvd}>
              <CheckBox checked={cow.selected} onPress={this.selectCow.bind(this, cow.tvd)} />
              <Body>
                <Text>{getName(cow.name, cow.tvd)}</Text>
                <Text note>Kategorien: {this.createString.bind(this)(cow.categories)}</Text>
              </Body>
            </ListItem>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    backgroundColor: 'white',
  }
});

module.exports = AddAnimalToCategory;
