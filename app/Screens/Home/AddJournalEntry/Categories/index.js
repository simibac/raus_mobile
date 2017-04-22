'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Svg, { G, Path } from 'react-native-svg';
import {Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';

const rauscolor = "rgb(38, 38, 38)"
const reincolor = "rgb(0, 102, 34)"

class Categories extends Component {
  state = {

  }

  navigate(routeName){
    this.props.navigator.push({
      name:routeName,
    });
  }
  back(){
    this.props.navigator.pop()
  }

  close(){
    var routes = this.props.navigator.state.routeStack;
    for (var i = routes.length - 1; i >= 0; i--) {
      if(routes[i].name === "Dashboard"){
        var destinationRoute = this.props.navigator.getCurrentRoutes()[i]
        this.props.navigator.popToRoute(destinationRoute);
      }
    }
  }

  next(){

  }

  render() {
    return (
      <Container>

        <Header>
          <Left>
            <Button transparent onPress={this.back.bind(this)}>
              <Icon name={'arrow-back'}/>
            </Button>
          </Left>
          <Body>
            <Title>Kategorien</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.close.bind(this)}>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>

        <Container>



        </Container>


        <Footer>
          <FooterTab>
            <Button full onPress={this.next.bind(this)}>
              <Text>Weiter</Text>
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
    backgroundColor: 'white',
  },
  innerWrapper:{
    backgroundColor: 'rgba(0, 77, 0, 0.6)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 77, 0, 0.6)',
  }
});

module.exports = Categories;
