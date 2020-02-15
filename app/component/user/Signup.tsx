import React, {Component} from "react";
import {Button, Container, Header, Content, Form, Item, Input, Text, Label} from 'native-base';
import {User as UserModel} from "../../../common/model/User";
import SpinnerComponent from "../../../common/shared/spinner/spinner.component";
import {handleError} from "../../../common/util";

type SignupState = {
    username: string,
    password: string,
    isReady: boolean
};

function getInitialState(): SignupState {
    return {
        username: '',
        password: '',
        isReady: true
    }
}

export default class Signup extends Component<any, SignupState>  {

    constructor(props) {
        super(props);
        this.state = getInitialState();

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(text) {
        this.setState({username: text});
    }

    handleChangePassword(text) {
        this.setState({password: text});
    }

    handleSubmit() {
        let signupState: SignupState = this.state;
        const user: UserModel = {
            username: signupState.username,
            password: signupState.password
        };
        const json = JSON.stringify(user);

        this.setState({isReady: false});
        fetch('http://192.168.1.82:8000/api/signup', {
            method: 'post',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: json
        })
            .then(res => {
                this.setState({isReady: true});
                alert(JSON.stringify(res));

                this.props.navigation.goBack();
            })
            .catch(err => {
                this.setState({isReady: true});
                return handleError(err);
            });
    }

    render() {
        const signupState: SignupState = this.state;
        if(null != signupState && null != signupState.isReady && signupState.isReady) {
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
                            <Text>Sign up</Text>
                        </Button>
                    </Content>
                </Container>
            );
        } else
            return <SpinnerComponent/>;
    }

}
