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
import Language from '../../utilities/language.json'
import DateConverter from '../../utilities/dateConverter.js'

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.props.user.created);
    var joinedRausDate = new Date(this.props.user.created)
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={{backgroundColor:'white', flex:1}}>

          <Header>
            <Left>
              <Button transparent onPress={this.close.bind(this)}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>{Language[this.props.user.language]["settings"]}</Title>
            </Body>
            <Right/>
          </Header>

          <Content padder>
            <Card>
              <CardItem header bordered>
                <Text style={styles.cardHeader}>RAUS</Text>
              </CardItem>
              <CardEntry left="Raus-Email" right={this.props.user.email}/>
              <CardEntry left="Raus-Passwort" right="********"/>
              <CardEntry left="Beigetreten" right={dateConverter.getDayMonthYear(joinedRausDate)}/>
            </Card>

            <Card>
              <CardItem header bordered>
                <Text style={styles.cardHeader}>AGATE</Text>
              </CardItem>
              <CardEntry left="Agate-Nummer" right={this.props.user.agateNumber}/>
              <CardEntry left="Agate-Passwort" right="********"/>
              <CardEntry left="Vorname" right={this.props.user.agateDetails.postAddress.firstName}/>
              <CardEntry left="Nachname" right={this.props.user.agateDetails.postAddress.lastName}/>
              <CardEntry left="Strasse" right={this.props.user.agateDetails.postAddress.street}/>
              <CardEntry left="Postleitzahl" right={this.props.user.agateDetails.postAddress.postCode}/>
              <CardEntry left="Stadt" right={this.props.user.agateDetails.postAddress.city}/>
              <CardEntry left="Agate-Email" right={this.props.user.agateDetails.postAddress.emailAddress}/>
              <CardEntry left="Telefon Nummer" right={this.props.user.agateDetails.postAddress.phoneNumbers.stringItem[0]}/>

            </Card>


            <Card>
              <CardItem header >
                <Left>
                  <Icon style={{color:'rgb(0, 77, 0)'}} name="notifications" />
                  <Body>
                    <Text style={styles.cardHeader}>{Language[this.props.user.language]["notifications"]}</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>


            <Card style={{marginBottom:20}}>
              <CardItem header bordered>
                    <Text style={styles.cardHeader}>{Language[this.props.user.language]["about-raus"]}</Text>
              </CardItem>
              <CardEntry left={Language[this.props.user.language]["version"]} right="1.0.0"/>
            </Card>

          </Content>

        </Container>
      </StyleProvider>

    );
  }
}
var CardEntry = (props) => <CardItem>
  <Body>
    <Grid>
      <Col><Text style={styles.bodyLeft}>{props.left}</Text></Col>
      <Col><Text style={styles.cardBodyRight}>{props.right}</Text></Col>
    </Grid>
  </Body>
</CardItem>

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'rgba(0, 77, 0, 0.6)',
  },
  cardHeader:{
    color:'rgb(0, 77, 0)',
    fontSize:18,
  },
  cardBodyLeft:{

  },
  cardBodyRight:{
    color:'rgb(0, 77, 0)',
    textAlign:'right',
  }
});

module.exports = Settings;
