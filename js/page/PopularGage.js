import React, {Component} from "react"
import {StyleSheet, Text, View, FlatList, RefreshControl} from "react-native"
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import {connect} from "react-redux"
import actions from "../action/index"
import PopularItem from "../common/PopularItem";
import NavigationUtil from "../navigator/NavigationUtil";

const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR = "&sort=stars"
const THEME_COLOR = "red"
type Props = {}

export default class PopularPage extends Component<Props> {
  constructor(props) {
    super(props)
    this.tabNames = ['Java', "Android", "iOS", "React", "React Native", "PHP"]
  }
  
  _genTabs() {
    const tabs = {}
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item}/>,
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
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle
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

class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props
    this.storeName = tabLabel
  }
  
  componentDidMount() {
    this.loadData()
  }
  
  loadData() {
    const {onLoadPopularData} = this.props
    const url = this.getFetchUrl(this.storeName)
    console.log("111")
    console.log(url)
    onLoadPopularData(this.storeName, url)
  }
  
  getFetchUrl(key) {
    return URL + key + QUERY_STR
  }
  
  renderItem(data) {
    const item = data.item
    return <PopularItem
      item={item}
      onSelect={() => {
      }}
    />
  }
  
  render() {
    const {popular} = this.props
    let store = popular[this.storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false
      }
    }
    return (
      <View style={styles.container}>
        <FlatList data={store.items}
                  renderItem={data => this.renderItem(data)}
                  keyExtractor={item => "" + item.id}
                  refreshControl={
                    <RefreshControl
                      title={"Loading"}
                      titleColor={THEME_COLOR}
                      colors={[THEME_COLOR]}
                      refreshing={store.isLoading}
                      onRefresh={() => this.loadData()}
                      tintColor={THEME_COLOR}
                    />
                  }
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  popular: state.popular
})

const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url) => {
    console.log("dsadfadfadfasdf")
    console.log(dispatch)
    return dispatch(actions.onLoadPopularData(storeName, url))
  }
})


const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 20
  },
  tabStyle: {
    minWidth: 50
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: "#ffffff"
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6
  }
})
