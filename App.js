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
import SetTimer from './src/screens/SetTimer';
import  MultiExerciseTimer from './src/screens/MultiExerciseTimer';
import DrawerScreen from './src/component/DrawerScreen';

const RouteConfigs = {
    SetTimer: {screen: SetTimer},
    MultiExerciseTimer: {screen: MultiExerciseTimer}
};
const DrawerNavigatorConfig = {
    drawerType: 'slide',
    drawerPosition: 'right',
    initialRouteName: 'SetTimer',
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