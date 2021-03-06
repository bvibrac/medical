import * as React from 'react';
import {
  Animated, View, Text, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  TabView, TabBar, SceneMap, type Route, type NavigationState,
} from 'react-native-tab-view';
import Home from '../screens/HomeScreen';
import Camera from '../screens/LinksScreen';
import Settings from '../screens/SettingsScreen';

type State = NavigationState<Route<{
    key: string,
    icon: string,
    color: string,
}>>;

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#263238',
    overflow: 'hidden',
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  indicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0084ff',
    margin: 6,
  },
  badge: {
    marginTop: 4,
    marginRight: 32,
    backgroundColor: '#f44336',
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
});


export default class BottomBar extends React.Component<*, State> {
    static title = 'Custom indicator';

    static backgroundColor = '#263238';

    static appbarElevation = 4;

    state = {
      index: 0,
      routes: [
        {
          key: 'home',
          icon: 'ios-home',
          color: '#F44336',
        },
        {
          key: 'camera',
          icon: 'ios-camera',
          color: '#3F51B5',
        },
        {
          key: 'settings',
          icon: 'ios-settings',
          color: '#4CAF50',
        },
      ],
    };

    handleIndexChange = index => this.setState({
      index,
    });

    renderIndicator = (props) => {
      const { width, position } = props;
      const inputRange = [
        0,
        0.48,
        0.49,
        0.51,
        0.52,
        1,
        1.48,
        1.49,
        1.51,
        1.52,
        2,
      ];

      const scale = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
      });
      const opacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map((x) => {
          const d = x - Math.trunc(x);
          return d === 0.49 || d === 0.51 ? 0 : 1;
        }),
      });
      const translateX = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => Math.round(x) * width),
      });
      const backgroundColor = position.interpolate({
        inputRange,
        outputRange: inputRange.map(
          x => props.navigationState.routes[Math.round(x)].color,
        ),
      });

      return (
        <Animated.View
          style={[styles.container, { width, transform: [{ translateX }] }]}
        >
          <Animated.View
            style={[
              styles.indicator,
              { backgroundColor, opacity, transform: [{ scale }] },
            ]}
          />
        </Animated.View>
      );
    };

    renderIcon = ({ route }) => (
      <Ionicons name={route.icon} size={24} style={styles.icon} />
    );

    renderBadge = ({ route }) => {
      if (route.key === '2') {
        return (
          <View style={styles.badge}>
            <Text style={styles.count}>
                        42
            </Text>
          </View>
        );
      }
      return null;
    };


    renderTabBar = props => (
      <TabBar
        {...props}
        renderIcon={this.renderIcon}
        renderBadge={this.renderBadge}
        renderIndicator={this.renderIndicator}
        style={styles.tabbar}
      />
    );

    renderScene = SceneMap({
      home: Home,
      camera: Camera,
      settings: Settings,
    });

    render() {
      return (
        <TabView
          style={this.props.style}
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          tabBarPosition="bottom"
          onIndexChange={this.handleIndexChange}
        />
      );
    }
}
