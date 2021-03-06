'use strict'
import React, { Component } from 'react';

import {Spinner, ListItem, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import localStore from '../../utilities/localStore'
import api from '../../utilities/api.js'
import Language from '../../utilities/language.json'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      ready:false
    }
  }
  componentWillMount(){
    //get Kategories from api
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      api.getCowsByCategory(res).then((res) => {
        this.setState({categories:res.categories})
        this.setState({ready:true})
      });
    })
  }

  navigate(routeName, selectedCategory){
    this.props.navigator.push({
      name:routeName,
      passProps:{
        categories:this.state.categories,
        selectedCategory:selectedCategory,
        rerender:this.rerender.bind(this)
      }
    });
  }

  pop(){
    this.props.navigator.pop()
  }

  rerender(){
    api.getCowsByCategory(this.state.token).then((res) => {
      console.log(res);
      this.setState({categories:res.categories})
      this.setState({ready:true})
    });
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    return (

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
        </Content>
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

module.exports = Categories;
