import React, {Component} from "react"
import {Button, StyleSheet, Text, View} from "react-native"
import actions from "../action";
import {connect} from "react-redux";
import NavigationUtil from "../navigator/NavigationUtil";

class MyPage extends Component {
  render() {
    const {navigation} = this.props
  
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage</Text>
        <Button title={'修改主题'} onPress={() => this.props.onThemeChange("#8a3")}/>
        <Text onPress={()=>{
          NavigationUtil.goPage({
            navigation:this.props.navigation
          },"DetailPage")
        }}>跳转到详情页</Text>
        <Button
          title={"Fetch 使用"}
          onPress={()=>{
            NavigationUtil.goPage({
              navigation:this.props.navigation
            },"FetchDemoPage")
          }}/>
        <Button
          title={"AsyncStorageDemoPage 使用"}
          onPress={()=>{
            NavigationUtil.goPage({
              navigation:this.props.navigation
            },"AsyncStorageDemoPage")
          }}/>
        <Button
          title={"离线缓存框架"}
          onPress={()=>{
            NavigationUtil.goPage({
              navigation:this.props.navigation
            },"DataStorageDemoPage")
          }}/>
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

export default connect(null,mapDispatchToProps)(MyPage)
