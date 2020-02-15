import React, {Component} from 'react';
import {AsyncStorage, Text} from "react-native";
import {Button, Icon} from "native-base";
import * as RootNavigation from '../navigation/RootNavigation.js';

export default class Account extends Component<any, any> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button style={{marginRight: 10}} rounded block light onPress={() => { logout() }}>
                <Icon style={{marginLeft: 12, marginRight: 12}} name="ios-log-out" />
            </Button>
        );
    }
}

const logout = () => {
    fetch('http://192.168.1.82:8000/api/logout')
        .then(() =>  {
            deleteStoredUser().then(() => {
                console.log('should go to Home');
                RootNavigation.navigate('Signin', {});
            });
        });
};

const deleteStoredUser = async () => {
    const value = await AsyncStorage.getItem('user_id');
    if(null != value) {
        await AsyncStorage.removeItem('user_id');
    }
};
