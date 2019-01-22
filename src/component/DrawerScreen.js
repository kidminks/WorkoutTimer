import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {Text, View, StyleSheet} from 'react-native';
import { DrawerActions } from 'react-navigation';

class DrawerScreen extends Component {
    constructor(props){
        super(props);
        this.selected_id = 'InputValue';
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
                            this.selected_id==='InputValue'?
                                styles.selected_text:styles.not_selected_text
                        }
                        onPress={this.navigateToScreen('InputValue')}>
                        Set Timer
                    </Text>
                </View>
                <View>
                    <Text
                        style={
                            this.selected_id==='Setting'?
                                styles.selected_text:styles.not_selected_text
                        }
                        onPress={this.navigateToScreen('Setting')}>
                        Set Warm-Up
                    </Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    selected_text: {
        fontSize: 30
    },
    not_selected_text: {
        fontSize: 25
    }
});
export default DrawerScreen;