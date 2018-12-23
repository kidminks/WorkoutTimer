import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import { DrawerActions } from 'react-navigation';

class DrawerScreen extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    };

    render () {
        return (
            <View>
                <ScrollView>
                    <View>
                        <View>
                            <Text onPress={this.navigateToScreen('SetTimer')}>
                                Set Timer
                            </Text>
                        </View>
                        <View>
                            <Text onPress={this.navigateToScreen('MultiExerciseTimer')}>
                                Multi Exercise
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default DrawerScreen;