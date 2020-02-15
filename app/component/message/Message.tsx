import React, {Component} from "react";
import {EmitterSubscription, Keyboard, ScrollView, View} from "react-native";
import styles from "../../../common/style/styles";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import KeyboardSpacer from 'react-native-keyboard-spacer';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Message extends Component<any, any>  {
    private keyboardDidShowListener: EmitterSubscription;
    private keyboardDidHideListener: EmitterSubscription;
    private scrollView: ScrollView;

    constructor(props) {
        super(props);

        let loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac orci augue. Sed fringilla nec magna id hendrerit. Proin posuere, tortor ut dignissim consequat, ante nibh ultrices tellus, in facilisis nunc nibh rutrum nibh.';

        //create a set number of texts with random lengths. Also randomly put them on the right (user) or left (other person).
        let numberOfMessages = 20;

        let messages = [];

        for(let i = 0; i < numberOfMessages; i++) {
            let messageLength = getRandomInt(10, 120);

            let direction = getRandomInt(1, 2) === 1 ? 'right' : 'left';

            let message = loremIpsum.substring(0, messageLength);

            messages.push({
                direction: direction,
                text: message
            })
        }

        this.state = {
            messages: messages,
            inputBarText: ''
        }
    }

    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
    //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
    keyboardDidShow (e) {
        this.scrollView.scrollToEnd();
    }

    //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
    keyboardDidHide (e) {
        this.scrollView.scrollToEnd();
    }

    //scroll to bottom when first showing the view
    componentDidMount() {
        setTimeout(function() {
            this.scrollView.scrollToEnd();
        }.bind(this))
    }

    //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but
    //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
    componentDidUpdate() {
        setTimeout(function() {
            this.scrollView.scrollToEnd();
        }.bind(this))
    }

    _sendMessage() {
        this.state.messages.push({direction: "right", text: this.state.inputBarText});

        this.setState({
            messages: this.state.messages,
            inputBarText: ''
        });
    }

    _onChangeInputBarText(text) {
        this.setState({
            inputBarText: text
        });
    }

    //This event fires way too often.
    //We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
    //We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
    //The real solution here is probably a fork of AutogrowInput that can provide this information.
    _onInputSizeChange() {
        setTimeout(function() {
            this.scrollView.scrollToEnd({animated: false});
        }.bind(this))
    }

    render() {

        let messages = [];

        this.state.messages.forEach(function(message, index) {
            messages.push(
                <MessageBubble key={index} direction={message.direction} text={message.text}/>
            );
        });

        return (
            <View style={styles.outer}>
                <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
                    {messages}
                </ScrollView>
                <InputBar onSendPressed={() => this._sendMessage()}
                          onSizeChange={() => this._onInputSizeChange()}
                          onChangeText={(text) => this._onChangeInputBarText(text)}
                          text={this.state.inputBarText}/>
                <KeyboardSpacer/>
            </View>
        );
    }

}
