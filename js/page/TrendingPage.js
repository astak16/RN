import React, {Component} from "react"
import {StyleSheet, Text, View, Button} from "react-native"
import {connect} from "react-redux"
import actions from "../action"

class TrendingPage extends Component {
  render() {
    const {navigation} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage</Text>
        <Button title={'修改主题'} onPress={() => this.props.onThemeChange("orange")}
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

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null,mapDispatchToProps)(TrendingPage)
