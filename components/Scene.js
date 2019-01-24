import React, {Component} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements'

export default class Scene extends Component{
        render(){
            return(
                <View style={{height:"100%",justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ alignItems: "center"}}>
                    {/* //here goes da iconerions */}
                    {this.props.id == 0 &&
                    <Icon
                    size={86}
                    color="#ffffff"
                    type='entypo'
                    name='clipboard' />}
                    {this.props.id == 1 &&
                    <Icon
                    size={86}
                    color="#ffffff"
                    type='entypo'
                    name='documents' />}
                    {this.props.id == 2 &&
                    <Icon
                    size={86}
                    color="#ffffff"
                    type='entypo'
                    name='emoji-happy' />}

                        <View styles={{ textAlign: "center" }}>
                            <Text style={styles.textBig}>
                                {this.props.txtBig}
                            </Text>
                        </View>
                        <Text style={styles.textSmall}>
                            {this.props.txtSmall}
                        </Text>
                    </View>
                </View>
            );
        }

}
const styles = StyleSheet.create({

    textBig: {
        marginTop: "6%",
        fontSize: 26,
        textAlign: "center",
        color: "#ffffff",
        paddingLeft: 20,
        paddingRight: 20,
        textShadowColor: 'rgba(0, 0, 0, 0)',
    },
    textSmall: {
        marginTop: "3%",
        textAlign: "center",
        color: "#ffffff",
        opacity: 0.6,
        paddingLeft: 20,
        paddingRight: 20,
        textShadowColor: 'rgba(0, 0, 0, 0)',
    },
});