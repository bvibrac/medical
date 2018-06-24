import React, { Component } from 'react';

import {
  View, Button, Text, Platform, ToolbarAndroid, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({


  MainContainer: {

    justifyContent: 'center',
    flex: 1,
    margin: 10,
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    // Set border Hex Color Code Here.
    borderColor: '#2196F3',

    // Set border Radius.
    borderRadius: 5,

  },

  TextComponentStyle: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default class ProfileScreen extends Component {
    // Setting up profile activity title.
    static navigationOptions =
        {
          title: 'ProfileActivity',

        };


    render() {
      const { goBack } = this.props.navigation;

      return (
        <View style={styles.MainContainer}>
          { Platform.OS === 'android'
            ? (
              <ToolbarAndroid
                style={{
                  height: 24,
                  backgroundColor: 'blue',
                  elevation: 4,
                }}
              />
            )
            : null }

          <Text style={styles.TextComponentStyle}>
            {' '}
            {this.props.navigation.state.params.Email}
            {' '}
          </Text>

          <Button title="Click here to Logout" onPress={() => goBack(null)} />

        </View>
      );
    }
}
