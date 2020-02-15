import React, {Component} from "react";
import {Text, View} from "react-native";
import styles from "../../../common/style/styles";

export default class Params extends Component  {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Params page</Text>
            </View>
        );
    }

}
