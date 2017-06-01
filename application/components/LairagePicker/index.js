'use strict'
import React, { Component } from 'react';

import { Icon, StyleProvider, Container, Header, Left, Right, Body, Button, Col, Grid, Title, Footer, FooterTab } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';

import DatePicker from 'react-native-datepicker'
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import Dimensions from 'Dimensions';
import DateConverter from '../../utilities/dateConverter.js'




class LairagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfLairage:"Weide",
      weide: true,
      laufhof: false,
      sommerung: false
    }
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

  navigate(routeName, date){
    this.props.navigator.push({
      name: routeName,
      passProps:{
        typeOfLairage:"Weide",
        date:this.props.date
      }
    });
  }

  back(){
    this.props.navigator.pop()
  }

  selectLairage(lairage){
    if(lairage === "weide"){
      this.setState({weide:true, laufhof:false, sommerung:false, typeOfLairage:"Weide"})
    }
    else if(lairage === "laufhof"){
      this.setState({weide:false, laufhof:true, sommerung:false, typeOfLairage:"Laufhof"})
    }
    else{
      this.setState({weide:false, laufhof:false, sommerung:true, typeOfLairage:"Sömmerung"})
    }
  }

  getButtonStyle(selected, day){
    var borderRight = 1
    if (day === 'other' || day === 'sommerung'){ borderRight = 0}
    if(selected){
      var backgroundColor = 'rgba(255, 255, 255, 0.3)'
    }
    else{
      var backgroundColor = 'rgba(255, 255, 255, 0)'
    }
    return {
      height: 60,
      borderRightWidth: borderRight,
      borderColor:'white',
      backgroundColor: backgroundColor,
      justifyContent:'center',
      alignItems:'center',
    }
  }

  getTextStyle(selected){
    if(selected){
      return {fontSize: 20, color:'rgba(26, 26, 26, 0.7)'}
    }
    else{
      return {fontSize: 20, color:'rgb(255, 255, 255)'}
    }
  }

  getTypeOfLairage(){
    if(this.state.weide === true){
      this.setState({typeOfLairage:"Weide"})
    }else if(this.state.laufhof === true){
      this.setState({typeOfLairage:"Laufhof"})
    }else{
      this.setState({typeOfLairage:"Sömmerung"})
    }
  }

  render() {
    //console.log(this.state.date);
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white'}}>
          <Header>
            <Left>
              <Button transparent onPress={this.back.bind(this)}>
                <Icon name={'arrow-back'}/>
              </Button>
            </Left>
            <Body>
              <Title>Auslauf</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.close.bind(this)}>
                <Text style={styles.headerText}>Abbrechen</Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.wrapper}>
            <View style={styles.lairagePickerBox}>
              <Grid>
                <Col>
                  <TouchableHighlight style={this.getButtonStyle.bind(this, this.state.weide, "weide")()} onPress={this.selectLairage.bind(this, "weide")}>
                    <Text style={this.getTextStyle.bind(this, this.state.weide)()}>W</Text>
                  </TouchableHighlight>
                </Col>
                <Col>
                  <TouchableHighlight style={this.getButtonStyle.bind(this, this.state.laufhof, "laufhof")()} onPress={this.selectLairage.bind(this, "laufhof")}>
                    <Text style={this.getTextStyle.bind(this, this.state.laufhof)()}>L</Text>
                  </TouchableHighlight>
                </Col>
                <Col>
                  <TouchableHighlight style={this.getButtonStyle.bind(this, this.state.sommerung, "sommerung")()} onPress={this.selectLairage.bind(this, "sommerung")}>
                    <Text style={this.getTextStyle.bind(this, this.state.sommerung)()}>S</Text>
                  </TouchableHighlight>
                </Col>
              </Grid>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <View style={styles.dateBox}>
                <Text style={styles.date}>
                  {this.state.typeOfLairage}
                </Text>
              </View>
            </View>
          </View>
            <Footer>
              <FooterTab>
                <Button full light onPress={this.navigate.bind(this, "SelectCategories")}>
                  <Text>Weiter</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        </StyleProvider>
      );
    }
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex:1,
      backgroundColor: 'rgba(0, 77, 0, 0.6)',
      //alignItems:'center',
      //justifyContent:'center'
    },
    dateBox: {
      borderBottomWidth: 1,
      marginLeft:15,
      marginRight:15,
      marginBottom: 40,
      borderColor: 'white'
    },
    date:{
      color:'white',
      textAlign:'center',
      fontSize: 28,
      paddingBottom:10
    },
    todayCol:{
      borderRightWidth:1,
      height:60,
      textAlign:'center'
    },
    headerText:{
      color: (Platform.OS === 'ios') ? '#007aff':'#fff',
      fontSize: 15
    },
    lairagePickerBox:{
      height: 60,
      borderColor:'white',
      borderWidth: 1,
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 5,
      marginLeft:15,
      marginRight:15,
      marginTop:20,
      flexDirection:'row',
    },
  });

  module.exports = LairagePicker;
