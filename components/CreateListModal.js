import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Animated, TextInput} from 'react-native';

export default class CreateListModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
            opacity2: new Animated.Value(0),
            visible: false,
            listName: ''
        }
        this.handleCreate = this.handleCreate.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible) {
            this.setState({visible: true})
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
            Animated.timing(this.state.opacity2, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start();
        }
        else {
            setTimeout(() => {this.setState({visible: false})}, 200)
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
            Animated.timing(this.state.opacity2, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }

    handleCreate(){
        this.props.onCreate(this.state.listName);
    }

    render() {
        if(this.props.visible)
            return (
                <Animated.View style={[styles.containerStyle,{opacity: this.state.opacity2}]}>
                    <Animated.View
                        visible={this.props.visible}
                        style={[styles.messageContainer,
                            {
                                opacity:this.state.opacity,
                                transform: [{scale: this.state.opacity.interpolate({inputRange: [0,1], outputRange: [0.85, 1]})}]
                            }
                        ]}
                    >
                        <View style={styles.topContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.header}>Create new list</Text>
                            </View>
                            <TextInput
                                style={{height: 30,width:'80%', marginTop: 10, borderColor: 'gray', borderWidth:1}}
                                onChangeText={(listName)=> this.setState({listName})}
                                placeholder="Enter list name"
                                value={this.state.listName}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.button} onPress={this.props.onPressBack}>
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <View style={styles.line}></View>
                            <TouchableOpacity style={styles.button} onPress={this.handleCreate}>
                                <Text style={styles.buttonText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </Animated.View>
            );
        else
            return (
                <View></View>
            );
    }
}

const styles = {
    containerStyle: {
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: "absolute",
        alignItems:'center',
        justifyContent: 'center',
        bottom: 0
    },
    messageContainer: {
        width:"80%",
        backgroundColor: 'white',
        borderRadius: 10,
    },
    topContainer: {
        alignItems:'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
    },
    textContainer: {
        textAlign: 'center',
    },
    header: {
        textAlign: 'center',
        fontSize: 17
    },
    description: {
        textAlign: 'center',
        marginTop: 10,
    },
    bottomContainer: {
        height: 50,
        borderTopColor: "#efefef",
        borderTopWidth: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonText: {
        textShadowColor: 'rgba(0, 0, 0, 0)',
        fontSize: 17
    },
    line: {
        backgroundColor: "#efefef",
        height: "100%",
        width: 1
    }
};

