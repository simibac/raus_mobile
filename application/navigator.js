'use strict'
import React, { Component } from 'react';

import { Spinner, Header, Left, Right, Button, Icon, Body, Title, Subtitle, Container, Content, ListItem, Text, CheckBox } from 'native-base';

import {
  StyleSheet,
  Navigator,
  View,
  AsyncStorage,
} from 'react-native';

import localStore from './utilities/localStore'
import api from './utilities/api'


import Settings from './components/Settings'
import Dashboard from './components/Home'
import SelectCategories from './components/SelectCategories'
import SelectCows from './components/SelectCows'
import Categories from './components/Categories'
import CreateCategory from './components/CreateCategory'
import Language from './components/Language'
import DayPicker from './components/DayPicker'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import CategoryDetailed from './components/CategoryDetailed'


class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      token:'',
      initialRoute: {name: "Login"},
      ready:false,
      user:{},
      journalEntry:{},
      animals:{},
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
              categories:[1,2,3],
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
      ],
      cows:[
        {
          tvd:"#dkejr633jf",
          categories:[
            "A1",
            "Custom1",
            "Custom2"
          ]
        },
        {
          tvd:"#kpdpk436",
          categories:[
            "A1",
            "Custom1",
            "Custom2"
          ]
        },
        {
          tvd:"#ase34dfdf",
          categories:[
            "A1",
            "Custom1",
            "Custom2"
          ]
        },
        {
          tvd:"#67ztugfg",
          categories:[
            "A1",
            "Custom1",
            "Custom2"
          ]
        },
        {
          tvd:"#234fgdfsrer",
          categories:[
            "A1",
            "Custom1",
            "Custom2"
          ]
        },
        {
          tvd:"#00tgjk4ooi",
          categories:[
            "A1",
            "Custom1",
            "Custom2"
          ]
        }
      ]

    }
  }

  setUser(user){
    this.setState({
      user: user
    })
  }

  setJournalEntry(journalEntry){
    this.setState({
      journalEntry: journalEntry
    })
  }

  setAnimals(animals){
    this.setState({
      animals: animals
    })
  }

  async getUser(){
    try{
      return await AsyncStorage.getItem("user")
    }catch(error){
      console.log(error);
      return null
    }
  }

  componentWillMount(){
    AsyncStorage.getItem("token").then((res) => {
      // console.log(res);
      if(res != null){
        api.getUser(res).then((res2) => {
          console.log(res2);
          if(typeof res2.error === 'undefined'){
            this.setState({initialRoute: {name: "Dashboard"}})
            this.setState({ready: true})
          }
          else{
            this.setState({initialRoute: {name: "Login"}})
            this.setState({ready: true})
          }
        });
      }
      else{
        this.setState({ready: true})
      }
    })
  }

  configureScene(route){
    if (route.name == 'SelectCows' || route.name=='CreateCategory') {
      return Navigator.SceneConfigs.FloatFromBottom;
    } else {
      return Navigator.SceneConfigs.PushFromRight;
    }
  }

  renderScene(route, navigator) {
    switch(route.name){
      case 'Dashboard': return <Dashboard navigator={navigator} {...route.passProps} user={this.state.user} setUser={this.setUser.bind(this)}/>
      case 'Settings': return <Settings navigator={navigator} {...route.passProps}/>
      case 'SelectCategories': return <SelectCategories navigator={navigator} {...route.passProps} />
      case 'SelectCows': return <SelectCows navigator={navigator} {...route.passProps} />
      case 'Categories': return <Categories navigator={navigator} {...route.passProps} cows={this.state.cows}/>
      case 'CreateCategory': return <CreateCategory navigator={navigator} {...route.passProps} cows={this.state.cows}/>
      case 'Language': return <Language navigator={navigator} {...route.passProps} />
      case 'DayPicker': return <DayPicker navigator={navigator} {...route.passProps} />
      case 'Login': return <Login navigator={navigator} {...route.passProps} />
      case 'CreateAccount': return  <CreateAccount navigator={navigator} {...route.passProps} />
      case 'CategoryDetailed': return  <CategoryDetailed navigator={navigator} {...route.passProps} />

    }
  }

  render() {
    //localStore.deleteToken()
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    return (
      <Container>
        <Navigator
          initialRoute={this.state.initialRoute}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene.bind(this)}
        />
      </Container>
    )
  }
}

module.exports = Home;
