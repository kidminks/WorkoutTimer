import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class SetTimer extends Component{
    static navigationOptions = {
        headerTitle: 'Set Timer'
    };
    render(){
        return(
            <View>
                <Text>Set Screen</Text>
            </View>
        );
    };
}
export default SetTimer;