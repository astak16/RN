import React, {Component} from "react"
import {Button, StyleSheet, Text, View,TouchableOpacity} from "react-native"
import actions from "../action";
import {connect} from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from "../common/NavigationBar";
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"

const THEME_COLOR = "#678"
type Props = {}

class MyPage extends Component<Props> {
  getRightButton() {
    return <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => {
      }}>
        <View style={{padding: 5, marginRight: 8}}>
          <Feather name={"search"} size={24} style={{color: "white"}}/>
        </View>
      </TouchableOpacity>
    </View>
  }
  
  getLeftButton(callback) {
    return <TouchableOpacity style={{padding: 8, paddingLeft: 12}} onPress={callback}>
      <Ionicons name={"ios-arrow-back"} size={26} style={{color:"while"}}/>
    </TouchableOpacity>
  }
  
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: "light-content"
    }
    let navigationBar =
      <NavigationBar
        title={"我的"}
        statusBar={statusBar}
        style={{backgroundColor: THEME_COLOR}}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />
    return (
      <View style={styles.container}>
        {navigationBar}
        <Text style={styles.welcome}>MyPage</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
})

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(MyPage)
