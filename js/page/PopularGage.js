import React, {Component} from "react"
import {StyleSheet, Text, View,Button} from "react-native"
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import NavigationUtil from "../navigator/NavigationUtil";

export default class PopularPage extends Component {
  constructor(props) {
    super(props)
    this.tabNames = ['Java', "Android", "iOS", "React", "React Native", "PHP"]
  }
  
  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTab {...this.props} tabLabel={item}/>,
        navigationOptions: {
          title: item,
        }
      }
    })
    return tabs
  }
  
  render() {
    const TabNavigation = createAppContainer(createMaterialTopTabNavigator(
      this._genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: "#a67"
          },
          indicatorStyle:styles.indicatorStyle,
          labelStyle:styles.labelStyle
        }
      }
    ))
    return (
      <View style={styles.container}>
        <TabNavigation/>
      </View>
    )
  }
}

class PopularTab extends Component {
  render() {
    return (
      <View>
        <Text>PopularPage</Text>
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
    marginTop: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
  tabStyle: {
    minWidth: 50
  },
  indicatorStyle:{
    height:2,
    backgroundColor: "#ffffff"
  },
  labelStyle:{
    fontSize:13,
    marginTop: 6,
    marginBottom: 6
  }
})
