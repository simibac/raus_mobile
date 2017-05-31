'use strict'
import React, { Component } from 'react';

import {StyleProvider, Spinner, Switch, CheckBox, Separator, Form, List, Item, ListItem, Label,  Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  Text,
  StyleSheet,
  Navigator,
  View,
  Platform,
} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import localStore from '../../utilities/localStore'
import api from '../../utilities/api'

import Language from '../../utilities/language.json'

function getName(name, tvd){
  if(name != ""){
    return name
  }
  else{
    return tvd
  }
}

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      animals:[],
      numSelected:0,
      ready:false,
      errorText:''
    }
  }
  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    });
  }

  pop = () =>{
    this.props.navigator.pop()
  }

  componentWillMount(){
    var cows = []
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      api.getCows(res).then((res) => {
        //console.log(res);
        if(typeof res.error != 'undefined'){
          console.log(res.error);
        }else{
          cows = res.cows
          var newCows = []
          for (var i = cows.length - 1; i >= 0; i--) {
            var newCow = {
              tvd: cows[i].tvd,
              name: cows[i].name,
              categories: cows[i].categories,
              selected: false,
            }
            newCows.push(newCow)
          }
          this.setState({
            animals:newCows,
            ready:true,
            errorText:""
          })
        }
      });
    })
  }

  countSelectedCows(){
    let counter = 0
    for (var i = this.state.animals.length - 1; i >= 0; i--) {
      var toCompare = this.state.animals[i].selected
      if(toCompare == true){
        counter = counter + 1
      }
    }
    this.setState({
      numSelected:counter
    })
  }

  selectCow = (tvd) => {
    var cows = this.state.animals
    for (var i = cows.length - 1; i >= 0; i--) {
      if(cows[i].tvd === tvd){
        cows[i].selected = !cows[i].selected
      }
    }
    this.setState({
      animals: cows
    })
    this.countSelectedCows.bind(this)(this)
  }

  finish = () => {
    var selectedTvds = []
    for(var i = 0; i < this.state.animals.length; i++){
      if(this.state.animals[i].selected)
        selectedTvds.push(this.state.animals[i].tvd)
    }
    if(this.state.categoryName.length === 0){
      this.setState({errorText:"Please set a category name."})
    }
    else if(selectedTvds.length === 0){
      this.setState({errorText:"Please select at least one animal."})
    }
    else{
      console.log(this.state.token, selectedTvds, this.state.categoryName)
      api.addCategory(this.state.token, selectedTvds, this.state.categoryName).then((res) => {
        if(typeof res.error === 'undefined'){
          this.pop()
          this.setState({errorText:""})
          this.props.rerender()
          console.log(res);
        }else{
          this.setState({errorText:"This category name already exists"})
        }
      });
    }
  }

  createString = (categories) => {
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
    return string
  }

  updateText = (text) => {
    this.setState({categoryName:text})
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container style={{backgroundColor:'white'}}>
        <Header provider>
          <Left>
            <Button transparent onPress={() => this.pop()}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>Kat. erstellen</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.finish}>
              <Text style={styles.headerText}>Fertig</Text>
            </Button>
          </Right>
        </Header>

        <Form>
          <Item floatingLabel last >
            <Label>Kategorienamen</Label>
            <Input onChangeText={(text) => this.updateText(text)}/>
          </Item>
        </Form>
        <Text style={styles.error}>{this.state.errorText}</Text>
        <View style={styles.separator}>
          <Text style={styles.separatorText}>KÜHE: {this.state.numSelected}/{this.state.animals.length}</Text>
        </View>

        <Content>
          {this.state.animals.map(cow =>
            <ListItem key={cow.tvd}>
              <CheckBox checked={cow.selected} onPress={() => this.selectCow(cow.tvd)} />
              <Body>
                <Text>  {getName(cow.name, cow.tvd)}</Text>
                <Text style={styles.textOtherCategories}>  Kategorien: {this.createString(cow.categories)}</Text>
              </Body>
            </ListItem>
          )}
        </Content>
      </Container>
    </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    marginTop:0,
    backgroundColor: 'rgb(242, 242, 242)',
    height:40,
    paddingLeft:15,
    justifyContent: 'center',
  },
  separatorText: {
    color: 'rgb(140, 140, 140)',
  },
  textOtherCategories:{
    color:'rgb(128, 128, 128)',
    fontStyle:'italic'
  },
  error:{
    color:'red',
    paddingLeft:15
  },
  headerText:{
    color: (Platform.OS === 'ios') ? '#007aff':'#fff',
    fontSize: 15
  }
});

module.exports = Categories;
