import {StyleSheet} from "react-native";
import {Constants} from 'expo';


const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center'
    },
    tempText: {
        fontSize: 32,
        color: '#000000'
    },
    normalText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#000000'
    },
    bodyContainer: {
        flex: 3,
    },
    fab: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    main: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#2a8ab7'
    },
    searchInput: {
        height: 50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        color: 'white'
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    buttonText: {
        fontSize: 18,
        color: '#111',
        alignSelf: 'center'
    },
    container: {
        flex: 3,
        alignItems: 'center'
    },
    button: {
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    viewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listViewText: {
        flex: 2,
        paddingRight: 10
    },
    listViewDeleteButton: {
        flex: 1,
        paddingRight: 10
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default styles;
