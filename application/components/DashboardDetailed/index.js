'use strict'
import React, { Component } from 'react';

import {StyleProvider, Subtitle, Card, CardItem, Spinner, Container, Header, Left, Right, Body, Button, Icon, Title, Content, Tabs, Tab, List, ListItem} from 'native-base';
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

function getRelevantAnimals(categoryName, categories){
  for (var i = 0; i < categories.length; i++){
    if (categories[i].category_name === categoryName){
      return i
    }
  }
}
function getName(name, earTagNumber){
  if (name.length > 0){
    return name
  }
  else{
    return earTagNumber
  }
}

class DashboardDetailed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relevantCategory: {},
      ready:false
    }
  }
  componentWillMount(){
    var index = getRelevantAnimals(this.props.selectedCategory, this.props.monthlyStats.category_stats)
    this.setState({
      relevantCategory: this.props.monthlyStats.category_stats[index],
      ready: true
    })
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
      <StyleProvider style={getTheme(platform)}>

      <Container style={{backgroundColor:'white'}}>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={this.pop.bind(this)}>
              <Icon name='arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title>{this.props.selectedCategory}</Title>
            <Subtitle>{this.props.selectedMonth}-{this.props.selectedYear}</Subtitle>
          </Body>
          <Right>
          </Right>
        </Header>
        <Tabs>
          <Tab heading="Journal" >
            <Content>
              <List>
                {this.state.relevantCategory.cows.map((cow) => {return(
                  <ListItem key={cow.ear_tag_number}>
                    <Left>
                      <Text>{getName(cow.name, cow.ear_tag_number)}</Text>
                    </Left>
                    <Right><Text>
                      {cow.number_of_days_outside}/{this.state.relevantCategory.number_of_days_required} T
                    </Text></Right>
                  </ListItem>
                )})}
              </List>
            </Content>
          </Tab>
          <Tab heading="Information">
            <Content padder>
              <Card>
                <CardItem avatar>
                    <Left>
                      <Icon name='md-information-circle'/>
                      <Text>       {this.state.relevantCategory.category_description}</Text>
                    </Left>
                </CardItem>
              </Card>
              <Card>
                <CardItem avatar>
                    <Left>
                      <Icon name='logo-bitcoin'/>
                      <Text>        190CHF/Jahr und GVE</Text>
                    </Left>
                </CardItem>
              </Card>
            </Content>
          </Tab>
        </Tabs>
      </Container>
    </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    backgroundColor: 'white',
  }
});

module.exports = DashboardDetailed;
