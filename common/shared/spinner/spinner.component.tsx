import React, { Component } from 'react';
import { ActivityIndicator, View } from "react-native";
import styles from "../../style/styles";

export default class SpinnerComponent extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

}
