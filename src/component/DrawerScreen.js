import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, StyleSheet} from 'react-native';
import { DrawerActions } from 'react-navigation';

class DrawerScreen extends Component {
    constructor(props){
        super(props);
        this.selected_id = 'SetTimer';
    }
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
        this.selected_id = route;
    };

    render () {
        return (
            <View>
                <View>
                    <Text
                        style={
                            this.selected_id==='SetTimer'?
                                styles.selected_text:styles.not_selected_text
                        }
                        onPress={this.navigateToScreen('SetTimer')}>
                        Set Timer
                    </Text>
                </View>
                <View>
                    <Text
                        style={
                            this.selected_id==='MultiExerciseTimer'?
                                styles.selected_text:styles.not_selected_text
                        }
                        onPress={this.navigateToScreen('MultiExerciseTimer')}>
                        Multi Exercise
                    </Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    selected_text: {
        color: 'red',
        fontSize: 30
    },
    not_selected_text: {
        color: 'yellow',
        fontSize: 25
    }
});
export default DrawerScreen;