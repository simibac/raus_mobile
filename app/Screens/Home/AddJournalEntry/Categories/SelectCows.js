'use strict'
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

class SelectCows extends Component {
  openCategory(){
    console.log("hi");
  }

  render() {
    return (
        <Container >
          <TouchableHighlight style={styles.category} onPress={this.openCategory.bind(this)}>
            <View style={styles.container2}>
              <Text style={styles.title}>
                A2
              </Text>
            </View>
          </TouchableHighlight>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    backgroundColor: 'white',
  }
});

module.exports = SelectCows;
