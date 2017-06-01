'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView,
  Platform,

} from 'react-native';

import {Spinner, StyleProvider, Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import Dimensions from 'Dimensions';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import DateConverter from '../../utilities/dateConverter.js'
import api from '../../utilities/api.js'
import localStore from '../../utilities/localStore'


// needed for adding the isSelected field for each category and each cow
function prepareData(categories){
  var newCategories = []
  for (var i = categories.categories.length - 1; i >= 0; i--) {
    var newCows = []
    for (var j = categories.categories[i].cows.length -1; j >= 0; j--){
      var newCow = {
        tvd:categories.categories[i].cows[j].tvd,
        journal:categories.categories[i].cows[j].journal,
        added:categories.categories[i].cows[j].added,
        isSelected:true,
        name:categories.categories[i].cows[j].name,

      }
      newCows.push(newCow)
    }
    var newCategory = {
      category: categories.categories[i].category,
      isSelected: true,
      cows: newCows,
      numSelectedCows: categories.categories[i].cows.length
    }
    newCategories.push(newCategory)
  }
  return newCategories
}



class SelectCategories extends Component {
  constructor(props) {
    super(props);
    var animals = this.props.animals
    this.state = {
      animals: animals,
      ready: false,
      selectedCategory:""
    };
  }

  componentWillMount(){
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      api.getCowsByCategory(res).then((res) => {
        var newCategories = prepareData(res)
        this.setState({categories:newCategories})
        this.setState({ready:true})
      });
    })
  }


  navigate(routeName, selectedCategory){
    this.setState({selectedCategory:selectedCategory})
    this.props.navigator.push({
      name: routeName,
      passProps:{
        selectedCategory: selectedCategory,
        categories: this.state.categories,
        updateCategory:this.updateCategory.bind(this)
      }
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
    console.log(this.props.date.getMonth(), this.props.date.getDate(), this.state.categories, this.state.token)

    var selectedCows = new Set()

    for (var i = this.state.categories.length - 1; i >= 0; i--) {
      for (var j = this.state.categories[i].cows.length - 1; j >= 0; j--) {
        if (this.state.categories[i].cows[j].isSelected){
          selectedCows.add(this.state.categories[i].cows[j].tvd)
        }
      }
    }
    api.addJournalEntry(this.state.token, Array.from(selectedCows), this.props.date.getFullYear(), this.props.date.getMonth() + 1, this.props.date.getDate(), 1440, this.props.typeOfLairage).then((res) => {
      if (typeof res.error === 'undefined'){
        this.close.bind(this)()
      }
    });
  }

  updateCategory(numSelectedCows, cows){
    console.log(this.state.selectedCategory)
    var newCategories = this.state.categories
    for (var i = newCategories.length - 1; i >= 0; i--) {
      if(this.state.selectedCategory === newCategories[i].category){
        newCategories[i].cows = cows
        newCategories[i].isSelected = true
        newCategories[i].numSelectedCows = numSelectedCows
        console.log(newCategories[i]);
      }
    }
    this.setState({categories:newCategories})
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

  categoryNameStyle(name){
    var width = (Dimensions.get('window').width-50)/2
    console.log(width);
    var fontSize = width/4.5 - (0.9*name.length)
    return {
      fontSize: fontSize,
      textAlign: 'center',
      color: '#fff',
    }
  }
  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    console.log(this.state.categories);
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
              {/* <Button transparent onPress={this.back.bind(this)}> */}
              <Title>Kategorien</Title>
              {/* <Subtitle>Lern more</Subtitle>

                <Icon name={'information-circle'}/>
              </Button> */}
            </Body>
            <Right>
              <Button transparent onPress={this.close.bind(this)}>
                <Text style={styles.headerText}>Abbrechen</Text>
              </Button>
            </Right>
          </Header>

          <View style={styles.container}>
            <Text style={styles.date}>
              {DateConverter.getDay(this.props.date.getDay())}, {this.props.date.getDate()}{DateConverter.getDayEnding(this.props.date.getDate())} {DateConverter.getMonth(this.props.date.getMonth())} {this.props.date.getFullYear()}
            </Text>
            <Text style={styles.date}>
              {this.props.typeOfLairage}
            </Text>
            <Content>
              <View style={styles.list}>
                {this.state.categories.map((category) => {return(
                  <TouchableHighlight
                    style={this.categoryButtonStyle.bind(this)(category.isSelected)}
                    key={category.category }
                    onPress={this.navigate.bind(this, "SelectCows", category.category)}>
                    <View style={styles.container2}>
                      <Text style={this.categoryNameStyle.bind(this)(category.category)}>
                        {category.category}
                      </Text>
                      {category.isSelected &&
                        <Text
                          style={styles.numSelectedCows}>
                          {category.numSelectedCows}/{category.cows.length}
                        </Text>
                      }
                    </View>
                  </TouchableHighlight>)})}
                </View>
              </Content>
            </View>

            <Footer>
              <FooterTab>
                <Button full light onPress={this.finish.bind(this)}>
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
    numSelectedCows:{
      color: '#fff',
      textAlign: 'center',
    },
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    date:{
      color:'white',
      textAlign:'center',
      fontSize: 20,
      paddingBottom:3,
      paddingTop:3
    },
    headerText:{
      color: (Platform.OS === 'ios') ? '#007aff':'#fff',
      fontSize: 15
    }
  });

  module.exports = SelectCategories;
