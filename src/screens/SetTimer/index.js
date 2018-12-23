import React,{Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import RadioButton from '../../component/RadioButton';
import commonStyle from '../../commonStyle';

class SetTimer extends Component{
    constructor(props){
        super(props);
        this.warm_up = true;
        this.sets_value = 0;
        this.update_warn_up = this.update_warn_up.bind(this);
    }
    update_warn_up(radio_value){
        this.warm_up = radio_value;
        console.log(this.warm_up);
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
                                <Text style={{fontSize: 15}}>Want to do warm-up for x time</Text>
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
                </View>
                <View style={styles.inner_block}>
                </View>
            </View>
        );
    };
}
const styles = StyleSheet.create({
    inner_block: {
        backgroundColor: 'yellow',
        flex: 0.15,
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    warm_up_block: {
        flexDirection: 'row',
        backgroundColor: 'yellow',
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