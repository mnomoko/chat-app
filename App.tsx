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

const HomeStack = createStackNavigator();
const MessagePage = createStackNavigator();

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
