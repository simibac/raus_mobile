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
      if(animals[i].category === this.props.selectedCategory){
        relevantCows = animals[i].cows
      }
    }
    this.state = {
      relevantCows: relevantCows
    };
  }
  back(){
    this.props.navigator.pop()
  }

  switch(tvd){
    let newRelevantCows = this.state.relevantCows
    console.log(newRelevantCows)
    for (var i = newRelevantCows.length - 1; i >= 0; i--) {
      if(newRelevantCows[i].tvd === tvd){
        newRelevantCows[i].selected = !newRelevantCows[i].selected
        this.setState({
          relevantCows:newRelevantCows
        })
      }
    }
  }

  render() {
    console.log(this.state.relevantCows)
    return (
      <Container style={{backgroundColor:'white'}}>
        <Header>
          <Left>
            <Button transparent onPress={this.back.bind(this)}>
              <Icon name={'close'}/>
            </Button>
          </Left>
          <Body>
            <Title>{this.props.selectedCategory}</Title>
            <Subtitle>16/23</Subtitle>
          </Body>
          <Right/>
        </Header>
        <Content>
          {this.state.relevantCows.map(cow =>
            <ListItem icon key={cow.tvd}>
              <Body>
                <Text>{cow.tvd}</Text>
              </Body>
              <Right>
                <Switch value={cow.selected} onChange={this.switch.bind(this, cow.tvd)}/>
              </Right>
            </ListItem>
          )}
          <Text>{this.state.relevantCows[0].selected}</Text>

        </Content>

        <Footer>
          <FooterTab>
            <Button full
              // onPress={this.next.bind(this)}
              >
                <Text>Übernehmen</Text>
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
    }
  });

  module.exports = SelectCows;
