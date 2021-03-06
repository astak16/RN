import React, {Component} from "react"
import {Button, StyleSheet, Text, View, TextInput, AsyncStorage} from "react-native"
import actions from "../action";
import {connect} from "react-redux";

type Props = {}
const KEY = "save_key"
export default class DataStorageDemoPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: ""
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AsyncStorageDemoPage 使用</Text>
        <View style={styles.input_container}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              this.value = text
            }}/>
        </View>
        <View style={styles.input_container}>
          <Text onPress={() => {
            this.doSave()
          }}>存储</Text>
          <Text onPress={() => {
            this.doRemove()
          }}>删除</Text>
          <Text onPress={() => {
            this.doGetData()
          }}>获取</Text>
        </View>
        <Text>{this.state.showText}</Text>
      </View>
    )
  }
  
  async doSave() {
    AsyncStorage.setItem(KEY, this.value, error => {
      error && console.log(error.toString())
    })
    // AsyncStorage.setItem(KEY, this.value).catch(error => {
    //   error && console.log(error.toString())
    // })
    // try {
    //   await AsyncStorage.setItem(KEY, this.value)
    // } catch (error) {
    //   error && console.log(error.toString())
    // }
  }
  
  async doRemove() {
    AsyncStorage.removeItem(KEY, error => {
      error && console.log(error.toString())
    })
  }
  
  async doGetData() {
    AsyncStorage.getItem(KEY, (error,value) => {
      this.setState({
        showText:value
      })
      console.log(value)
      error && console.log(error.toString())
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
  input: {
    height: 30,
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    marginRight: 10
  },
  input_container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent:"space-around"
  }
})

