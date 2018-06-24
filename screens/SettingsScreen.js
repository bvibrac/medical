import React, { Component } from 'react';

import {
  StyleSheet, TextInput, View, Alert, Button, Text,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import RegisterScreen from './Register';

import ProfileScreen from './ProfileScreen';

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

class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {

      UserEmail: '',
      UserPassword: '',

    };
  }

    UserRegister = () => {
      this.props.navigation.navigate('Third');
    };

    UserLoginFunction = () => {
      const { UserEmail } = this.state;
      const { UserPassword } = this.state;


      fetch('http://192.168.1.47:8000/api/user/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          email: UserEmail,

          password: UserPassword,

        }),

      }).then(response => response.json())
        .then((responseJson) => {
          // If server response message same as Data Matched
          if (responseJson === 'Data Matched') {
            // Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Second', { Email: UserEmail });
          } else {
            Alert.alert(responseJson);
          }
        }).catch((error) => {
          Alert.alert(error);
        });
    };

    render() {
      return (

        <View style={styles.MainContainer}>
          <Text style={styles.TextComponentStyle}>
User Login Form
          </Text>

          <TextInput

                    // Adding hint in Text Input using Place holder.
            placeholder="Enter User Email"

            onChangeText={UserEmail => this.setState({ UserEmail })}

                    // Making the Under line Transparent.
            underlineColorAndroid="transparent"

            style={styles.TextInputStyleClass}
          />

          <TextInput

                    // Adding hint in Text Input using Place holder.
            placeholder="Enter User Password"

            onChangeText={UserPassword => this.setState({ UserPassword })}

                    // Making the Under line Transparent.
            underlineColorAndroid="transparent"

            style={styles.TextInputStyleClass}

            secureTextEntry
          />

          <Button title="Click Here To Login" onPress={this.UserLoginFunction} color="#2196F3" />
          <Button title="Register" onPress={this.UserRegister} />
        </View>

      );
    }
}

export default createStackNavigator(
  {
    First: { screen: SettingsScreen },

    Second: { screen: ProfileScreen },

    Third: { screen: RegisterScreen },

  },
);
