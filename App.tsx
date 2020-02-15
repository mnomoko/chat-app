import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import User from "./app/component/user/User";
import {Font} from "expo/build/globals.web";
import SpinnerComponent from "./common/shared/spinner/spinner.component";
import Signup from "./app/component/user/Signup";
import Home from "./app/component/Home";
import {Container} from "native-base";
import Signin from "./app/component/user/Signin";
import Account from "./common/shared/account/Account";
import { navigationRef } from './common/shared/navigation/RootNavigation';
import Message from "./app/component/message/Message";
import NewContact from "./app/component/user/NewContact";
import NewConversation from "./app/component/conversation/NewConversation";

const HomeStack = createStackNavigator();
const MessagePage = createStackNavigator();
const NewConversationPage = createStackNavigator();
const NewContactPage = createStackNavigator();

export default class App extends Component<any, any>  {

  constructor(props) {
    super(props);

    this.init();
  }

  state = {
    isReady: false,
  };

  render() {
    return (
      this.state.isReady ?
          <Container>
            <NavigationContainer ref={navigationRef}>
              <HomeStack.Navigator
                  screenOptions={{
                    headerShown: false
                  }}>
                <HomeStack.Screen
                  name="Home"
                  component={Home}/>
                <HomeStack.Screen
                  name="Signin"
                  component={Signin}/>
                <HomeStack.Screen
                  name="Signup"
                  component={Signup}/>
                <HomeStack.Screen
                  name="User"
                  component={User}/>
                <HomeStack.Screen
                  name="Account"
                  component={Account}/>
                <HomeStack.Screen
                  name="Message"
                  component={this.getMessagePage}/>
                <HomeStack.Screen
                  name="Newconversation"
                  component={this.getNewConversationPage}/>
                <HomeStack.Screen
                  name="Newcontact"
                  component={this.getNewContactPage}/>
              </HomeStack.Navigator>
            </NavigationContainer>
          </Container>
          : <SpinnerComponent/>
    );
  };

  getMessagePage() {
    return(
        <MessagePage.Navigator>
          <MessagePage.Screen
              name="Message"
              component={Message}
              initialParams={{conversations: ['hello', 'world'] }} //TODO use conversations stored in state
              options={{
                headerRight: () => <Account/>
              }}/>
        </MessagePage.Navigator>
    );
  }

  getNewConversationPage() {
    return(
        <NewConversationPage.Navigator>
          <NewConversationPage.Screen
              name="New conversation"
              component={NewConversation}
              initialParams={{conversations: ['hello', 'world'] }} //TODO use conversations stored in state
              />
        </NewConversationPage.Navigator>
    );
  }

  getNewContactPage() {
    return(
        <NewContactPage.Navigator>
          <NewContactPage.Screen
              name="New contact"
              component={NewContact}
              initialParams={{conversations: ['hello', 'world'] }} //TODO use conversations stored in state
              />
        </NewContactPage.Navigator>
    );
  }

  async init() {
    await Font.loadAsync({
      MaterialIcons: require("native-base/Fonts/MaterialIcons.ttf"),
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({isReady: true});
  }
}
