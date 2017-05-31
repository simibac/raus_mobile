'use strict'
import React, { Component } from 'react';

import {StyleProvider,Footer, FooterTab, Switch, CheckBox, Separator, Form, List, Item, ListItem, Label,  Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  View,
  Text,
  Platform
} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import Swipeout from 'react-native-swipeout'
import EditableListItem from '../EditableListItem'
import api from '../../utilities/api'
import Language from '../../utilities/language.json'
import localStore from '../../utilities/localStore'

class CategoryDetailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      animals:[],
      numSelected:0,
      editing:false,
    }
  }
  navigate(routeName){
    this.props.navigator.push({
      name:routeName,
      passProps:{
        selectedCategory:this.props.selectedCategory,
        rerender:this.props.rerender
      }
    });
  }

  pop(){
    this.props.navigator.pop()
  }

  getText(){
    if(this.state.editing){
      return 'Fertig'
    }
    else{
      return 'Bearbeiten'
    }
  }

  editing(){
    this.setState({
      editing:!this.state.editing
    })
  }

  componentWillMount(){
    var cows = []
    for (var i = this.props.categories.length - 1; i >= 0; i--) {
      if(this.props.categories[i].category === this.props.selectedCategory){
        for(var j = this.props.categories[i].cows.length -1; j >= 0; j--){
          var cow = {
            added: this.props.categories[i].cows[j].added,
            journal: this.props.categories[i].cows[j].journal,
            tvd: this.props.categories[i].cows[j].tvd,
            name: this.props.categories[i].cows[j].name,
            selected: false
          }
          cows.push(cow)
        }
      }
    }
    this.setState({cows:cows})
  }

  selectCow(tvd){
    var cows = this.state.cows
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

  countSelectedCows(){
    let counter = 0
    for (var i = this.state.cows.length - 1; i >= 0; i--) {
      var toCompare = this.state.cows[i].selected
      if(toCompare == true){
        counter = counter + 1
      }
    }
    this.setState({
      numSelected:counter
    })
  }

  deleteCows(){
    var selectedTvds = []
    for(var i = 0; i < this.state.cows.length; i++){
      if(this.state.cows[i].selected)
      selectedTvds.push(this.state.cows[i].tvd)
    }
    console.log("deleting ", selectedTvds, this.props.selectedCategory);

    localStore.getToken().then((res)=>{
      if(res != null){
        api.deleteCategory(res, this.props.selectedCategory, selectedTvds).then((res2) => {
          if(typeof res.error === 'undefined'){
            this.pop()
            this.setState({errorText:""})
            this.props.rerender()
          }else{
            this.setState({errorText:"This category name already exists"})
          }
        })
      }
    })
  }


  render() {
    console.log(this.props);
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white'}}>
          <Header provider>
            <Left>
              {!this.state.editing &&
                <Button transparent onPress={this.pop.bind(this)}>
                  <Icon name='arrow-back'/>
                </Button>}
              </Left>
              <Body>
                <Title>{this.props.selectedCategory}</Title>
              </Body>
              <Right>
                <Button transparent onPress={this.editing.bind(this)}>
                {this.props.isEditable &&
                  <Text style={styles.headerText}>{this.getText.bind(this)()}</Text>
                }
                </Button>
              </Right>
            </Header>
            {this.state.editing &&
              <Button full light onPress={this.navigate.bind(this, "AddAnimalToCategory")} >
                <Icon name='add'/>
                <Text>Tier hinzufügen</Text>
              </Button>
            }
            <Content>
              {this.state.cows.map(cow =>
                <EditableListItem key={cow.tvd} editing={this.state.editing} selected={cow.selected} tvd={cow.tvd} added={cow.added} name={cow.name} selectCow={this.selectCow.bind(this)}/>
              )}
            </Content>
            {this.state.editing &&
              <Footer>
                <FooterTab>
                  <Button full primary disabled={this.state.numSelected === 0} onPress={this.deleteCows.bind(this)}>
                    <Text style={{color:'white'}}>Löschen</Text>
                  </Button>
                </FooterTab>
              </Footer>}
            </Container>
          </StyleProvider>

        );
      }
    }

    const styles = StyleSheet.create({
      separator: {
        marginTop:20,
        backgroundColor: 'rgb(242, 242, 242)',
        height:40,
        paddingLeft:15,
        justifyContent: 'center',
      },
      separatorText: {
        color: 'rgb(140, 140, 140)',
      },
      headerText:{
        color: (Platform.OS === 'ios') ? '#007aff':'#fff',
        fontSize: 15
      }
    });

    module.exports = CategoryDetailed;
