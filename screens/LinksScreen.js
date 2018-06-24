import React from 'react';
import {
  StyleSheet, View, Dimensions, LayoutAnimation, Text, Alert,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { createStackNavigator } from 'react-navigation';
import InfoScreen from './InfoScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      lastScannedUrl: null,
      data: [],

    };
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

    requestCameraPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPermission: status === 'granted',
      });
    };

    handleBarCodeRead = (result) => {
      if (result.data !== this.state.lastScannedUrl) {
        LayoutAnimation.spring();
        let myStr = result.data;
        myStr = myStr.substring(4, 17);
        fetch(`http://192.168.1.47:8000/api/medoc/cip13/${myStr}`, {
          method: 'GET',
        })
          .then(response => response.json())
          .then((responseJson) => {
            this.setState({
              data: responseJson,
            }, function callback() {
              if (this.state.data !== null) {
                this.props.navigation.navigate('Info', { cis: this.state.data.cis });
              } else {
                Alert.alert('No medicament found');
              }
            });
          })
          .catch((error) => {
            // console.error(error);
            Alert.alert(error);
          });
      }
    };


    render() {
      return (
        <View style={styles.container}>
          {this.state.hasCameraPermission === null
            ? (
              <Text>
Requesting for camera permission
              </Text>
            )
            : this.state.hasCameraPermission === false
              ? (
                <Text style={{ color: '#fff' }}>
                            Camera permission is not granted
                </Text>
              )
              : (
                <BarCodeScanner
                  onBarCodeRead={this.handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />
              )}
        </View>
      );
    }
}

export default createStackNavigator({
  Camera: {
    screen: LinksScreen,
    navigationOptions: {
      header: null,
    },
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: {

    },
  },
});
