import React from 'react';
import {ScrollView, StyleSheet, ToolbarAndroid, Platform, View} from 'react-native';

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Camera',
    };


    render() {
        return (
            <ScrollView style={styles.container}>
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
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
