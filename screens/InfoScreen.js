import React, { Component } from 'react';
import {
  ActivityIndicator, StyleSheet, Text, View, Alert,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    paddingTop: 10,
  },
});

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {

      isLoading: true,
      data: [],

    };
  }

  componentDidMount() {
    return fetch(`http://192.168.1.47:8000/api/medoc/cis/${this.props.navigation.getParam('cis')}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson,
          isLoading: false,
        });
      })
      .catch((error) => {
        // console.error(error);
        Alert.alert(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
                    Nom:
          {this.state.data.denomination}
        </Text>
        <Text style={styles.text}>
                    Forme:
          {this.state.data.forme}
        </Text>
        <Text style={styles.text}>
                    Administration:
          {this.state.data.administration}
        </Text>
        <Text style={styles.text}>
                    Prix:
          {this.state.data.prix}
        </Text>
        <Text style={styles.text}>
                    Remboursement:
          {this.state.data.remboursement}
        </Text>
      </View>);
  }
}
