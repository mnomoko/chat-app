import React, { Component } from 'react';
import {Body, Button, Container, Content, Header, Left, Right, Segment, Text, View} from "native-base";

type NewComponentState = {
    activePage: number
    isReady: boolean
};

function getInitialState(): NewComponentState {
    return {
        activePage: 1,
        isReady: true
    }
}

export default class NewContact extends Component<any, NewComponentState> {

    constructor(props) {
        super(props);

        this.state = getInitialState();
    }

    selectComponent = (activePage) => () => this.setState({activePage});

    _renderComponent = () => {
        if(this.state.activePage === 1)
            return this.showNewConversation(); //... Your Component 1 to display
        else
            return this.showNewContact(); //... Your Component 2 to display
    };

    showNewConversation() {
        return (
            <View>
                <Text>new conversation</Text>
                <Text>new conversation</Text>
            </View>
        )
    }

    showNewContact() {
        return (
            <View>
                <Text>new contact</Text>
            </View>
        )
    }

    render() {
        /* TODO
        1/ Form input username / button
        2/ If is good username add to contact list Else render error

        3/ show public group
         */
        return (
            <Container>
                <Header translucent hasSegment>
                    <Left />
                    <Body>
                        <Segment>
                            <Button active={this.state.activePage === 1}
                                    onPress={this.selectComponent(1)}><Text>Component 1</Text></Button>
                            <Button  active={this.state.activePage === 2}
                                     onPress= {this.selectComponent(2)}><Text>Component 2</Text></Button>
                        </Segment>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    {this._renderComponent()}
                </Content>
            </Container>
        );
    }

}
