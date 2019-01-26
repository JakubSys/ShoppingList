import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import { List, ListItem, Button, Icon } from 'react-native-elements'
import Scene from '../components/Scene'
import AddProductModal from '../components/AddProductModal'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: this.props.navigation.getParam('key', null),
      products: [],
      listData: {},
      activeList: [],
      listIndex: null,
      isLoading: true,
      addProductModal: false
    }
    this.addProductHandler = this.addProductHandler.bind(this);
    this.deleteProductHandler = this.deleteProductHandler.bind(this);
    this.renderLeftIcon = this.renderLeftIcon.bind(this);
    this.archiveHandler = this.archiveHandler.bind(this);
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
    this.loadListHandler()
  }

  loadListHandler = async () => {
    const key = this.state.key
    const activeList = await AsyncStorage.getItem('activeList')
    const parsedActiveList = JSON.parse(activeList)
    const listIndex = parsedActiveList.findIndex(l => l.key === key)
    const listData = parsedActiveList[listIndex]
    const products = listData.products || []
    this.setState({
      activeList: parsedActiveList,
      listData,
      products,
      listIndex,
      isLoading: false
    })
  }

  addProductHandler = async newTitle => {
    if (!newTitle) {
      return
    }
    const listData = this.state.listData
    const activeList = [...this.state.activeList]
    const listIndex = this.state.listIndex
    const products = listData.products
    products.push({
      key: Math.random()
        .toString(36)
        .substring(2, 15),
      title: newTitle,
      completed: false,
      icon: 'check-box-outline-blank'
    })
    listData.products = products
    activeList[listIndex] = listData
    await AsyncStorage.setItem('activeList', JSON.stringify(activeList))
    this.setState({ listData, addProductModal: false, activeList,products })
  }

  deleteProductHandler = async (key) =>{
    const listData = this.state.listData;
    const activeList = [...this.state.activeList];
    const listIndex = this.state.listIndex;
    const products = this.state.products;
    const productIndex = products.findIndex(l => l.key === key);
    products.splice(productIndex,1);
    listData.products = products
    activeList[listIndex] = listData;
    await AsyncStorage.setItem('activeList', JSON.stringify(activeList))

    this.setState({ listData, activeList,products })
  }

  archiveHandler = () =>{
    this.props.navigation.state.params.archive(this.state.key);
    this.props.navigation.goBack();
  }

  renderLeftIcon(elem)  {
    return (
      <View>
        {elem.completed == true &&<Icon
          name='check-box'
        />}
       {elem.completed == false && <Icon
          name='check-box-outline-blank'

        />}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
       <View style={styles.titleContainer}>
          <View style={{ width: '25%' }}>
            <Icon
              name="keyboard-arrow-left"
              onPress={() => {
                this.props.navigation.goBack()
              }}
              color="#fff"
            />
          </View>
          <View style={{ width:'80%', textAlign: 'center' }}>
            <Text style={styles.title}>{this.state.listData.title}</Text>
          </View>
          <View style={{width:'10%'}}></View>
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '10%',
            flexDirection: 'row'
          }}
        >
          <Button
            title="ADD PRODUCT"
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={() => {
              this.setState({ addProductModal: true })
            }}
          />
          <Button
            title="ARCHIVE LIST"
            buttonStyle={styles.archivedButton}
            titleStyle={styles.signUpButtonText}
            onPress={this.archiveHandler}
          />
        </View>
        {this.state.isLoading == false &&
          this.state.products.length != 0 && (
            <ScrollView>
              <List containerStyle={{ marginBottom: 20 }}>
                {this.state.products.map(l => (
                  <ListItem
                    title={l.title}
                    key={l.key}
                    leftIconOnPress={() => {
                      if(l.completed == true){
                        l.completed = false;
                      }else{
                        l.completed = true;
                      }
                    }}
                    rightIcon={{name: "delete", color: '#000'}}
                    onPressRightIcon={()=>{this.deleteProductHandler(l.key)}}
                    leftIcon={this.renderLeftIcon(l)}
                    titleStyle={l.completed == true? styles.checked : styles.unchecked}
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
        <AddProductModal
          visible={this.state.addProductModal}
          onPressBack={() => {
            this.setState({ addProductModal: false })
          }}
          onCreate={this.addProductHandler}
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
