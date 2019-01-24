import React, {Component} from 'react';
import {StyleSheet, Text, View,SafeAreaView,Dimensions} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Archived extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedIndex: 1
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Archived</Text>
                <View style={styles.buttonContainer}>
                    {/* <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        containerStyle={{height: 50}}
                    /> */}
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#0402',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer:{
        width: SCREEN_WIDTH,
        height: 50,
        bottom: 0,
        position: 'absolute',
        marginBottom:20
    },
});