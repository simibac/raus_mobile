'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform
} from 'react-native';
import {CheckBox, StyleProvider, Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';

function getName(name, tvd){
  if(name != ""){
    return name
  }
  else{
    return tvd
  }
}

class SelectCows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready:false
    }
  }

  componentWillMount(){
    let categories = this.props.categories
    let relevantCows = []
    for (var i = categories.length - 1; i >= 0; i--) {
      if(categories[i].category === this.props.selectedCategory){
        relevantCows = categories[i].cows
      }
    }
    this.state = {
      relevantCows: relevantCows,
      numSelectedCows: relevantCows.length,
      numTotalCows: relevantCows.length,
      ready:true,
    };
  }

  back(){
    this.props.navigator.pop()
  }

  switch(tvd){
    let newRelevantCows = this.state.relevantCows
    for (var i = newRelevantCows.length - 1; i >= 0; i--) {
      if(newRelevantCows[i].tvd === tvd){
        newRelevantCows[i].isSelected = !newRelevantCows[i].isSelected
      }
    }
    this.setState({relevantCows: newRelevantCows})
    this.countSelectedCows.bind(this)(this)
  }


  countSelectedCows(){
    let counter = 0
    for (var i = this.state.relevantCows.length - 1; i >= 0; i--) {
      var toCompare = this.state.relevantCows[i].isSelected
      if(toCompare === true){
        counter = counter + 1
      }
    }
    this.setState({numSelectedCows:counter})
  }

  //if option === true all cows are set to be selected, if option === false all cows are set to be disselected
  selectAll(option){
    let newRelevantCows = this.state.relevantCows
    for (var i = newRelevantCows.length - 1; i >= 0; i--) {
      newRelevantCows[i].isSelected = option
    }
    this.setState({
      relevantCows: newRelevantCows
    })
    this.countSelectedCows.bind(this)(this)
  }

  next(){
    this.props.updateCategory(this.state.numSelectedCows, this.state.relevantCows)
    this.props.navigator.pop()
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    //console.log(this.state.relevantCows)
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
              <Text style={styles.subtitle}>{this.state.numSelectedCows}/{this.state.numTotalCows}</Text>
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
                  <Text>{getName(cow.name, cow.tvd)}</Text>
                </Body>
                <Right>
                  <Switch value={cow.isSelected} onChange={this.switch.bind(this, cow.tvd)}/>
                </Right>
              </ListItem>
            )}
          </Content>

          <Footer>
            <FooterTab>
              <Button full light onPress={this.next.bind(this)}>
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
    color: (Platform.OS === 'ios') ? '#007aff':'black',
  },
  subtitle:{
    color: (Platform.OS === 'ios') ? 'black':'#fff',
    fontSize: 15
  }
});

module.exports = SelectCows;
