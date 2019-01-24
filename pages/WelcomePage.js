import React, {Component} from 'react';
import {StyleSheet, Text, View,Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Scene from '../components/Scene';
import { Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


export default class WelcomePage extends Component {
    constructor(props){
        super(props);
        this.state={
            pageId: 0
        }
    }
    static navigationOptions = {
        header: null,
    };
    render(){
        return(
            <View style={styles.container}>
             <Swiper
                    showsButtons={false}
                    showsPagination={true}
                    containerStyle={styles.swiperStyle}
                    loop={false}
                    paginationStyle={styles.swiperPagination}
                    dotColor='#ffffff'
                    activeDotColor='#27c987'
                    onIndexChanged={(id) => {this.setState({pageId: id});}}
                    >
                     <Scene id={0}  txtBig="Welcome to your new Shopping List!" txtSmall="Change your life and start using this app!"/>
                     <Scene id={1}  txtBig="Get ride of trillions of notes!" txtSmall="Keep your all shopping lists in one simple app!"/>
                     <Scene id={2}  txtBig="No more forgotten products!" txtSmall="Start using this app right now, and be sure you have all what you need!"/>
            </Swiper>
            {this.state.pageId != 2 &&
            <View style={{bottom:0, width:"100%", position: 'absolute', alignItems: 'center', justifyContent: 'center', height:"18%"}}>
                <Text style={styles.swipeText}>Swipe left</Text>
            </View>}
            {this.state.pageId == 2 &&
            <View style={{bottom:"18%", width:"100%", position: 'absolute', alignItems: 'center', justifyContent: 'center', height:"18%"}}>
                <Button
                    title="START"
                    containerStyle={{ flex: -1 }}
                    buttonStyle={styles.signUpButton}
                    titleStyle={styles.signUpButtonText}
                    onPress={()=>{this.props.navigation.replace('Components')}}
                />
            </View>}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#293046',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    swiperStyle:{
        width: SCREEN_WIDTH
    },
    swipeText: {
        top:0,
        color: "#efeef0",
        opacity: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0)', 
        marginBottom: 10
    },
    signUpButtonText: {
        fontFamily: 'bold',
        fontSize: 13,
      },
      signUpButton: {
        width: 250,
        borderRadius: 50,
        height: 45,
        backgroundColor: '#FF9800'
      },
});

