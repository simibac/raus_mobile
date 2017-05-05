'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import {CheckBox, StyleProvider, Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';

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
      relevantCows: relevantCows,
      numSelectedCows: 0,
      numTotalCows: relevantCows.length
    };
  }
  back(){
    this.props.navigator.pop()
  }

  switch(tvd){
    let newRelevantCows = this.state.relevantCows
    for (var i = newRelevantCows.length - 1; i >= 0; i--) {
      if(newRelevantCows[i].tvd === tvd){
        newRelevantCows[i].selected = !newRelevantCows[i].selected
        this.setState({
          relevantCows: newRelevantCows
        })
      }
    }
    this.countSelectedCows.bind(this)(this)
  }
  countSelectedCows(){
    let counter = 0
    for (var i = this.state.relevantCows.length - 1; i >= 0; i--) {
      var toCompare = this.state.relevantCows[i].selected
      if(toCompare == true){
        counter = counter + 1
      }
    }
    this.setState({
      numSelectedCows:counter
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
  next(){
    this.props.updateCategory(this.props.selectedCategory, this.state.numSelectedCows, this.state.relevantCows)
    this.props.navigator.pop()
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white'}}>
          <Header>
            <Left>
              <Button transparent onPress={this.back.bind(this)}>
                <Icon name={'close'}/>
              </Button>
            </Left>
            <Body>
              <Title>{this.props.selectedCategory}</Title>
              <Subtitle>{this.state.numSelectedCows}/{this.state.numTotalCows}</Subtitle>
            </Body>
            <Right/>
          </Header>

          <View style={styles.container}>
            <TouchableHighlight style={styles.boxBelowHeader} onPress={this.selectAll.bind(this, true)}>
              <Text style={styles.textBelowHeader}>Alle auswäheln</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.boxBelowHeader} onPress={this.selectAll.bind(this, false)}>
              <Text style={styles.textBelowHeader}>Alle abwählen</Text>
            </TouchableHighlight>
          </View>

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
              <Button full onPress={this.next.bind(this)}>
                <Text>Übernehmen</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',

  },
  boxBelowHeader:{
    flex:1,
    height:40,
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderColor: '#a7a6ab',
    borderBottomWidth:0.5,
  },
  textBelowHeader:{
    textAlign: 'center',
    color:'blue'
  }
});

module.exports = SelectCows;
