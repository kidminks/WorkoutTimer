import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import commonStyle from '../commonStyle';
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';

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

class CountDown extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: this.props.time,
            type: this.props.type
        };
        this.time = convertMS(this.props.time);
        this.bell = new Sound('bell.mp3', Sound.MAIN_BUNDLE);
    }
    componentDidMount(): void {
        const intervalId = BackgroundTimer.setInterval(() => {
            const time = this.state.time-1000;
            this.time = convertMS(this.state.time);
            if(time<1000 && !this.bell.isPlaying()){
                this.bell.play();
            }
            if(time<-1000){
                BackgroundTimer.clearInterval(intervalId);
                this.props.onCompletion(this.state.type);
            }
            this.setState({
                time: time
            });
        }, 1000);
    }

    render () {
        return (
            <View style={commonStyle.main_block}>
                <View style={styles.head}>
                    <Text style={styles.type_text}>{this.state.type}</Text>
                </View>
                <View style={styles.data}>
                    <View style={styles.data_block}>
                        <Text style={styles.small_heading}>hh</Text>
                        <Text style={styles.large_display}>{this.time.hours}</Text>
                    </View>
                    <View style={styles.data_block}>
                        <Text style={styles.small_heading}>mm</Text>
                        <Text style={styles.large_display}>{this.time.minutes}</Text>
                    </View>
                    <View style={styles.data_block}>
                        <Text style={styles.small_heading}>ss</Text>
                        <Text style={styles.large_display}>{this.time.seconds}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    small_heading: {
        fontSize: 15
    },
    large_display: {
        fontSize: 50,
        alignItems: 'center'
    },
    data: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    data_block: {
        flex: 0.3,
        alignItems: 'center',
        alignContent: 'center'
    },
    head: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    type_text: {
        fontSize: 20
    }
});
export default CountDown;