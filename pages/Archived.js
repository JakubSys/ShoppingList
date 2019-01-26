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
import { List, ListItem,Button } from 'react-native-elements'
import Scene from '../components/Scene'
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Archived extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeList: [],
      archivedList: [],
      isLoading: true
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.getDataHandler()
    }, 1000)
  }

  getDataHandler = async () => {
    const archivedList = await AsyncStorage.getItem('archivedList') || []
    let parsedArchivedList = []
    if(archivedList.length != 0){
        parsedAchivedList = JSON.parse(archivedList)
    }
    this.setState({ archivedList: parsedArchivedList, isLoading: false })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Archived Lists:</Text>
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
            title="REFRESH"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={this.getDataHandler}
          />
          </View>
        {this.state.isLoading == false &&
          this.state.archivedList.length != 0 && (
            <ScrollView>
              <List containerStyle={{ marginBottom: 20 }}>
                {this.state.archivedList.map(l => (
                  <ListItem
                    title={l.title}
                    key={l.key}
                    containerStyle={styles.listItem}
                    titleStyle={styles.listItemTitle}
                    onPress={() => {
                      this.props.navigation.navigate('ArchivedDetails', { key: l.key})
                    }}
                  />
                ))}
              </List>
            </ScrollView>
          )}

        {this.state.isLoading == false &&
          this.state.archivedList.length == 0 && (
            <View style={{ top: 0, height: '40%' }}>
              <Scene id={3} txtBig="There are no archived lists." />
            </View>
          )}
        {this.state.isLoading == true && (
          <View style={{ top: 0, height: '40%' }}>
            <Scene id={4} txtBig="Loading..." />
          </View>
        )}
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
