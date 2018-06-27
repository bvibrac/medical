import React from 'react';

import {
  Alert, Button, StyleSheet, Text, TextInput, View,
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

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      UserEmail: '',
      UserPassword: '',

    };
  }

    UserRegistrationFunction = () => {
      // const  fctUserEmail  = this.state.UserEmail;
      // const  fctUserPassword  = this.state.UserPassword;
      const { UserEmail } = this.state;
      const { UserPassword } = this.state;

      fetch('https://medical-server-taurhzkfge.now.sh/api/user/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          mail: UserEmail,

          password: UserPassword,

        }),
      }).then(response => response.json())
        .then((responseJson) => {
          if (responseJson.success) {
            Alert.alert('Successfully created');
            this.props.navigation.goBack();
          } else Alert.alert(responseJson.message);
        }).catch((error) => {
          Alert.alert(error);
        });
    };

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

            placeholder="Enter User Email"

            onChangeText={(UserEmail) => {
              this.setState({ UserEmail });
            }}

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

          <Button title="Click Here To Register" onPress={this.UserRegistrationFunction} color="#2196F3" />


        </View>

      );
    }
}
