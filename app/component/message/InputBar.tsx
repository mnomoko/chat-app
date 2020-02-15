import React, {Component} from "react";
import styles from "../../../common/style/styles";
import {Text, TouchableHighlight, View} from "react-native";
import AutogrowInput from 'react-native-autogrow-input';

// function getInitialState(nextProps): ContactState {
//     return {
//         autogrowInput: AutogrowInput.resetI
//     }
// }

export default class InputBar extends Component<any, any> {
    private autogrowInput: AutogrowInput;

    //AutogrowInput doesn't change its size when the text is changed from the outside.
    //Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
    //Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
    //was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
    //of the InputBar's text to be set from the outside.
    componentWillReceiveProps(nextProps) {
        if(nextProps.text === '') {
            this.autogrowInput.resetInputText();
        }
    }

    render() {
        return (
            <View style={styles.inputBar}>
                <AutogrowInput style={styles.textBox}
                               ref={(ref) => { this.autogrowInput = ref }}
                               multiline={true}
                               defaultHeight={30}
                               onChangeText={(text) => this.props.onChangeText(text)}
                               onContentSizeChange={this.props.onSizeChange}
                               value={this.props.text}/>
                <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
                    <Text style={{color: 'white'}}>Send</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
