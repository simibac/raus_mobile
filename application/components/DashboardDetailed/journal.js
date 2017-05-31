'use strict'
import React, { Component } from 'react';

import {Spinner, Container, Header, Left, Right, Body, Button, Icon, Title, Content, Tabs, Tab, List, ListItem} from 'native-base';
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

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // relevantCategory: {},
      // ready:false
    }
  }


  navigate(routeName, selectedCategory){
    // this.props.navigator.push({
    //   name:routeName,
    //   passProps:{
    //     categories:this.state.categories,
    //     selectedCategory:selectedCategory,
    //     rerender:this.rerender.bind(this)
    //   }
    // });
  }

  pop(){
    this.props.navigator.pop()
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    return (
      <Container style={{backgroundColor:'white'}}>
        <Header hasTabs>
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
        <Tabs>
          <Tab heading="Journal">
            {this.state.relevantCategory.cows.map((cow) => {return(
              <ListItem>
                <Left>
                  <Text>{cow.ear_tag_number}</Text>
                </Left>
                <Right><Text>
                  {cow.number_of_days_outside}/{this.state.relevantCategory.number_of_days_required}
                </Text></Right>
              </ListItem>
            )})}
          </Tab>
          <Tab heading="Information">
          </Tab>
        </Tabs>
        <Content>
          <List>

          </List>
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

module.exports = Journal;
