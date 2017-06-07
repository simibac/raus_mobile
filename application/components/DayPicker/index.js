'use strict'
import React, { Component } from 'react';

import { Footer, FooterTab, StyleProvider,Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
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




class DayPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      today: true,
      yesterday: false,
      other: false,
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
        date:this.state.date
      }
    });
  }

  selectDay(day){
    if(day === "today"){
      this.setState({today:true, yesterday:false, other:false, date: new Date()})
    }
    else if(day === "yesterday"){
      this.setState({today:false, yesterday:true, other:false, date: new Date((new Date()).valueOf() - 1000*60*60*24)})
    }
    else{
      this.setState({today:false, yesterday:false, other:true})
      this.datePicker.onPressDate()
    }
  }

  selectLairage(lairage){
    if(lairage === "weide"){
      this.setState({weide:true, laufhof:false, sommerung:false})
    }
    else if(lairage === "laufhof"){
      this.setState({weide:false, laufhof:true, sommerung:false})
    }
    else{
      this.setState({weide:false, laufhof:false, sommerung:true})
    }
  }

  getButtonStyle(selected, day){
    var borderRight = 1
    if (day === 'other'){ borderRight = 0}
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

  changeDate(date){
    return this.state.date.getFullYear() + '-' + (this.state.date.getMonth() + 1) + '-' + this.state.date.getDate()
  }

  render() {
    //console.log(this.state.date);
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white'}}>
          <Header>
            <Left/>
            <Body>
              <Title>Datum</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.close.bind(this)}>
                <Text style={styles.headerText}>Abbrechen</Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.wrapper}>
            <View style={styles.dayPickerBox}>
              <Grid>
                <Col>
                  <TouchableHighlight style={this.getButtonStyle.bind(this, this.state.today, "today")()}onPress={this.selectDay.bind(this, "today")}>
                    <Text style={this.getTextStyle.bind(this, this.state.today)()}>Heute</Text>
                  </TouchableHighlight>
                </Col>
                <Col>
                  <TouchableHighlight style={this.getButtonStyle.bind(this, this.state.yesterday, "yesterday")()} onPress={this.selectDay.bind(this, "yesterday")}>
                    <Text style={this.getTextStyle.bind(this, this.state.yesterday)()}>Gestern</Text>
                  </TouchableHighlight>
                </Col>
                <Col>
                  <TouchableHighlight style={this.getButtonStyle.bind(this, this.state.other, "other")()} onPress={this.selectDay.bind(this, "other")}>
                    <Text style={this.getTextStyle.bind(this, this.state.other)()}>Anderes</Text>
                  </TouchableHighlight>
                </Col>
              </Grid>
            </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <TouchableHighlight style={styles.dateBox} onPress={() => {this.datePicker.onPressDate()}}>
                <Text style={styles.date}>
                  {DateConverter.getDay(this.state.date.getDay())}, {this.state.date.getDate()}{DateConverter.getDayEnding(this.state.date.getDate())} {DateConverter.getMonth(this.state.date.getMonth())} {this.state.date.getFullYear()}
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <DatePicker
            ref={(picker) => { this.datePicker = picker; }}
            mode="date"
            format="YYYY-MM-DD"
            date={this.changeDate.bind(this)()}
            maxDate= {new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={
              (date) => {
                var dateArray = date.split('-')
                var d = new Date()
                d.setFullYear(dateArray[0], dateArray[1]-1, dateArray[2])
                this.setState({date: d})
              }}
            showIcon={false}
            placeholderText="Simon"
            dateText="Simon"
            customStyles={{
              dateInput: {
                marginLeft: 0,
                height:0
              },
              dateTouchBody:{
                height:0
              }
            }}
            />
            <Footer>
              <FooterTab>
                <Button full light onPress={this.navigate.bind(this, "LairagePicker")}>
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
      alignItems:'center',
      justifyContent:'center'
    },
    dateBox: {
      borderBottomWidth: 1,
      marginLeft:15,
      marginRight:15,
      borderColor: 'white',
      marginBottom:40
    },
    date:{
      color:'white',
      textAlign:'center',
      fontSize: 28,
      paddingBottom:10
    },
    dayPickerBox:{
      height: 60,
      borderColor:'white',
      borderWidth: 1,
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 5,
      marginTop: 20,
      marginLeft:15,
      marginRight:15,
      flexDirection:'row',
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
  });

  module.exports = DayPicker;
