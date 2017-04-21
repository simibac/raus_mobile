'use strict'
import React, { Component } from 'react';

import { Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
} from 'react-native';

import SignUp from './SignUp'
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

  render() {
    return (
      <Container>
        <Header>
          <Left/>
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
                  <Col><Text style={{ textAlign:'right'}}>{this.state.user.firstName}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text>{Language[this.state.user.language]["last-name-beginning"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.state.user.lastName}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col style={{width: 50}}><Text>{Language[this.state.user.language]["email"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.state.user.email}</Text></Col>
                </Grid>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text>{Language[this.state.user.language]["language"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.state.user.language}</Text></Col>
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
          </Card>


          <Card>
            <CardItem header>
              <Text>{Language[this.state.user.language]["farm"]}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Grid>
                  <Col><Text secureTextEntry>{Language[this.state.user.language]["farm-id"]}</Text></Col>
                  <Col><Text style={{ textAlign:'right'}}>{this.state.user.farmId}</Text></Col>
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
      );
    }
  }

  const styles = StyleSheet.create({
    title: {
      paddingTop: 30,
      fontSize: 20
    }
  });

  module.exports = Settings;