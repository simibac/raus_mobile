'use strict'
import React, { Component } from 'react';

import {Spinner, ListItem, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  StyleSheet,
  Navigator,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import localStore from '../../utilities/localStore'
import api from '../../utilities/api.js'
import Language from '../../utilities/language.json'

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

  goToCategory(selectedCategory){
    console.log(selectedCategory);
  }

  getProgressWidthLowest(max, lowest){
    return {
      backgroundColor: 'rgba(0, 55, 255, 1)',
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
      backgroundColor: 'rgba(0, 55, 255, 0.8)',
      height: 15,
      width: (Dimensions.get('window').width - 104) / max * highest - (Dimensions.get('window').width - 104) / max * lowest,
      borderBottomLeftRadius: (this.props.lowest === 0) ? 10 : 0,
      borderTopLeftRadius: (this.props.lowest === 0) ? 10 : 0,
      borderBottomRightRadius: (this.props.highest === this.props.max) ? 10 : 0,
      borderTopRightRadius: (this.props.highest === this.props.max) ? 10 : 0
    }
  }

  render() {
    console.log(this.props);
    return (
      <TouchableHighlight style={styles.container} onPress={this.goToCategory.bind(this, "selectedCategory")}>
        <View style={styles.wrapper}>
          <View style={styles.categoryName}>
            <Text style={styles.categoryNameText}>
              {this.props.categoryName}
            </Text>
          </View>

          <View style={styles.categoryDetails}>
            <Text style={styles.categoryDetailsTitleText}>
              {this.props.categoryDescription}
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

        </View>
      </TouchableHighlight>
    );
  }
}

const styles =  StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'rgba(0, 77, 0, 0.4)',
    height:115,
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,

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
    width:Dimensions.get('window').width - 94,
    padding:5
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
    width:Dimensions.get('window').width - 104,
    height:15,
    marginTop:2,
    borderRadius:10,
    flexDirection:'row'
  },
});

module.exports = Categories;
