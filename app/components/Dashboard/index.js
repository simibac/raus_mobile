'use strict'
import React, { Component } from 'react';

import { Icon, Button, Fab, Header, Left, Body, Right, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import DashboardHome from './DashboardHome.js'
import AddJournal from './AddJournal/TimePicker'


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true'
    };
  }

  renderScene(route, navigator) {
    console.log(route);
    if(route.name == 'DashboardHome') {
      return (
        <Container>
          <DashboardHome os={this.props.os}
            navigator={navigator}
          />
          </Container>)
        }
        if(route.name == 'AddJournal') {
          return (
            <Container>
              <AddJournal os={this.props.os}
                navigator={navigator}
              />
              </Container>)
            }
          }

          render() {
            return (
              <Container>
                <Navigator
                  initialRoute={{name: 'DashboardHome'}}
                  renderScene={this.renderScene.bind(this)}
                />
                </Container>
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
