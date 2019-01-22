import React,{Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NumericInput from 'react-native-numeric-input';
import RadioButton from '../../component/RadioButton';
import Timer from '../../component/InputCountdownTime';
import commonStyle from '../../commonStyle';
import { AsyncStorage } from "react-native"

async function storeData(){
    try {
        await AsyncStorage.setItem('w_time', ""+300000);
    } catch (error) {
        console.log(error);
    }
}
async function retrieveData() {
    try {
        const value = await AsyncStorage.getItem('w_time');
        if (value !== null) {
            return value;
        }else{
            await storeData();
            return 300000;
        }
    } catch (error) {
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

class SetTimer extends Component{
    constructor(props){
        super(props);
        this.warm_up = true;
        this.sets_value = 0;
        this.rest_time = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        this.exercise_time = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        this.state = {
            temp: false
        };
        this.update_warn_up = this.update_warn_up.bind(this);
        this.update_exercise_time = this.update_exercise_time.bind(this);
        this.update_rest_time = this.update_rest_time.bind(this);
        this.run_timer = this.run_timer.bind(this);
        this.warm_up_time = {};
        retrieveData().then(value => {
            this.warm_up_time = convertMS(parseInt(value));
            this.setState({
                temp: !this.state.temp
            });
        })

    }
    update_warn_up(radio_value){
        this.warm_up = radio_value;
    }
    update_exercise_time(value,index){
        this.exercise_time[index] = value;
    }
    update_rest_time(value,index){
        this.rest_time[index] = value;
    }
    run_timer(){
        this.props.navigation.navigate(
            'Timer',
            {
                exercise_time: this.exercise_time,
                rest_time: this.rest_time,
                sets: this.sets_value,
                is_warm_up: this.warm_up,
                time: this.warm_up_time
            }
        );
        this.sets_value = 0;
        this.rest_time = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        this.exercise_time = {
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
        const t = !this.state.temp;
        this.setState({
            temp: t
        })
    }
    render(){
        return(
            <View style={commonStyle.main_block}>
                <View style={styles.warm_up_block}>
                        <View style={styles.radio_block_button}>
                            <RadioButton
                                animation={'bounceIn'}
                                button_state={this.warm_up}
                                onButtonClicked={this.update_warn_up}/>
                        </View>
                        <View style={styles.radio_block_text}>
                                <Text style={{fontSize: 15}}>
                                    Want to do warm-up for stored time
                                </Text>
                        </View>
                </View>
                <View style={styles.inner_block}>
                    <Text>Sets</Text>
                    <NumericInput
                        minValue={0}
                        rounded={true}
                        onChange={value => this.sets_value = value}/>
                </View>
                <View style={styles.inner_block}>
                    <Text>Exercise Time</Text>
                    <Timer onUpdate={this.update_exercise_time}/>
                </View>
                <View style={styles.inner_block}>
                    <Text>Rest Time</Text>
                    <Timer onUpdate={this.update_rest_time}/>
                </View>
                <View style={styles.inner_block}>
                    <Button title={'Run Timer'} onPress={this.run_timer}/>
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
export default SetTimer;