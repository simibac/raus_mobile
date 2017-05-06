'use strict'
import React, { Component } from 'react';

import {Switch, CheckBox, Separator, Form, List, Item, ListItem, Label,  Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  View,
  Text
} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import Swipeout from 'react-native-swipeout'

import Language from '../../../language.json'

class CategoryDetailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      animals:[],
      numSelected:0
    }
  }
  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    });
  }


  pop(){
    this.props.navigator.pop()
  }

  componentWillMount(){
    var cows = []
    for (var i = this.props.categories.length - 1; i >= 0; i--) {
      if(this.props.categories[i].category === this.props.selectedCategory){
        cows = this.props.categories[i].cows
      }
    }
    this.setState({cows:cows})
  }

  render() {
    var swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor:'red',
        color:'white'
      }
    ]
    console.log(this.state.cows);
    return (
      <Container style={{backgroundColor:'white'}}>
        <Header provider>
          <Left>
            <Button transparent onPress={this.pop.bind(this)}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>{this.props.selectedCategory}</Title>
          </Body>
          <Right>
          </Right>
        </Header>

        <Content>
          {this.state.cows.map(cow =>
            <Swipeout key={cow.tvd} right={swipeoutBtns} backgroundColor='white' autoClose={true}>
              <View>
                <ListItem>
                  <View style={{flex: 1, flexDirection:'row'}}>
                    <Grid>
                        <Col>
                          <Text style={{ textAlign:'left'}}>{cow.tvd}</Text>
                        </Col>
                        <Col>
                          <Text disabled style={{ textAlign:'right'}}>{cow.added}</Text>
                        </Col>
                    </Grid>
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
});

module.exports = CategoryDetailed;
