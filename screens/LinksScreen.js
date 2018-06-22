import React from 'react';
import {ScrollView, StyleSheet, StatusBar} from 'react-native';

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Camera',
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar
                    barStyle = "light-content"
                    hidden = {false}
                    backgroundColor = "#00BCD4"
                    translucent = {true}
                    networkActivityIndicatorVisible = {true}
                />
                {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
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
