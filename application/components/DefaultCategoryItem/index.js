'use strict'
import React, { Component } from 'react';

import {Spinner,   Text, ListItem, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import localStore from '../../utilities/localStore'
import api from '../../utilities/api.js'
import Language from '../../utilities/language.json'
import MaterialInitials from 'react-native-material-initials/native';

function shortenText(text){
  var width = Dimensions.get('window').width
  var newText = text
  if (width >= 375 && text.length > 50){
    newText = text.slice(0, 50) + "..."
  }
  return newText
}

function getInitials(categoryName){
  return categoryName.slice(0,1) + " " + categoryName.slice(1)
}

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    }
  }
  componentWillMount(){
    //get Kategories from api
    localStore.getToken().then((res)=>{
      this.setState({token:res})
      api.getCowsByCategory(res).then((res) => {
        this.setState({categories:res.categories})
        this.setState({ready:true})
      });
    })
  }

  navigate(routeName, selectedCategory){
    this.props.navigator.push({
      name:routeName,
      passProps:{
        categories:this.state.categories,
        selectedCategory:selectedCategory,
        rerender:this.rerender.bind(this)
      }
    });
  }

  pop(){
    this.props.navigator.pop()
  }

  rerender(){
    api.getCowsByCategory(this.state.token).then((res) => {
      console.log(res);
      this.setState({categories:res.categories})
      this.setState({ready:true})
    });
  }

  getProgressWidthLowest(max, lowest){
    return {
      backgroundColor: 'rgba(0, 77, 0, 0.5)',
      height: 15,
      width: (Dimensions.get('window').width - 104) / max * lowest,
      borderBottomLeftRadius:10,
      borderTopLeftRadius:10,
      borderBottomRightRadius: (this.props.lowest === this.props.max) ? 10 : 0,
      borderTopRightRadius: (this.props.lowest === this.props.max) ? 10 : 0
    }
  }
  getProgressWidthHighest(max, lowest, highest){
    return {
      backgroundColor: 'rgba(0, 77, 0, 0.2)',
      height: 15,
      width: (Dimensions.get('window').width - 104) / max * highest - (Dimensions.get('window').width - 104) / max * lowest,
      borderBottomLeftRadius: (this.props.lowest === 0) ? 10 : 0,
      borderTopLeftRadius: (this.props.lowest === 0) ? 10 : 0,
      borderBottomRightRadius: (this.props.highest === this.props.max) ? 10 : 0,
      borderTopRightRadius: (this.props.highest === this.props.max) ? 10 : 0
    }
  }

  render() {
    return (
        <ListItem avatar onPress={() => this.props.goToCategory(this.props.categoryName)} style={{minHeight:80}}>
          <Left>
            <MaterialInitials
              style={{alignSelf: 'center'}}
              backgroundColor={'rgba(0, 77, 0, 0.6)'}
              color={'white'}
              size={50}
              text={getInitials(this.props.categoryName)}
              single={false}
            />
          </Left>
          <Body>
            <Text>{this.props.categoryDescription}</Text>
            <View style={{flexDirection:'row', marginRight:10}}>
            <Left><Text note>{this.props.numOfAnimals} Tiere</Text></Left>
            <Right><Text note>{this.props.lowest} von {this.props.max} Tagen</Text></Right>
          </View>
            <View style={{height:15, backgroundColor:'#eff0f1', alignSelf: 'stretch', borderRadius:100, marginTop:5, flexDirection:'row', marginRight:10}}>
                <View style={this.getProgressWidthLowest.bind(this, this.props.max, this.props.lowest)()}/>
                <View style={this.getProgressWidthHighest.bind(this, this.props.max, this.props.lowest, this.props.highest)()}/>
              </View>
          </Body>
          {/* <View style={styles.progresWrapper}>
          <View style={this.getProgressWidthLowest.bind(this, this.props.max, this.props.lowest)()}/>
          <View style={this.getProgressWidthHighest.bind(this, this.props.max, this.props.lowest, this.props.highest)()}/>
        </View> */}
      </ListItem>

      /* <View style={styles.wrapper}>
      <View style={styles.categoryName}>
      <Text style={styles.categoryNameText}>
      {this.props.categoryName}
    </Text>
  </View>

  <View style={styles.categoryDetails}>
  <Text style={styles.categoryDetailsTitleText}>
  {shortenText(this.props.categoryDescription)}
</Text>

<View style={{position:'absolute', bottom:5, padding:5}}>
<View style={{flexDirection:'row' }}>
<Text style={styles.numAnimals}>
{this.props.numOfAnimals} Tiere
</Text>
<View style={{flex:1, flexDirection:'row', justifyContent: 'flex-end' , alignItems:'center'}}>
<Text style={styles.numDays}>
{this.props.max} Tage
</Text>
{ this.props.max === this.props.lowest &&
<Icon style={{marginLeft:10, fontSize:28}} name='md-checkmark' />
}
</View>
</View>
<View style={styles.progresWrapper}>
<View style={this.getProgressWidthLowest.bind(this, this.props.max, this.props.lowest)()}/>
<View style={this.getProgressWidthHighest.bind(this, this.props.max, this.props.lowest, this.props.highest)()}/>
</View>
</View>

</View>
</View> */



);
}
}

const styles =  StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'rgba(0, 77, 0, 0.4)',
    height:115,
    marginTop: 1,
    marginBottom: 1,

  },
  wrapper:{
    flexDirection: 'row',
    flex:1
  },
  categoryName:{
    width:80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 77, 0, 0.2)',
  },
  categoryNameText:{
    color: 'white',
    fontSize: 36
  },
  categoryDetails:{
    width: Dimensions.get('window').width - 90,
    padding: 5
  },
  categoryDetailsTitleText:{
    color: 'white',
    fontSize: 24
  },
  numAnimals:{
    paddingTop:5,
    color:'white',
    fontSize:16
  },
  numDays:{
    paddingTop:5,
    color:'white',
    fontSize:16,
    justifyContent: 'flex-end'
  },
  progresWrapper:{
    backgroundColor:'white',
    width:Dimensions.get('window').width - 90,
    height:15,
    marginTop:2,
    borderRadius:10,

  },
});

module.exports = Categories;
