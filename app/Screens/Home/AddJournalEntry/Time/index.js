'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Svg, { G, Path } from 'react-native-svg';
import {Segment, StyleProvider, Footer, FooterTab, Button, Header, Title, Subtitle, Container, Content, List, ListItem, Icon, Badge, Left, Body, Right, Switch } from 'native-base';

import getTheme from '../../../../../native-base-theme/components';
import platform from '../../../../../native-base-theme/variables/platform';
import CircularSlider from '../../../../components/TimePicker/CircularSlider';
import TimerText from '../../../../components/TimePicker/TimerText';
import Dimensions from 'Dimensions';

const WAKE_ICON = (
  <G>
    <Path d="M2,12.9h1.7h3h2.7h3H14c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7c-0.9,0-1.7-0.7-1.7-1.7v-4
      c0-2.1-1.5-3.8-3.4-4.2C9,1.6,9,1.4,9,1.3c0-0.5-0.4-1-1-1c-0.5,0-1,0.4-1,1c0,0.2,0,0.3,0.1,0.4c-2,0.4-3.4,2.1-3.4,4.2v4
      c0,0.9-0.7,1.7-1.7,1.7c-0.4,0-0.7,0.3-0.7,0.7C1.3,12.6,1.6,12.9,2,12.9z"/>
      <Path d="M8,15.7c1.1,0,2.1-0.9,2.1-2.1H5.9C5.9,14.8,6.9,15.7,8,15.7z"/>
    </G>
  );

  const BEDTIME_ICON = (
    <G>
      <Path d="M11.7,10.5c-3.6,0-6.4-2.9-6.4-6.4c0-0.7,0.1-1.4,0.4-2.1C3.1,2.9,1.2,5.3,1.2,8.1c0,3.6,2.9,6.4,6.4,6.4
        c2.8,0,5.2-1.8,6.1-4.4C13.1,10.4,12.4,10.5,11.7,10.5z"/>
        <Path d="M8,7.6l2-2.5H8V4.4H11v0.6L9,7.6h2v0.7H8V7.6z"/>
        <Path d="M11.7,5.4l1.5-1.9h-1.4V3h2.2v0.5l-1.5,1.9h1.5v0.5h-2.2V5.4z"/>
        <Path d="M9.4,3l1.1-1.4h-1V1.3H11v0.4L9.9,3H11v0.4H9.4V3z"/>
      </G>
    );

    const rauscolor = "rgb(38, 38, 38)"
    const reincolor = "rgb(0, 102, 34)"
    const windowWidth = Dimensions.get('window').width

    function calculateMinutesFromAngle(angle) {
      return Math.round(angle / (Math.PI / (12 * 12))) * 5;
    }

    function calculateTimeFromAngle(angle) {
      const minutes = calculateMinutesFromAngle(angle);
      const h = Math.floor(minutes / 60);
      const m = minutes - h * 60;
      return { h, m };
    }

    function roundAngleToFives(angle) {
      const fiveMinuteAngle = 2 * Math.PI / 144;

      return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
    }

    function padMinutes(min) {
      if (`${min}`.length < 2) {
        return `0${min}`;
      }

      return min;
    }

    class AddJournal extends Component {
      state = {
        startAngle: Math.PI * 4/6,
        angleLength: Math.PI * 5/6,
        allDay:false,
      }

      onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
        this.setState({ minutesLong });
      }

      onUpdate = ({ startAngle, angleLength }) => {
        this.setState({
          startAngle: roundAngleToFives(startAngle),
          angleLength: roundAngleToFives(angleLength)
        });
      }

      navigate(routeName){
        this.props.navigator.push({
          name:routeName,
        });
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

      next(angleLength){
        if(this.state.allDay == true){
          var minutes = 1440
        }else{
          var minutes = calculateMinutesFromAngle(angleLength)
        }
        this.props.setTotalTime(minutes)
        this.props.navigator.push({
          name:"Categories"
        })
      }

      switch(){
        this.setState({
          allDay:!this.state.allDay,
        })
      }

      render() {
        const { startAngle, angleLength } = this.state;
        const bedtime = calculateTimeFromAngle(startAngle);
        const waketime = calculateTimeFromAngle((startAngle + angleLength) % (2 * Math.PI));

        return (
          <StyleProvider style={getTheme(platform)}>
          <View style={styles.wrapper}>

            <Header>
              <Left>
              </Left>
              <Body>
                <Title>Zeit</Title>
              </Body>
              <Right>
                <Button transparent onPress={this.close.bind(this)}>
                  <Text>Cancel</Text>
                </Button>
              </Right>
            </Header>


            <ListItem icon>
              <Body>
                <Text>Den ganzen Tag auf der Weide verbracht</Text>
              </Body>
              <Right>
                <Switch value={this.state.allDay} onChange={this.switch.bind(this)}/>
              </Right>
            </ListItem>
            <Container>
              {!this.state.allDay &&
                <View style={styles.container}>
                  <View style={styles.timeContainer}>
                    <View style={styles.time}>
                      <View style={styles.timeHeader}>
                        <Svg height={16} width={16}>
                          <G fill={reincolor}>{WAKE_ICON}</G>
                        </Svg>
                        <Text style={styles.bedtimeText}>RAUS</Text>
                      </View>
                      <Text style={styles.timeValue}>{bedtime.h}:{padMinutes(bedtime.m)}</Text>
                    </View>
                    <View style={styles.time}>
                      <View style={styles.timeHeader}>
                        <Svg height={16} width={16}>
                          <G fill={rauscolor}>{BEDTIME_ICON}</G>
                        </Svg>
                        <Text style={styles.wakeText}>REIN</Text>
                      </View>
                      <Text style={styles.timeValue}>{waketime.h}:{padMinutes(waketime.m)}</Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={styles.sleepTimeContainer}
                      minutesLong={calculateMinutesFromAngle(angleLength)}
                    />
                    <TimerText
                      style={styles.sleepTimeContainer}
                      minutesLong={calculateMinutesFromAngle(angleLength)}
                    />
                    <CircularSlider
                      startAngle={startAngle}
                      angleLength={angleLength}
                      onUpdate={this.onUpdate}
                      segments={5}
                      strokeWidth={40}
                      radius={(windowWidth-90)/2}
                      gradientColorFrom={reincolor}
                      gradientColorTo={rauscolor}
                      showClockFace
                      clockFaceColor="#FFFFFF"
                      bgCircleColor="#171717"
                      startIcon={<G scale="1.1" transform={{ translate: "-8, -8" }}>{WAKE_ICON}</G>}
                      stopIcon={<G scale="1.1" transform={{ translate: "-8, -8" }}>{BEDTIME_ICON}</G>}
                    />
                  </View>
                </View>
              }
            </Container>
            <Footer>
              <FooterTab>
                <Button full onPress={this.next.bind(this, angleLength)}>
                  <Text>Weiter</Text>
                </Button>
              </FooterTab>
            </Footer>
          </View>
        </StyleProvider>
        );
      }
    }

    const styles = StyleSheet.create({
      wrapper: {
        flex:1,
        backgroundColor: 'white',
      },
      innerWrapper:{
        backgroundColor: 'rgba(0, 77, 0, 0.6)',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 77, 0, 0.6)',
      },
      bedtimeText: {
        color: reincolor,
        marginLeft: 3,
        fontSize: 16,
      },
      wakeText: {
        color: rauscolor,
        marginLeft: 3,
        fontSize: 16,
      },
      timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      time: {
        alignItems: 'center',
        flex: 1,
      },
      timeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      timeValue: {
        color: 'white',
        fontSize: 35,
        fontWeight: "300",
      },
      sleepTimeContainer: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    });

    module.exports = AddJournal;
