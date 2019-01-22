import React,{Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Timer from '../../component/InputCountdownTime';
import commonStyle from '../../commonStyle';
import { AsyncStorage } from "react-native"

function getMillisecond(time) {
    const t = (time.hours*60*60 + time.minutes*60 + time.seconds)*1000;
    return t;
}
async function storeData(time){
    try {
        await AsyncStorage.setItem('w_time', ""+getMillisecond(time));
    } catch (error) {
        console.log(error);
    }
}

function convertMS( milliseconds ) {
    let hours, minutes, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

class SetWarmUp extends Component{
    constructor(props){
        super(props);
        this.warm_up_time = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        this.set_time = this.set_time.bind(this);
        this.update_warm_up_time = this.update_warm_up_time.bind(this);
    }
    update_warm_up_time(value,index){
        this.warm_up_time[index] = value;
    }
    set_time(){
        storeData(this.warm_up_time).then(value => {
            this.props.navigation.navigate(
                'InputValue'
            );
        });
    }
    render(){
        return(
            <View style={commonStyle.main_block}>
                <View style={styles.inner_block}>
                    <Text>Set WarmUp Time</Text>
                    <Timer onUpdate={this.update_warm_up_time}/>
                </View>
                <View style={styles.inner_block}>
                    <Button title={'Set Time'} onPress={this.set_time}/>
                </View>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    inner_block: {
        flex: 0.20,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    warm_up_block: {
        flexDirection: 'row',
        flex: 0.08,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 10
    },
    radio_block_button: {
        flex: 0.20,
        height: '100%'
    },
    radio_block_text: {
        flex: 0.70,
        height: '100%'
    }
});
export default SetWarmUp;