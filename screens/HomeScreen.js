import React, {Component} from 'react';
import {ActivityIndicator, ListView, Platform, StyleSheet, Text, TextInput, ToolbarAndroid, View} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import InfoScreen from "./InfoScreen";

class HomeScreen extends Component {

    GetListViewItem = (id) => {
        this.props.navigation.navigate('Info', {cis: id});
    };
    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    constructor(props) {

        super(props);

        this.state = {

            isLoading: true,
            text: '',

        }

        this.arrayholder = [];
    }

    componentDidMount() {

        return fetch('http://192.168.1.47:8000/api/medoc', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {

                    // In this block you can do something with new state.
                    this.arrayholder = responseJson;

                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    SearchFilterFunction(text) {

        const newData = this.arrayholder.filter(function (item) {
            const itemData = item.denomination.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>
                <View>
                    {Platform.OS === 'android' ?
                        <ToolbarAndroid
                            style={{
                                height: 24,
                                backgroundColor: "blue",
                                elevation: 4,
                            }}
                        />
                        : null}
                </View>

                <TextInput
                    style={styles.TextInputStyleClass}
                    onChangeText={(text) => this.SearchFilterFunction(text)}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                    placeholder="Search Here"
                />

                <ListView

                    dataSource={this.state.dataSource}

                    renderSeparator={this.ListViewItemSeparator}

                    renderRow={(rowData) => <Text style={styles.rowViewContainer}

                                                  onPress={this.GetListViewItem.bind(this, rowData.cis)}>{rowData.denomination}</Text>}

                    enableEmptySections={true}

                    style={{marginTop: 10}}

                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    rowViewContainer: {
        fontSize: 17,
        padding: 10
    },
    TextInputStyleClass: {
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF"
    },
});

export default createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        },
    },
    Info: {
        screen: InfoScreen,
        navigationOptions: {

        }
    },
})