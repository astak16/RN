import React, {Component} from "react"
import {Button, StyleSheet, Text, View} from "react-native"

export default class MyPage extends Component {
  render() {
    const {navigation} = this.props
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage</Text>
        <Button title={'修改主题'} onPress={() => navigation.setParams({
          theme: {
            tintColor: 'red',
            updateTime: new Date().getTime()
          }
        })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  }
})