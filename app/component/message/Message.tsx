import React, {Component} from "react";
import {Text, View} from "react-native";
import styles from "../../../common/style/styles";

export default class Message extends Component<any, any>  {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Message page</Text>
            </View>
        );
    }

}
