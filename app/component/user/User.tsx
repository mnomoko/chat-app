import React, {Component} from "react";
import {AsyncStorage, Text, View} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Conversation from "../conversation/Conversation";
import Contact from "./Contact";
import Account from "../../../common/shared/account/Account";
import {createStackNavigator} from "@react-navigation/stack";
import {Button, Icon} from "native-base";
import Message from "../message/Message";

const Tab = createBottomTabNavigator();

const ConversationTab = createStackNavigator();
const ContactTab = createStackNavigator();
const ConversationTab2 = createStackNavigator();

export default class User extends Component<any, any>  {

    constructor(props) {
        super(props);

        this.getConversations = this.getConversations.bind(this);
    }

    getUserData() {
        //TODO get conversations
        //TODO get contacts
    }

    getConversations = (): string[] => {
        // TODO set state conversations
        return ['hello', 'world'];
    };

    getConversationTab() {
        return(
            <ConversationTab.Navigator>
                <ConversationTab.Screen
                    name="Conversation"
                    component={Conversation}
                    initialParams={{conversations: ['hello', 'world'] }} //TODO use conversations stored in state
                    options={{
                        headerRight: () => <Account/>
                    }}/>
            </ConversationTab.Navigator>
        );
    }

    getConversationTab2() {
        return(
            <ContactTab.Navigator>
                <ContactTab.Screen
                    name="New Message"
                    component={Message}
                    options={{
                        headerRight: () => <Account/>
                    }}/>
            </ContactTab.Navigator>
        );
    }

    getContact() {
        return(
            <ConversationTab2.Navigator>
                <ConversationTab2.Screen
                    name="Contact"
                    component={Contact}
                    options={{
                        headerRight: () => <Account/>
                    }}/>
            </ConversationTab2.Navigator>
        );
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Conversation"
                    component={this.getConversationTab}
                    options={{
                        tabBarIcon: () => <Icon name="ios-chatboxes" />,
                    }}
                />
                <Tab.Screen
                    name="new"
                    component={this.getConversationTab2}
                    options={{
                        tabBarIcon: () => <Icon name="ios-add-circle-outline" />,
                    }}
                />
                <Tab.Screen
                    name="Contact"
                    component={this.getContact}
                    options={{
                        tabBarIcon: () => <Icon name="ios-contacts" />,
                    }}
                />
            </Tab.Navigator>
        );
    }

}
