import React, {Component} from "react";
import {Text, View} from "react-native";
import styles from "../../../common/style/styles";

export default class MessageBubble extends Component<any, any> {
    render() {

        //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
        var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 70}}/>;
        var rightSpacer = this.props.direction === 'left' ? <View style={{width: 70}}/> : null;

        var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

        var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

        return (
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        {leftSpacer}
        <View style={bubbleStyles}>
        <Text style={bubbleTextStyle}>
            {this.props.text}
            </Text>
            </View>
        {rightSpacer}
        </View>
    );
    }
}
