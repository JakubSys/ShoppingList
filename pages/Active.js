import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  AsyncStorage
} from 'react-native'
import { List, ListItem, Button } from 'react-native-elements'
import Scene from '../components/Scene'
import CreateListModal from '../components/CreateListModal'
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Active extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeList: [],
      archivedList: [],
      createListModal: false,
      isLoading: true
    }
    this.setToday = this.setToday.bind(this);
    this.createHandler = this.createHandler.bind(this);
    this.archiveHandler = this.archiveHandler.bind(this);
  }

  componentWillMount() {
    setTimeout(() => {
      this.getDataHandler()
    }, 1000)
  }

  getDataHandler = async () => {
    const activeList = await AsyncStorage.getItem('activeList') || []
    let parsedActiveList = [];
    if(activeList.length != 0){
      parsedActiveList = JSON.parse(activeList)
    }
    let parsedArchivedList = [];
    const archivedList = await AsyncStorage.getItem('archivedList') || []
    if(archivedList.length != 0){
        parsedArchivedList = JSON.parse(archivedList)
    }
    
    this.setState({ activeList: parsedActiveList, archivedList: parsedArchivedList, isLoading: false })
  }

  createHandler = async newTitle => {
    if (!newTitle) {
      return
    }
    const activeList = [...this.state.activeList]
    activeList.unshift({
      key: Math.random()
        .toString(36)
        .substring(2, 15),
      title: newTitle + ' ' + this.setToday(),
      date: this.setToday(),
      products: [],
    })
    await AsyncStorage.setItem('activeList', JSON.stringify(activeList))
    this.setState({
      activeList,
      createListModal: false
    })
    this.getDataHandler()
  }

  archiveHandler = async key => {
    this.getDataHandler()
    const listIndex = this.state.activeList.findIndex(l => l.key === key)
    const activeList = [...this.state.activeList]
    const archivedList = [...this.state.archivedList]
    const archivedItem = activeList.splice(listIndex, 1)
    archivedList.unshift(archivedItem[0])

    await AsyncStorage.setItem('activeList', JSON.stringify(activeList))
    await AsyncStorage.setItem('archivedList', JSON.stringify(archivedList))
    console.log(archivedItem, activeList)
    this.setState({ activeList, archivedList })
  }

  setToday() {
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1

    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = dd + '.' + mm

    return today
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Shopping Lists:</Text>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '10%'
          }}
        >
          <Button
            title="ADD LIST"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={() => {
              this.setState({ createListModal: true })
            }}
          />
        </View>
        {this.state.isLoading == false &&
          this.state.activeList.length != 0 && (
            <ScrollView>
              <List containerStyle={{ marginBottom: 20 }}>
                {this.state.activeList.map(l => (
                  <ListItem
                    title={l.title}
                    key={l.key}
                    containerStyle={styles.listItem}
                    titleStyle={styles.listItemTitle}
                    onPress={() => {
                      this.props.navigation.navigate('Details', { key: l.key, archive: this.archiveHandler  })
                    }}
                  />
                ))}
              </List>
            </ScrollView>
          )}

        {this.state.isLoading == false &&
          this.state.activeList.length == 0 && (
            <View style={{ top: 0, height: '40%' }}>
              <Scene id={3} txtBig="No list available, add a new one!" />
            </View>
          )}
        {this.state.isLoading == true && (
          <View style={{ top: 0, height: '40%' }}>
            <Scene id={4} txtBig="Loading..." />
          </View>
        )}
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
    height: SCREEN_HEIGHT
  },
  titleContainer: {
    width: SCREEN_WIDTH,
    height: '10%',
    justifyContent: 'center',
    marginBottom: 0
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    color: '#fff'
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
    backgroundColor: '#FF9800'
  },
  //TO DO!
  listItem: {
    backgroundColor: '#fff',
  },
  listItemTitle: {
    color: '#e91e63'
  }
})
