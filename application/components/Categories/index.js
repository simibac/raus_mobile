'use strict'
import React, { Component } from 'react';

import {List, StyleProvider, Spinner, ListItem, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import Swipeout from 'react-native-swipeout'
import localStore from '../../utilities/localStore'
import api from '../../utilities/api.js'
import Language from '../../utilities/language.json'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      defaultCategories:[],
      customCategories:[],
      ready:false
    }
  }
  componentWillMount(){
    //get Kategories from api
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      api.getCowsByCategory(res).then((res) => {
        this.setTypeOfCategory(res.categories)
        this.setState({categories:res.categories})
        this.setState({ready:true})
      });
    })
  }
  rerender(){
    this.setState({ready:false})
    api.getCowsByCategory(this.state.token).then((res) => {
      console.log(res);
      this.setState({categories:res.categories})
      this.setState({ready:true})
    });
  }

  navigate(routeName, selectedCategory, isEditable){
    this.props.navigator.push({
      name:routeName,
      passProps:{
        categories:this.state.categories,
        selectedCategory:selectedCategory,
        rerender:this.rerender.bind(this),
        isEditable:isEditable,
      }
    });
  }

  pop(){
    this.props.navigator.pop()
  }

  setTypeOfCategory = (categories) =>{
    var defaultCategories = []
    var customCategories = []
    for (var i = 0; i < categories.length; i++){
      if (categories[i].isDefault === true){
        defaultCategories.push(categories[i])
      }
      else{customCategories.push(categories[i])}
    }
    this.setState({
      defaultCategories:defaultCategories,
      customCategories:customCategories,
    })
  }

  addCategory(categoryName, cows){
    var newCategories = this.state.categories
    newCategories.push(cows)
    this.setState({categories:newCategories})
  }

  deleteCategory(categoryName){
    localStore.getToken().then((res)=>{
      if (res != null){
        api.deleteCategory(res, categoryName).then((res) => {
          if(typeof res.error === 'undefined'){
            this.rerender.bind(this)()
          }
        });
      }
    })
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    //console.log(this.state.customCategories, this.state.defaultCategories);
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white'}}>
          <Header provider>
            <Left>
              <Button transparent onPress={this.pop.bind(this)}>
                <Icon name='arrow-back'/>
              </Button>
            </Left>
            <Body>
              <Title>Kategorien</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.navigate.bind(this, "CreateCategory")}>
                <Icon name='add'/>
              </Button>
            </Right>
          </Header>

          <Content>
            <List>
              { this.state.customCategories.length > 0 &&
                <ListItem itemDivider>
                  <Text>Eigene Kategorien</Text>
                </ListItem>
              }
              {this.state.customCategories.map(category =>
                <Swipeout
                  key={category.category}
                  right={[
                    {
                      text: 'Delete',
                      backgroundColor: 'red',
                      color: 'white',
                      onPress: this.deleteCategory.bind(this, category.category),
                      type:'primary'
                    }
                  ]}
                  backgroundColor='white'
                  autoClose={true}
                  >
                    <View>
                      <ListItem onPress={this.navigate.bind(this, "CategoryDetailed", category.category, true)}>
                        <View style={{flex: 1}}>
                          <Text >{category.category}</Text>
                        </View>
                      </ListItem>
                    </View>
                  </Swipeout>
                )}
                <ListItem itemDivider>
                  <Text>Generierte Kategorien</Text>
                </ListItem>
                {this.state.defaultCategories.map(category =>
                      <View key={category.category}>
                        <ListItem onPress={this.navigate.bind(this, "CategoryDetailed", category.category, false)}>
                          <View style={{flex: 1}}>
                            <Text style={{width:100}}>{category.category}</Text>
                          </View>
                        </ListItem>
                      </View>
                  )}
              </List>
            </Content>
          </Container>
        </StyleProvider>

      );
    }
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex:1,
      backgroundColor: 'white',
    },
    container: {
      backgroundColor: 'rgba(0, 77, 0, 0.6)',
    },
  });

  module.exports = Categories;
