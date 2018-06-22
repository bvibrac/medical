import React, { Component } from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View, Platform} from 'react-native'
import {ExpoConfigView} from '@expo/samples';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'app.json',
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    hidden={false}
                    backgroundColor="#00BCD4"
                    translucent={true}
                    networkActivityIndicatorVisible={true}
                />
                <ScrollView style={styles.container}>
                    <Text style={styles.starttext}>Ceci est un test</Text>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: (Platform.OS == 'ios') ? 20 : 0
    },
    starttext: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    }
});
