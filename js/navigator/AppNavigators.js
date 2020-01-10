import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailGage";
import FetchDemoPage from "../page/FetchDemoPage";
import AsyncStorageDemoPage from "../page/AsyncStorageDemoPage";

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null
    }
  }
})

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {}
  },
  FetchDemoPage: {
    screen: FetchDemoPage,
    navigationOptions: {}
  },
  AsyncStorageDemoPage: {
    screen: AsyncStorageDemoPage,
    navigationOptions: {}
  },
  DataStorageDemoPage: {
    screen: DataStorageDemoPage,
    navigationOptions: {}
  }
})

export default createAppContainer(createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator
}, {
  navigationOptions: {
    header: null
  }
}))
