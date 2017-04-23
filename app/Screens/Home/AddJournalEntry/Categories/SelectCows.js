'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import {Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';



class SelectCows extends Component {
  constructor(props) {
    super(props);
    let animals = this.props.animals
    let relevantCows = []
    for (var i = animals.length - 1; i >= 0; i--) {
      console.log(animals[i].category, this.props.selectedCategory)
      if(animals[i].category === this.props.selectedCategory){
        relevantCows = animals[i].cows
      }
    }    this.state = {
     relevantCows: relevantCows
    };
  }

  getRelevantCows() {
    console.log(this.props);
    let animals = this.props.animals

  }

  render() {
    return (
        <Container >
          <Text>{this.props.animals[0].cows[0]}</Text>
          <Text>{this.props.selectedCategory}</Text>
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

module.exports = SelectCows;
