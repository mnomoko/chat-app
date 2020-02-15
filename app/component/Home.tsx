import React, {Component} from "react";
import SpinnerComponent from "../../common/shared/spinner/spinner.component";
import {AsyncStorage} from 'react-native';
import User from "./user/User";
import Signin from "./user/Signin";

type HomeState = {
    isReady: boolean,
    user: string
};

function getInitialState(): HomeState {
    return {
        isReady: false,
        user: null
    }
}

export default class Home extends Component<any, HomeState>  {

    constructor(props) {
        super(props);
        this.state = getInitialState();
        this.isUserLogged();
    }

    isUserLogged() {
        AsyncStorage.getItem('user_id')
            .then(value => {
                if(null != value) {
                    console.log('value : ', value);
                    this.setState({user: value});
                } else {
                    console.log('value : ', value);
                }
            })
            .catch(err => {
                console.log('err : ', err);
                this.setState({isReady: true})
            })
            .finally(() => this.setState({isReady: true}));
    }

    render() {
        const { isReady, user } = this.state;
        if(isReady) {
            if(null != user) {
                return <User {...this.props}/>
            } else {
                return <Signin {...this.props}/>;
            }
        }
        return <SpinnerComponent/>;
    }

}
