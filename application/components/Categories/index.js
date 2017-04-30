'use strict'
import React, { Component } from 'react';

import {ListItem, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import Swipeout from 'react-native-swipeout'


import Language from '../../../language.json'

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }
  componentWillMount(){
    //get Kategories from api
    var categories = ["A1", "A2", "Rinder", "Mittwochkühe"]
    this.setState({
      categories:categories
    })
  }
  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    });
  }
  pop(){
    this.props.navigator.pop()
  }

  render() {
    var swipeoutBtns = [
  {
    text: 'Delete',
    backgroundColor:'red',
    color:'white'
  }
]
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
            {this.state.categories.map(category =>
              <Swipeout right={swipeoutBtns} backgroundColor='white' autoClose={true}>
                <View>
                  <ListItem >
                    <View style={{flex: 1}}>
                      <Text style={{width:100}}>{category}</Text>
                    </View>
                  </ListItem>
                </View>
              </Swipeout>
            )}
          </Content>
      </Container>
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
