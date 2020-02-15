import React, { Component } from 'react';
import { Text, View } from "native-base";
import styles from "../../../common/style/styles";

export default class NewConversation extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        /* TODO
        1/ List concact (chips input)
            - on simple press add selected contact on top bar
        2/ Flat button to run conversation
         */
        return (
            <View style={styles.container}>
                <Text>New conversation</Text>
            </View>
        );
    }

}
