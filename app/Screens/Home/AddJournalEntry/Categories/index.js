'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView
} from 'react-native';

import {StyleProvider, Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import Dimensions from 'Dimensions';
import getTheme from '../../../../../native-base-theme/components';
import platform from '../../../../../native-base-theme/variables/platform';

class Categories extends Component {
  constructor(props) {
    super(props);
    var animals = this.props.animals
    this.state = {
      animals: animals,
    };
  }

  navigate(routeName, selectedCategory){
    this.props.navigator.push({
      name: routeName,
      selectedCategory: selectedCategory
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

  openCategory(message){
    console.log(message)
    this.navigate.bind("SelectCows")

  }

  finish(){
    console.log(this.props.totalTime, this.props.animals)
  }

  categoryButtonStyle(selected){
    if(selected){
      var backgroundColor = 'rgba(255, 255, 255, 0.3)'
      var borderColor = 'rgba(255, 255, 255, 0.05)'
    }
    else{
      var backgroundColor = 'rgba(255, 255, 255, 0)'
      var borderColor = 'white'
    }
    return {
      width: (Dimensions.get('window').width-50)/2,
      height: 100,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: borderColor,
      margin: 10,
      backgroundColor: backgroundColor
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <View style={styles.wrapper}>
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
                <Text>Abbrechen</Text>
              </Button>
            </Right>
          </Header>

          <View style={styles.container}>
            <View style={styles.list}>
              {this.state.animals.map((category) => {return(
                <TouchableHighlight
                  style={this.categoryButtonStyle.bind(this)(category.selected)}
                  key={category.category}
                  onPress={this.navigate.bind(this, "SelectCows", category.category)}>
                  <View style={styles.container2}>
                    <Text style={styles.title}>
                      {category.category}
                    </Text>
                    {category.selected &&
                      <Text
                        style={styles.numSelectedCows}>
                        {category.numSelectedCows}/{category.cows.length}
                      </Text>
                    }

                  </View>
                </TouchableHighlight>)})}
              </View>
            </View>

            <Footer>
              <FooterTab>
                <Button full onPress={this.finish.bind(this)}>
                  <Text>Fertig</Text>
                </Button>
              </FooterTab>
            </Footer>
          </View>
        </StyleProvider>
      );
    }
  }

  const styles = StyleSheet.create({
    wrapper:{
      flex:1,
      backgroundColor: 'white',
    },
    container:{
      backgroundColor: 'rgba(0, 77, 0, 0.6)',
      flex:1,
      flexDirection: 'column',
      padding:5

    },

    container2: {
      flex: 1,
      justifyContent: 'center',
    },

    title: {
      fontSize: 36,
      textAlign: 'center',
      color: '#fff',
    },
    numSelectedCows:{
      color: '#fff',
      textAlign: 'center',
    },
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
  });

  module.exports = Categories;
