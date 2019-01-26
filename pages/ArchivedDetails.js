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
import { List, ListItem, Button, Icon } from 'react-native-elements'
import Scene from '../components/Scene'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: this.props.navigation.getParam('key', null),
      products: [],
      listData: {},
      archivedList: [],
      listIndex: null,
      isLoading: true,
      addProductModal: false
    }
    this.renderLeftIcon = this.renderLeftIcon.bind(this)
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    this.loadListHandler()
  }

  loadListHandler = async () => {
    const key = this.state.key
    const archivedList = await AsyncStorage.getItem('archivedList')
    const parsedArchivedList = JSON.parse(archivedList)
    const listIndex = parsedArchivedList.findIndex(l => l.key === key)
    const listData = parsedArchivedList[listIndex]
    const products = listData.products || []
    this.setState({
      archivedList: parsedArchivedList,
      listData,
      products,
      listIndex,
      isLoading: false
    })
  }

  renderLeftIcon(elem) {
    return (
      <View>
        {elem.completed == true && <Icon name="check-box" />}
        {elem.completed == false && <Icon name="check-box-outline-blank" />}
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={{ left: 0 }}>
            <Icon
              name="keyboard-arrow-left"
              onPress={() => {
                this.props.navigation.goBack()
              }}
              color="#fff"
            />
          </View>
          <View style={{ marginRight: '15%' }}>
            <Text style={styles.title}>{this.state.listData.title}</Text>
          </View>
        </View>
        {this.state.isLoading == false &&
          this.state.products.length != 0 && (
            <ScrollView>
              <List containerStyle={{ marginBottom: 20 }}>
                {this.state.products.map(l => (
                  <ListItem
                    title={l.title}
                    key={l.key}
                    disabled={true}
                    leftIconOnPress={() => {
                      if (l.completed == true) {
                        l.completed = false
                      } else {
                        l.completed = true
                      }
                    }}
                    rightIcon={{ name: 'delete', color: '#000' }}
                    onPressRightIcon={() => {
                      this.deleteProductHandler(l.key)
                    }}
                    leftIcon={this.renderLeftIcon(l)}
                    titleStyle={
                      l.completed == true ? styles.checked : styles.unchecked
                    }
                  />
                ))}
              </List>
            </ScrollView>
          )}
        {this.state.isLoading == false &&
          this.state.products.length == 0 && (
            <View style={{ top: 0, height: '40%' }}>
              <Scene id={3} txtBig="There are no products!" />
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
    width: '80%',
    height: '10%',
    justifyContent: 'space-between',
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
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
    width: 150,
    borderRadius: 50,
    height: 45,
    backgroundColor: '#FF9800'
  },
  archivedButton: {
    width: 150,
    borderRadius: 50,
    height: 45,
    backgroundColor: '#e91e63'
  },
  checked: {
    textDecorationLine: 'line-through',
    color: '#c0c0c0'
  },
  unchecked: {
    textDecorationLine: 'none',
    color: '#000'
  }
})
