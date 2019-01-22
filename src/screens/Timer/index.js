import React,{Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import CountDown from '../../component/CountDown';
import commonStyle from '../../commonStyle';
import BackgroundTimer from 'react-native-background-timer';

function getMillisecond(time) {
    const t = (time.hours*60*60 + time.minutes*60 + time.seconds)*1000;
    console.log(t);
    return t;
}

class Timer extends Component{
    constructor(props){
        super(props);
        const {navigation} = this.props;
        this.exercise_time = navigation.getParam('exercise_time');
        this.rest_time = navigation.getParam('rest_time');
        let type = '', time = 0;
        if(navigation.getParam('is_warm_up')){
            type = 'Warm Up';
            time = getMillisecond(navigation.getParam('time'));
        }else{
            type = 'Exercise';
            time = getMillisecond(this.exercise_time);
        }
        this.state = {
            sets: navigation.getParam('sets'),
            time: time,
            type: type,
            change: false
        };
        this.onCompletionHandler = this.onCompletionHandler.bind(this);
    }

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        const {navigation} = nextProps;
        console.log(navigation.getParam('sets'));
        this.exercise_time = navigation.getParam('exercise_time');
        this.rest_time = navigation.getParam('rest_time');
        let type = '', time = 0;
        if(navigation.getParam('is_warm_up')){
            type = 'Warm Up';
            time = 5000;
        }else{
            type = 'Exercise';
            time = getMillisecond(this.exercise_time);
        }
        this.setState({
            sets: navigation.getParam('sets'),
            time: time,
            type: type,
            change: false
        });
    }

    onCompletionHandler(type){
        let time = 0, set = this.state.sets;
        if(type==='Warm Up'){
            type = 'Exercise';
            time = getMillisecond(this.exercise_time);
        }else if(type==='Exercise'){
            type = 'Rest';
            time = getMillisecond(this.rest_time);
        }else if(type==='Rest'){
            type = 'Exercise';
            time = getMillisecond(this.exercise_time);
            set = set-1;
        }
        if(set===0){
            type = 'End';
        }
        this.setState({
            sets: set,
            change: true,
            type: type
        }, () => {
            BackgroundTimer.setTimeout(() => {
                console.log(type!=='End');
                if(type!=='End') {
                    this.setState({
                        sets: set,
                        time: time,
                        type: type,
                        change: false
                    })
                }
            }, 100);
        });
    }
    render(){
        return(
            <View style={[commonStyle.main_block,{
                justifyContent: 'flex-start'
            }]}>
                <View style={styles.inner_block}>
                    <Text style={styles.small_heading}>Sets Left</Text>
                    <Text style={styles.large_display}>{this.state.sets}</Text>
                </View>
                {this.state.change ? null :
                    <View style={styles.inner_block}>
                        <CountDown
                            time={this.state.time}
                            type={this.state.type}
                            onCompletion={this.onCompletionHandler}/>
                    </View>
                    }
                {this.state.type!=='End' ? null :
                    <View style={styles.inner_block}>
                        <Text style={styles.small_heading}>Exercise Completed</Text>
                        <Button title='Return Back'
                                onPress={() => this.props.navigation.goBack()}/>
                    </View>
                    }
            </View>
        );
    };
}
const styles = StyleSheet.create({
    inner_block: {
        flex: 0.3,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    small_heading: {
        fontSize: 15,
        marginBottom: 10
    },
    large_display: {
        fontSize: 50
    }
});
export default Timer;