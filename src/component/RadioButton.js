import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

const DEFAULT_SIZE_MULTIPLIER = 0.7;
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2;

export default class RadioButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected: props.button_state
        }
    }
    static defaultProps = {
        size: 15,
        innerColor: 'dodgerblue',
        outerColor: 'dodgerblue'
    };
    toggleButton(){
        this.setState({
            isSelected: !this.state.isSelected
        });
        this.props.onButtonClicked(!this.state.isSelected);
    };
    render () {
        const { size, innerColor, outerColor} = this.props;
        const outerStyle = {
            borderColor: outerColor,
            width: size + size * DEFAULT_SIZE_MULTIPLIER,
            height: size + size * DEFAULT_SIZE_MULTIPLIER,
            borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
            borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER
        };

        const innerStyle = {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: innerColor
        };

        return (
            <TouchableOpacity
                style={[styles.radio, outerStyle]}
                onPress={() => this.toggleButton()}>
                {this.state.isSelected ?
                    <View style={innerStyle} {...this.props} /> : null}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    radio: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }
});