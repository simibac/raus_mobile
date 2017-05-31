'use strict'
import React, { Component } from 'react';

import {CheckBox, Spinner, ListItem, Grid, Col, Card, CardItem, Subtitle, Icon, Button, Header, Left, Right, Body, Title, Container, Content, InputGroup, Input } from 'native-base';
import {
  Text,
  StyleSheet,
  Navigator,
  View,
} from 'react-native';

import getTheme from '../../../native-base-theme/components';
import platform from '../../../native-base-theme/variables/platform';
import localStore from '../../utilities/localStore'
import api from '../../utilities/api.js'
import Language from '../../utilities/language.json'

function getName(name, tvd){
  if (name != ""){
    return name
  }
  else{
    return tvd
  }
}

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      ready:false
    }
  }
  // componentWillMount(){
  //   //get Kategories from api
  //   localStore.getToken().then((res)=>{
  //     this.setState({token:res})
  //     api.getCowsByCategory(res).then((res) => {
  //       this.setState({categories:res.categories})
  //       this.setState({ready:true})
  //     });
  //   })
  // }

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

  render() {
    var added = new Date(this.props.added);
    return(
      <ListItem>
        {this.props.editing &&
          <CheckBox checked={this.props.selected} onPress={() => this.props.selectCow(this.props.tvd)} />}
          <Body>
            <Text>  {getName(this.props.name, this.props.tvd)}</Text>
            <Text style={styles.addedText}>  Hinzugefügt: {this.props.added.slice(0,10)}</Text>
          </Body>
        </ListItem>)
      }
    }

    const styles = StyleSheet.create({
      wrapper: {
        flex:1,
        backgroundColor: 'white',
      },
      textAdded:{
        color:'rgb(128, 128, 128)',
        fontStyle:'italic',
      },
      addedText:{
        color:'rgb(128, 128, 128)',
        fontStyle:'italic'
      }
    });

    module.exports = Categories;
