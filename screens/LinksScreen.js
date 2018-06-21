import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ExpoLinksView} from '@expo/samples';
import {SafeAreaView} from 'react-navigation'

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Camera',
    };

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.container}>
                    {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
                    <view>
                        <text>This is a test</text>
                    </view>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
