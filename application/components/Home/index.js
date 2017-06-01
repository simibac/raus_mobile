'use strict'
import React, { Component } from 'react';
import { Spinner, Drawer, StyleProvider,Container,Thumbnail, Icon, Switch, Header,ListItem, Left, Right, Body, Title, Button, Content, Form, Item, Input, Label, Fab, View } from 'native-base';
import {
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import ScrollingMenu from '../ScrollingMenu';

import localStore from '../../utilities/localStore'
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import MenuDrawer from '../MenuDrawer';
import DefaultCategoryItem from '../DefaultCategoryItem';
import DateConverter from '../../utilities/dateConverter.js'
import api from '../../utilities/api.js'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      recentMonths:[]
    };
  }
  componentWillMount(){
    localStore.getToken().then((res)=>{
      if(res != null){
        var dateNow = new Date()
        this.setState({
          month: dateNow.getMonth() + 1,
          year: dateNow.getFullYear(),
          token:res,
        })
        this.getMonthlyStats.bind(this)(res, dateNow.getMonth() + 1, dateNow.getFullYear())
      }
      else{
        localStore.deleteToken()
        this.props.navigator.resetTo({
          name:"Login"
        })
      }
    })
    var recentMonths = []
    for(var i = 0; i < 13; i++){
      var x = new Date();
      x.setMonth(x.getMonth() - i);
      recentMonths.push(DateConverter.getMonth(x.getMonth()) + ' ' + x.getFullYear())
    }
    this.setState({
      recentMonths:recentMonths
    })
  }

  getMonthlyStats(token, month, year){

    api.getMonthlyStats(token, month, year).then((res) => {
      if(typeof res.error === 'undefined'){
        this.setState({
          monthlyStats:res.monthly_stats,
          ready:true,
        })
      }
      else{
        console.log("LOGGGING OUT!");
        localStore.deleteToken()
        this.props.navigator.resetTo({
          name:"Login"
        })
      }
    });
  }

  navigate(routeName){
    this.props.navigator.push({
      name:routeName
    });
  }
  pop(){
    this.props.navigator.pop()
  }

  closeDrawer(){
    this.drawer._root.close()
  };

  openDrawer(){
    this.drawer._root.open()
  }

  onClick(itemIndex) {
    console.log(this.state.recentMonths[itemIndex]);
    var date = this.state.recentMonths[itemIndex].split(" ")
    this.getMonthlyStats.bind(this)(this.state.token, dateConverter.getMonthNumber(date[0]), date[1])
  }

  goToCategory(selectedCategory){
    this.props.navigator.push({
      name:"DashboardDetailed",
      passProps:{
        monthlyStats:this.state.monthlyStats,
        selectedCategory:selectedCategory,
        selectedMonth: this.state.month,
        selectedYear: this.state.year,
        //rerender:this.rerender.bind(this)
      }
    });
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }

    return (
      <StyleProvider style={getTheme(platform)}>
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<MenuDrawer setUser = {this.props.setUser} user = {this.props.user} navigator={this.props.navigator} closeDrawer={this.closeDrawer.bind(this)}/>}
          onClose={() => this.closeDrawer.bind(this)}
          >
            <Container style={{backgroundColor:'white'}}>
              <Header provider>
                <Left>
                  <Button transparent onPress={this.openDrawer.bind(this)}>
                    <Icon name='menu' />
                  </Button>
                </Left>
                <Body>
                  <Title>Dashboard</Title>
                </Body>
                <Right>
                  <Button transparent onPress={this.navigate.bind(this, "DayPicker")}>
                    <Icon name='ios-create-outline' />
                  </Button>
                </Right>
              </Header>
              <View style={{height:38}}>
                <ScrollingMenu
                  items={this.state.recentMonths}
                  callback={this.onClick.bind(this)}
                  backgroundColor="#ffffff"
                  textColor="#cccccc"
                  selectedTextColor="#000000"
                  itemSpacing={20}
                  style={{height:20}}/>
                </View>
                <Content>
                  {this.state.monthlyStats.category_stats.map((category) => {return(
                    <DefaultCategoryItem
                    key={category.category_name}
                    categoryName={category.category_name}
                    categoryDescription={category.category_description}
                    numOfAnimals={category.number_of_animals}
                    lowest={category.lowest_days}
                    highest={category.maximum_days}
                    max={category.number_of_days_required}
                    goToCategory={this.goToCategory.bind(this)}/>
                  )
                })}
              </Content>
            </Container>
          </Drawer>
        </StyleProvider>
      );
    }
  }

  const styles = StyleSheet.create({
    title: {
      paddingTop: 30,
      fontSize: 20
    }
  });

  module.exports = Dashboard;
