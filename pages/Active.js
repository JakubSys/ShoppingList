import React, { Component } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native'
import { List, ListItem, Button } from 'react-native-elements'
import Scene from '../components/Scene';
import CreateListModal from '../components/CreateListModal';
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height




export default class Active extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 1,
      activeList: [],
      createListModal: false,
      isLoading:true
    }
    this.updateIndex = this.updateIndex.bind(this);
    this.setToday = this.setToday.bind(this);
    this.createHandler = this.createHandler.bind(this);
  }
  componentWillMount(){
      setTimeout(()=>{
        this.getData();
      }, 1000);
  }

  getData = async ()=>{
    const activeList = await AsyncStorage.getItem('activeList') ;
    const parsedActiveList = JSON.parse(activeList);
    this.setState({activeList: parsedActiveList, isLoading:false})
    console.log(parsedActiveList)
    
  }

  updateIndex (selectedIndex) {
    this.setState({ selectedIndex })
  }

  createHandler = async (newTitle) => {
    if(!newTitle){
          return;
    }
    const activeList =[...this.state.activeList];
    activeList.push({
        key: Math.random().toString(36).substring(2, 15),
        title: newTitle,
        date: this.setToday()
    });
    await AsyncStorage.setItem('activeList', JSON.stringify(activeList));
    this.setState({
        activeList,
        createListModal: false,
    });
    this.getData();
  }

  setToday (){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = mm + ' ' + dd + ' ' + yyyy;

    return today;
    }


  render () {
    return (
        <SafeAreaView style = {styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Shopping Lists:</Text>
            </View>
            <View style={{width:"100%", alignItems: 'center', justifyContent: 'center', height:"10%"}}>
                <Button
                    title="ADD LIST"
                    containerStyle={{ flex: -1 }}
                    buttonStyle={styles.signUpButton}
                    titleStyle={styles.signUpButtonText}
                    onPress={()=>{this.setState({createListModal:true})}}
                />
            </View>
            {this.state.isLoading ==false && this.state.activeList.length != 0 &&
            <ScrollView>
                <List containerStyle={{ marginBottom: 20 }}>
                  {this.state.activeList.map(l => <ListItem title={l.title} key={l.key} />)}
                </List>
            </ScrollView>}

            {this.state.isLoading ==false && this.state.activeList.length == 0 &&
                <View style={{top:0, height:'40%'}} >
                    <Scene id={3}  txtBig="No list available, add a new one!"  />
                </View>   
            }
            {this.state.isLoading ==true &&
                <View style={{top:0, height:'40%'}} >
                    <Scene id={4}  txtBig="Loading..."  />
                </View>
            }
            <CreateListModal
                visible={this.state.createListModal}
                onPressBack={() => {
                    this.setState({ createListModal: false })
                }}
                onCreate={this.createHandler}
            />
        </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  titleContainer:{
      width: SCREEN_WIDTH,
      height: '10%',
      justifyContent: 'center',
      marginBottom:  0 
  },
  title:{
      alignSelf: 'center',
      fontSize: 24,
      color: '#fff'
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

})
