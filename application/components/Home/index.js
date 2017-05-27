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
      this.setState({token:res})
      this.setState({ready:true})
    })
    var recentMonths = []
    for(var i = 0; i < 13; i++){
      var x = new Date();
      x.setMonth(x.getMonth()-i);
      recentMonths.push(DateConverter.getMonth(x.getMonth())+' '+x.getFullYear())
    }
    this.setState({
      recentMonths:recentMonths
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

  closeDrawer(){
    this.drawer._root.close()
  };

  openDrawer(){
    this.drawer._root.open()
  }

  onClick(itemIndex) {
    console.log("Selected");
  }

  render() {
    while (!this.state.ready){
      return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Spinner color='green' /></View>
    }
    var categories =[
      {categoryName:"A1", categoryDescription: "Milchkühe", numOfAnimals:14, lowest:15, highest:19, max:28},
      {categoryName:"A2", categoryDescription: "Weibliche Tiere, bis 160 Tage alt", numOfAnimals:11, lowest:1, highest:4, max:28},
      {categoryName:"A11", categoryDescription: "Männliche Tiere, über 160 Tage alt", numOfAnimals:23, lowest:28, highest:28, max:28},
    ]

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
                {/* {categories.map((category) => {return(
                  <DefaultCategoryItem
                    key={category.categoryName}
                    categoryName={category.categoryName}
                    categoryDescription={category.categoryDescription}
                    numOfAnimals={category.numOfAnimals}
                    lowest={category.lowest}
                    highest={category.highest}
                    max={category.max}/>
                )
              })} */}
            </Content>
            {/* <Fab
              position="bottomRight"
              style={{ backgroundColor: '#006622' }}
              onPress={this.navigate.bind(this, "SelectCategories")}>
              <Icon name="md-add" />
            </Fab> */}
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
