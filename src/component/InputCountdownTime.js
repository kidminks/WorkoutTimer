import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import commonStyle from '../commonStyle';

class InputCountdownTime extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <View style={[commonStyle.main_block,
                {
                    flexDirection: 'row'
                }]}>
                <View style={styles.inner_block}>
                    <Text>HH</Text>
                    <NumericInput
                        onChange={value => this.props.onUpdate(value,'hours')}
                        type='up-down'
                        minValue={0}
                        rounded
                        iconSize={15}/>
                </View>
                <View style={styles.inner_block}>
                    <Text>MM</Text>
                    <NumericInput
                        onChange={value => this.props.onUpdate(value,'minutes')}
                        type='up-down'
                        minValue={0}
                        maxValue={59}
                        rounded
                        iconSize={15}/>
                </View>
                <View style={styles.inner_block}>
                    <Text>SS</Text>
                    <NumericInput
                        onChange={value => this.props.onUpdate(value,'seconds')}
                        type='up-down'
                        minValue={0}
                        maxValue={59}
                        rounded
                        iconSize={10}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    inner_block: {
        flex: 0.3,
        margin: 4,
        height: '100%',
        alignItems: 'center'
    }
});
export default InputCountdownTime;