import React, {Component} from "react";
import {FlatList, View, Text} from "react-native";
import styles from "../../../common/style/styles";
import SpinnerComponent from "../../../common/shared/spinner/spinner.component";
import { ListItem, SearchBar } from 'react-native-elements';

type ContactState = {
    value: string
    initialData: string[],
    data: string[],
    isReady: boolean
};

function getInitialState(array: string[]): ContactState {
    return {
        value: '',
        initialData: array || [],
        data: array || [],
        isReady: true
    }
}

export default class Contact extends Component<any, ContactState>  {

    constructor(props) {
        super(props);

        const initialData = Contact.getInitialData();
        this.state = getInitialState(initialData);
    }

    static getInitialData(): string[] {
        return [
            "Movies","Prestige","Interstellar","Dark Knight", "Neighbours",
            "Music","Nirvana", "Imagine Dragons", "Avicii","Maya",
            "Places","Agra","Jamshedpur","Delhi", "Bangalore",
            "Things","Car","Table","Fan", "Chair",
            "People","Sankho","Aditya","Himanshu", "Kuldeep",
            "Roads","NH-11","MG Road","Brigade Road", "Nehru Road",
            "Buildings","Empire State","Burj Khalifa","Caspian", "Narnia"
        ];
    }

    render() {
        const { isReady, data } = this.state;
        if(isReady) {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        renderItem={(item) => this.renderItems(item.item)}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                    />
                </View>
            );
        }
        else {
            return <SpinnerComponent/>
        }
    }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.state.initialData.filter(item => {
            const itemData = `${item.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    renderItems( item ) {
        return (
            <ListItem
                // leftAvatar={{ source: { uri: item.picture.thumbnail } }}
                leftAvatar={{}}
                title={`${item}`}
                onPress={() => alert(item)}
            />
        )
    }

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                lightTheme
                round
                onChangeText={this.searchFilterFunction}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

}
