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
  var tvds = new Set()
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
      tvds.add(newCow.tvd)
    }
    var newCategory = {
      category: categories.categories[i].category,
      isSelected: true,
      cows: newCows,
      numSelectedCows: categories.categories[i].cows.length
    }
    newCategories.push(newCategory)
  }
  return [newCategories, tvds.size]
}



class SelectCategories extends Component {
  constructor(props) {
    super(props);
    var animals = this.props.animals
    this.state = {
      animals: animals,
      ready: false,
      selectedCategory:"",
      categories:[],
      numOfSeletedCows:0,
      numOfTotalCows:1
    };
  }

  componentWillMount(){
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      api.getCowsByCategory(res).then((res) => {
        var preparedData = prepareData(res)
        this.setState({
          categories:preparedData[0],
          ready:true,
          numOfTotalCows:preparedData[1],
          numSelectedCows:preparedData[1],
        })
        this.countSelectedCows()
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
        updateCategory:this.updateCategory.bind(this),
        countSelectedCows:() => this.countSelectedCows()
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
    //console.log(message)
    this.navigate.bind("SelectCows")

  }

  finish(){
    //console.log(this.props.date.getMonth(), this.props.date.getDate(), this.state.categories, this.state.token)

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
    var newCategories = this.state.categories
    for (var i = newCategories.length - 1; i >= 0; i--) {
      if(this.state.selectedCategory === newCategories[i].category){
        newCategories[i].cows = cows
        newCategories[i].isSelected = true
        newCategories[i].numSelectedCows = numSelectedCows
      }
    }
    this.setState({categories:newCategories})
  }

  switch = (categoryName) => {
    var newCategories = this.state.categories
    for(var i = 0; i < newCategories.length; i++){
      if(newCategories[i].category === categoryName){
        newCategories[i].isSelected = !newCategories[i].isSelected
        for(var j = 0; j < newCategories[i].cows.length; j++){
          if(newCategories[i].isSelected){
            newCategories[i].cows[j].isSelected = true
          }
          else{
            newCategories[i].cows[j].isSelected = false
          }
        }
        this.setState({
          categories:newCategories
        })
      }
    }
    this.countSelectedCows()
  }

  countSelectedCows = () => {
    var c = new Set()
    var newCategories = this.state.categories
    for(var i = 0; i < newCategories.length; i++){
      var categoryCounter = 0
      for(var j = 0; j < newCategories[i].cows.length; j++){
        if(newCategories[i].cows[j].isSelected){
          c.add(newCategories[i].cows[j].tvd)
          categoryCounter++
        }
      }
      newCategories[i].numSelectedCows = categoryCounter
    }
    this.setState({
      numOfSeletedCows:c.size,
      categories:newCategories
    })
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'white'}}><Spinner color='green' /></View>
    }
    //console.log(this.state.categories);
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white'}}>
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
            <Text style={styles.numOfCows}>
              {this.state.numOfSeletedCows} von {this.state.numOfTotalCows} Kühe
            </Text>
          </View>

          <Content>
            <List>
              {this.state.categories.map((category) => {return(
                <ListItem
                  key={category.category}
                  onPress={this.navigate.bind(this, "SelectCows", category.category)}>
                  <Body>
                    <Text style={styles.categoryName}>{category.category}</Text>
                    <Text style={styles.categoryCounter}>
                      {category.numSelectedCows} von {category.cows.length} Kühe
                    </Text>
                  </Body>
                  <Right>
                    <Switch
                      value={category.isSelected}
                      onChange={() => this.switch(category.category)}
                    />
                  </Right>

                </ListItem>
              )})}
            </List>
          </Content>

          <Footer>
            <FooterTab>
              <Button full light onPress={this.finish.bind(this)}>
                <Text>Fertig</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    backgroundColor: 'white',
    flex:1
  },
  container:{
    backgroundColor: 'rgba(0, 77, 0, 0.6)',
    height:73
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  numSelectedCows:{
    color: 'black',
    textAlign: 'center',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  date:{
    color:'white',
    textAlign:'center',
    fontSize: 17,
    paddingBottom:1,
    paddingTop:3,
    fontWeight:'bold'

  },
  numOfCows:{
    color:'white',
    textAlign:'center',
    fontSize: 15,
    paddingBottom:1,
    paddingTop:2,
    fontStyle:'italic'
  },
  headerText:{
    color: (Platform.OS === 'ios') ? '#007aff':'#fff',
    fontSize: 15
  },
  categoryName:{
    fontSize: 16,
  },
  categoryCounter:{
    fontSize: 15,
    color:'rgb(128, 128, 128)',
    fontStyle:'italic',
  }
});

module.exports = SelectCategories;
