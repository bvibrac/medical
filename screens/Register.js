import React, { Component } from 'react';

import {
  StyleSheet, TextInput, View, Alert, Button, Text,
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
    borderColor: '#2196F3',
    borderRadius: 5,
  },
});

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {

      UserEmail: '',
      UserPassword: '',

    };
  }

  UserRegistrationFunction() {
    const mail = this.state.UserEmail;
    const pass = this.state.UserPassword;

    fetch('http://192.168.1.47:8000/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({

        email: mail.toString(),

        password: pass.toString(),

      }),

    }).then(response => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      }).catch((error) => {
        Alert.alert(error);
      });
  }

  render() {
    return (

      <View style={styles.MainContainer}>

        <Text style={{
          fontSize: 20, color: '#000', textAlign: 'center', marginBottom: 15,
        }}
        >
User Registration Form
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

        <Button title="Click Here To Register" onPress={this.UserRegistrationFunction} color="#2196F3" />


      </View>

    );
  }
}
