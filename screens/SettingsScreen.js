import React from 'react';
import {ScrollView, ToolbarAndroid, StyleSheet, Text, View, Platform} from 'react-native'

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'app.json',
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    { Platform.OS === 'android' ?
                        <ToolbarAndroid
                            style={{
                                height: 24,
                                backgroundColor: "blue",
                                elevation: 4,
                            }}
                        />
                        : null }
                </View>
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
