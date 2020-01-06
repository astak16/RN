import React, {Component} from "react"
import {Button, StyleSheet, Text, View} from "react-native"

export default class DetailPage extends Component {
  render() {
    const {navigation} = this.props
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>DetailPage</Text>
        
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