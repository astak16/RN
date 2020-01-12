import React, {Component} from "react"
import Toast from "react-native-easy-toast"
import {StyleSheet, Text, ActivityIndicator, View, FlatList, RefreshControl} from "react-native"
import {createMaterialTopTabNavigator} from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import {connect} from "react-redux"
import actions from "../action/index"
import PopularItem from "../common/PopularItem";
import NavigationBar from "../common/NavigationBar";
import NavigationUtil from "../navigator/NavigationUtil";

const URL = "https://api.github.com/search/repositories?q="
const QUERY_STR = "&sort=stars"
const THEME_COLOR = "#678"
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
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: "light-content"
    }
    let navigatorBar = <NavigationBar
      title={'最热'}
      statusBar={statusBar}
      style={{backgroundColor:THEME_COLOR}}
    />
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
        {navigatorBar}
        <TabNavigation/>
      </View>
    )
  }
}

const pageSize = 10 // 设置常量，防止修改
class PopularTab extends Component<Props> {
  constructor(props) {
    super(props);
    const {tabLabel} = this.props
    this.storeName = tabLabel
  }
  
  componentDidMount() {
    this.loadData()
  }
  
  loadData(loadMore) {
    const {onRefreshPopular, onLoadMorePopular} = this.props
    const store = this._store()
    const url = this.getFetchUrl(this.storeName)
    if (loadMore) {
      onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show("没有更多了")
      })
    } else {
      onRefreshPopular(this.storeName, url, pageSize)
    }
  }
  
  /**
   * 获取与当前页面有关的数据
   * @returns {*}
   * @private
   */
  _store() {
    const {popular} = this.props
    let store = popular[this.storeName]
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [],  //要显示的数据
        hideLoadingMore: true //默认隐藏加载更多
      }
    }
    return store
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
  
  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator}/>
        <Text>正在加载更多</Text>
      </View>
  }
  
  render() {
    let store = this._store()
    return (
      <View style={styles.container}>
        <FlatList data={store.projectModes}
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
                  ListFooterComponent={() => this.genIndicator()}
                  onEndReached={() => {
                    setTimeout(() => {
                      if (this.canLoadMore) {
                        this.loadData(true)
                        this.canloadMore = false
                      }
                    }, 100)
                  }}
                  onEndReachedThreshold={0.5}
                  onMomentumScorllBegin={() => {//fix 初始化滚动调用 onEndReached 的问题
                    this.canloadMore = true
                  }}
        />
        <Toast ref={'toast'} position={'center'}/>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  popular: state.popular
})

const mapDispatchToProps = dispatch => ({
  // 将 dispatch(onRefreshPopular(storeName,url)) 绑定到props
  onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callback))
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
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: "red",
    margin: 10,
  }
})
