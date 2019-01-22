/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
    createDrawerNavigator,
    createStackNavigator,
    DrawerActions,
    createAppContainer
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputValue from './src/screens/InputValue';
import DrawerScreen from './src/component/DrawerScreen';
import Timer from './src/screens/Timer';
import Settings from './src/screens/SetWarmUp';

const RouteConfigs = {
    InputValue: {screen: InputValue},
    Setting: {screen: Settings},
    Timer: {screen: Timer}
};
const DrawerNavigatorConfig = {
    drawerType: 'slide',
    drawerPosition: 'right',
    initialRouteName: 'InputValue',
    contentComponent: DrawerScreen
};
const DrawerNavigator = createDrawerNavigator(RouteConfigs,DrawerNavigatorConfig);
const StackNavigator = createStackNavigator({
    DrawerNavigator: {
        screen: DrawerNavigator
    }
},{
    defaultNavigationOptions: ({navigation}) => ({
        headerRight:
            <TouchableOpacity  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
                <Icon
                    style={{margin: 10}}
                    size={30}
                    name={!navigation.state.isDrawerOpen?"dedent":"close"}/>
            </TouchableOpacity>,
        headerLeft:
            <TouchableOpacity>
            </TouchableOpacity>,
        headerTitle: "Timer",
        headerTitleStyle: {
            textAlign:"center",
            flex:1
        }
    })
});
const AppContainer = createAppContainer(StackNavigator);
export default  AppContainer;