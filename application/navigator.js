'use strict'
import React, { Component } from 'react';

import { Header, Left, Right, Button, Icon, Body, Title, Subtitle, Container, Content, ListItem, Text, CheckBox } from 'native-base';

import {
  StyleSheet,
  Navigator,
  View,
} from 'react-native';

import Settings from './components/Settings'
import Dashboard from './components/Home'
import Categories from './components/Categories'
import SelectCows from './components/SelectCows'


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalTime : 600,
      day: 1,
      month: "Januar",
      year: 1993,
      animals: [
        {
          category: "A1",
          selected: false,
          numSelectedCows:0,
          cows:[
            {
              tvd: "111",
              selected: false,
            },
            {
              tvd: "123",
              selected: false,
            },
            {
              tvd: "234",
              selected: false,
            },
            {
              tvd: "345",
              selected: false,
            }
          ]
        },
        {
          category: "A2",
          selected: false,
          numSelectedCows:0,
          cows:[
            {
              tvd: "222",
              selected: false,
            },
            {
              tvd: "123",
              selected: false,
            },
            {
              tvd: "234",
              selected: false,
            },
            {
              tvd: "345",
              selected: false,
            },
            {
              tvd: "456",
              selected: false,
            }
          ]
        },
        {
          category: "A4",
          selected: false,
          numSelectedCows:0,
          cows:[
            {
              tvd: "444",
              selected: false,
            },
            {
              tvd: "123",
              selected: false,
            },
            {
              tvd: "234",
              selected: false,
            },
            {
              tvd: "345",
              selected: false,
            },
            {
              tvd: "456",
              selected: false,
            },
            {
              tvd: "5768",
              selected: false,
            },
            {
              tvd: "455676",
              selected: false,
            },
            {
              tvd: "45676",
              selected: false,
            }
          ]
        },
        {
          category: "A9",
          selected: false,
          numSelectedCows:0,
          cows:[
            {
              tvd: "000",
              selected: false,
            },
            {
              tvd: "123",
              selected: false,
            },
            {
              tvd: "234",
              selected: false,
            },
            {
              tvd: "345",
              selected: false,
            },
            {
              tvd: "456",
              selected: false,
            },
            {
              tvd: "456",
              selected: false,
            },
            {
              tvd: "456",
              selected: false,
            },
            {
              tvd: "456",
              selected: false,
            }
          ]
        },
        {
          category: "A11",
          selected: false,
          numSelectedCows:0,
          cows:[
            {
              tvd: "011",
              selected: false,
            },
            {
              tvd: "123",
              selected: false,
            },
            {
              tvd: "234",
              selected: false,
            }
          ]
        },
      ]
    }
  }

  updateCategory(category, numSelectedCows, cows){
    var newAnimals = this.state.animals
    for (var i = newAnimals.length - 1; i >= 0; i--) {
      if(newAnimals[i].category === category){
        newAnimals[i].cows = cows
        newAnimals[i].numSelectedCows = numSelectedCows
        newAnimals[i].selected = true
        }
      }
    }
    
  renderScene(route, navigator) {
    if(route.name == 'Dashboard') {
      return (
        <Container>
          <Dashboard
            os={this.props.os}
            navigator={navigator}/>
        </Container>)
      }
      if(route.name == 'Settings') {
        return (
          <Container>
            <Settings os={this.props.os}
              navigator={navigator}></Settings>
          </Container>)
        }
      if(route.name == 'Categories'){
        return (
          <Container>
            <Categories
              os={this.props.os}
              navigator={navigator}
              animals={this.state.animals}
              totalTime={this.state.totalTime}
            />
          </Container>)
      }
      if(route.name == 'SelectCows'){
        return (
          <Container>
            <SelectCows
              os={this.props.os}
              navigator={navigator}
              animals={this.state.animals}
              selectedCategory={route.selectedCategory}
              updateCategory={this.updateCategory.bind(this)}
            />
          </Container>)
      }
    }

  render() {
    console.log(this.state);
    return (
        <Container>
          <Navigator
            initialRoute={{name: 'Dashboard'}}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
              if (route.name == 'SelectCows') {
                return Navigator.SceneConfigs.FloatFromBottom;
              } else {
                return Navigator.SceneConfigs.PushFromRight;
              }
            }}
          />
        </Container>
    )
  }
}

module.exports = Home;
