import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground,Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import Scene from '../components/Scene'

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
                    dotStyle={styles.swiperDot}
                    activeDotStyle={styles.swiperDot}
                    onIndexChanged={(id) => {this.setState({pageId: id});}}
                    >
                     <Scene id={0}  txtBig="Welcome to your new Shopping List!" txtSmall="Change your life and start using this app!"/>
                     <Scene id={1}  txtBig="Get rid of trillions of notes!" txtSmall="Keep your all shopping lists in one simple app!"/>
                     <Scene id={2}  txtBig="No more forgotten products!" txtSmall="Start using this app right now, and be sure you have all what you need!"/>
                </Swiper>
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
    }
});

