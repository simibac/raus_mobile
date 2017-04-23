'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView
} from 'react-native';

import {Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';
import Dimensions from 'Dimensions';

class Categories extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var data = [
      {
        category: "A1",
        selected: false,
        cows:[
          "123",
          "234",
          "345",
          "456",
          "567",
          "789",
          "876",
          "765",
          "654",
        ]
      },
      {
        category: "A2",
        selected: false,
        cows:[
          "123",
          "234",
          "345",
          "456",
          "567",
          "789",
          "876",
          "765",
          "654",
        ]
      },
      {
        category: "A4",
        selected: false,
        cows:[
          "123",
          "234",
          "345",
          "456",
          "567",
          "789",
          "876",
          "765",
          "654",
        ]
      },
      {
        category: "A9",
        selected: false,
        cows:[
          "123",
          "234",
          "345",
          "456",
          "567",
          "789",
          "876",
          "765",
          "654",
        ]
      },
    ]
    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  navigate(routeName){
    this.props.navigator.push({
      name:routeName,
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
  }

  next(){

  }

  categoryButtonStyle(){
    return {
      width: (Dimensions.get('window').width-50)/2,
      height:100,
      borderWidth: 2,
      borderRadius:5,
      borderColor: 'white',
      margin:10
    }
  }

  render() {
    return (
      <View style={styles.wrapper}>

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
              <Text>Abbrechen</Text>
            </Button>
          </Right>
        </Header>


        <View style={styles.container}>
          <ListView contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(category) =>
              {
              return <CategoryButton
                categoryButtonStyle={this.categoryButtonStyle.bind()}
                openCategory={this.openCategory.bind(this)}
                category={category.category}
                selected={category.selected}>{category}
              </CategoryButton>}
              }
          />
        </View>


        <Footer>
          <FooterTab>
            <Button full onPress={this.next.bind(this)}>
              <Text>Fertig</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

const CategoryButton = (props) =>
<TouchableHighlight style={props.categoryButtonStyle()}
  onPress={() => props.openCategory(props.category)}
  >
    <View style={styles.container2}>
      <Text style={styles.title}>
        {props.category}
      </Text>
    </View>
  </TouchableHighlight>

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
    category:{
      height:100,
      width:100,
      borderWidth: 2,
      borderRadius:5,
      borderColor: 'white',
      margin: 20
    },

    container2: {
      flex: 1,
      marginTop: 30,
      marginBottom: 30,
      justifyContent: 'center',
    },

    title: {
      fontSize: 36,
      textAlign: 'center',
      color: '#fff',

    },
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
  });

  module.exports = Categories;
