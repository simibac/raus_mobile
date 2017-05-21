'use strict'
import React, { Component } from 'react';

import { StyleProvider, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';
import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';

import Language from '../../../language.json'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "Simon",
        lastName: "Bachmann",
        email: "simonbachmann@uzh.ch",
        role: "farmer",
        password:"secret",
        farmId: "SimonsFarm",
        language: "en",
        userId: 12726
      }
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

  render() {
    console.log(this.props);
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container style={{backgroundColor:'white'}}>
        <Header>
          <Left>
            <Button transparent onPress={this.close.bind(this)}>
                <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{Language[this.state.user.language]["settings"]}</Title>
          </Body>
          <Right/>
        </Header>
        <Content padder>
          <Card>
            <CardItem header>
              <Text>{Language[this.state.user.language]["profile"]}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text>{Language[this.state.user.language]["first-name-beginning"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.props.user.First_name}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text>{Language[this.state.user.language]["last-name-beginning"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.props.user.Last_name}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col style={{width: 50}}><Text>{Language[this.state.user.language]["email"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.props.user.Email}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text>{Language[this.state.user.language]["language"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.props.user.Language}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text secureTextEntry>{Language[this.state.user.language]["password"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>********</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text secureTextEntry>{Language[this.state.user.language]["joined"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.props.user.Created}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
          </Card>


          <Card>
            <CardItem header>
              <Text>{Language[this.state.user.language]["farm"]}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text secureTextEntry>{Language[this.state.user.language]["farm-id"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.props.user.Farm_id}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            </Card>


            <Card>
              <CardItem header>
                <Text>{Language[this.state.user.language]["notifications"]}</Text>
              </CardItem>
            </Card>


            <Card>
              <CardItem header>
                <Text>{Language[this.state.user.language]["about-raus"]}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Grid>
                    <Col><Text secureTextEntry>{Language[this.state.user.language]["version"]}</Text></Col>
                    <Col><Text style={{ textAlign:'right'}}>1.0.0</Text></Col>
                  </Grid>
                </Body>
              </CardItem>
              </Card>
          </Content>

        </Container>
      </StyleProvider>

      );
    }
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex:1,
      backgroundColor: 'white',
    },
    container: {
      backgroundColor: 'rgba(0, 77, 0, 0.6)',
    },
  });

  module.exports = Settings;
