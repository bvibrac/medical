import React, { Component } from 'react';

import {
  Alert, Button, StyleSheet, Text, TextInput, View,
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

  ButtonStyle: {
    paddingBottom: 10,
  },

  TextInputStyleClass: {

    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#2196F3',

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
      // const { fctUserEmail } = this.state.UserEmail;
      // const { fctUserPassword } = this.state.UserPassword;


      fetch('https://medical-server-taurhzkfge.now.sh/api/user/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          mail: this.state.UserEmail,

          password: this.state.UserPassword,

        }),

      }).then(response => response.json())
        .then((responseJson) => {
          if (responseJson.success) {
            // Then open Profile activity and send user email to profile activity.
            this.props.navigation.navigate('Second', { Email: this.state.UserEmail });
          } else {
            Alert.alert(responseJson.message);
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

            placeholder="Enter User Email"

            onChangeText={UserEmail => this.setState({ UserEmail })}

            underlineColorAndroid="transparent"

            style={styles.TextInputStyleClass}
          />

          <TextInput

            placeholder="Enter User Password"

            onChangeText={UserPassword => this.setState({ UserPassword })}

            underlineColorAndroid="transparent"

            style={styles.TextInputStyleClass}

            secureTextEntry
          />

          <Button
            title="Click Here To Login"
            onPress={this.UserLoginFunction}
            color="#2196F3"
            style={styles.ButtonStyle}
          />
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
