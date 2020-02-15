import React, {Component} from "react";
import {Button, Container, Header, Content, Form, Item, Input, Text, Label, View, Footer} from 'native-base';
import SpinnerComponent from "../../../common/shared/spinner/spinner.component";
import {User as UserModel} from "../../../common/model/User";
import {getCookie, handleError} from "../../../common/util";
import {AsyncStorage} from "react-native";

type SigninState = {
    username: string,
    password: string,
    isReady: boolean,
    isFormValid: boolean
};

function getInitialState(): SigninState {
    return {
        username: '',
        password: '',
        isReady: true,
        isFormValid: false
    }
}

export default class Signin extends Component<any, SigninState>  {

    constructor(props) {
        super(props);
        this.state = getInitialState();

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewAccount = this.handleNewAccount.bind(this);
    }

    async storeUser(id) {
        await AsyncStorage.setItem('user_id', id);
    };

    handleChangeUsername(text) {
        this.isFieldNameValid('username');
        this.setState({username: text});
    }

    handleChangePassword(text) {
        this.isFieldNameValid('password');
        this.setState({password: text});
    }

    handleSubmit() {
        let signinState: SigninState = this.state;
        const user: UserModel = {
            username: signinState.username,
            password: signinState.password
        };
        const json = JSON.stringify(user);

        this.setState({isReady: false});
        fetch('http://192.168.1.82:8000/api/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: json
        })
            .then(res => {
                const cookie = getCookie(res.headers.get('set-cookie'), 'user_id');
                this.storeUser(cookie).then(() => {
                    this.props.navigation.navigate('User');
                    this.setState({isReady: true});
                });
            })
            .catch(err => {
                this.setState({isReady: true});
                return handleError(err);
            });
    }

    handleNewAccount() {
        const { navigation } = this.props;
        navigation.navigate('Signup');
    }

    render() {
        let signinState: SigninState = this.state;
        if(null != signinState && null != signinState.isReady && signinState.isReady) {
            return (
                <Container>
                    <Header/>
                    <Content padder>
                        <Form>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input onChangeText={this.handleChangeUsername}/>
                            </Item>
                            <Item floatingLabel last>
                                <Label>Password</Label>
                                <Input secureTextEntry onChangeText={this.handleChangePassword}/>
                            </Item>
                        </Form>
                        <Button block success onPress={() => this.handleSubmit()}>
                            <Text>Sign in</Text>
                        </Button>
                    </Content>
                    <Footer>
                        <View>
                            <Button disabled={this.state.isFormValid} onPress={() => this.handleNewAccount()}>
                                <Text>Create an account</Text>
                            </Button>
                        </View>
                    </Footer>
                </Container>
            );
        } else
            return <SpinnerComponent/>;
    }

    isStateValid() {
        return null != this.state;
    }

    isFieldNameValid(field) {
        const isFieldNameEmpty = (field) => null != this.state[field] && this.state[field].length > 0;
        this.setState({
            isFormValid: this.isStateValid() && isFieldNameEmpty(field)
        });
    }

}
