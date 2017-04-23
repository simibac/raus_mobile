'use strict'
import React, { Component } from 'react';

import { Header, Left, Right, Button, Icon, Body, Title, Subtitle, Container, Content, ListItem, Text, CheckBox } from 'native-base';

import {
  StyleSheet,
  Navigator,
  View,
} from 'react-native';

import Settings from '../Settings'
import Dashboard from './Dashboard.js'
import Time from './AddJournalEntry/Time'
import Categories from './AddJournalEntry/Categories'
import SelectCows from './AddJournalEntry/Categories/SelectCows.js'


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalTime : 0,
      animals: [
        {
          category: "A1",
          selected: false,
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
            },
            {
              tvd: "456",
              selected: false,
            }
          ]
        },
        {
          category: "A2",
          selected: false,
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
            }
          ]
        },
        {
          category: "A9",
          selected: false,
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
            }
          ]
        },
        {
          category: "A11",
          selected: false,
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
      ]
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
      if(route.name == 'AddJournalEntry'){
        return (
          <Container>
            <Time
              os={this.props.os}
              navigator={navigator}
            />
          </Container>)
      }
      if(route.name == 'Categories'){
        return (
          <Container>
            <Categories
              os={this.props.os}
              navigator={navigator}
              animals={this.state.animals}
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
            />
          </Container>)
      }
    }

  render() {
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
